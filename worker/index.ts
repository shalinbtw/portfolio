// Handles the contact form. Wrangler routes only /api/* here; every other
// request is served straight from the static assets in dist.

const MAX_BODY_BYTES = 16_384;
const MAX_LENGTH = { name: 100, email: 254, message: 5000 };
const EMAIL_PATTERN = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]+$/;
const SEND_FAILED = "Your message couldn't be sent. Please try again later.";

type ContactMessage = { name: string; email: string; message: string };

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/api/contact") {
      return json({ error: "Not found." }, 404);
    }
    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
    }
    // Only accept submissions made from this site's own pages.
    if (request.headers.get("Origin") !== url.origin) {
      return json({ error: "Forbidden." }, 403);
    }

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const { success } = await env.CONTACT_RATE_LIMIT.limit({ key: ip });
    if (!success) {
      return json({ error: "Too many messages. Please wait a minute and try again." }, 429);
    }

    const parsed = await parseSubmission(request);
    if ("error" in parsed) {
      return json({ error: parsed.error }, 400);
    }
    // Bots fill the hidden field. Report success so they move on.
    if (parsed.isBot) {
      return json({ ok: true });
    }

    const { name, email, message } = parsed.contact;
    try {
      await env.SEND_EMAIL.send({
        from: { name: "Website contact form", email: env.CONTACT_FROM },
        to: env.CONTACT_TO,
        replyTo: { name, email },
        subject: `Message from ${name}`,
        text: `${message}\n\n${name} <${email}>\nSent from the contact form on ${url.hostname}`,
      });
    } catch (error) {
      console.error("Contact email failed", error);
      return json({ error: SEND_FAILED }, 502);
    }

    return json({ ok: true });
  },
} satisfies ExportedHandler<Env>;

async function parseSubmission(
  request: Request,
): Promise<{ contact: ContactMessage; isBot: boolean } | { error: string }> {
  const body = await request.text();
  if (new TextEncoder().encode(body).length > MAX_BODY_BYTES) {
    return { error: "Your message is too long." };
  }

  let data: unknown;
  try {
    data = JSON.parse(body);
  } catch {
    return { error: "Invalid request." };
  }
  if (typeof data !== "object" || data === null) {
    return { error: "Invalid request." };
  }

  const fields = data as Record<string, unknown>;
  const text = (key: string) => {
    const value = fields[key];
    return typeof value === "string" ? value.trim() : "";
  };
  // Names go into email headers, so drop any control characters.
  const name = text("name").replace(/[\p{Cc}\p{Cf}]/gu, "");
  const email = text("email");
  const message = text("message");

  if (!name || name.length > MAX_LENGTH.name) {
    return { error: `Please enter your name (up to ${MAX_LENGTH.name} characters).` };
  }
  if (email.length > MAX_LENGTH.email || !EMAIL_PATTERN.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!message || message.length > MAX_LENGTH.message) {
    return { error: `Please enter a message (up to ${MAX_LENGTH.message} characters).` };
  }

  return { contact: { name, email, message }, isBot: text("website") !== "" };
}

function json(body: object, status = 200, headers: Record<string, string> = {}): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}
