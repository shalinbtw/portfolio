import { useState, type FormEvent } from "react";

const SEND_FAILED = "Your message couldn't be sent. Please try again later.";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; email: string }
  | { state: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    setStatus({ state: "sending" });

    let errorMessage = SEND_FAILED;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;
      if (response.ok && result?.ok) {
        form.reset();
        setStatus({ state: "sent", email: String(fields.email) });
        return;
      }
      if (result?.error) errorMessage = result.error;
    } catch {
      // Network failure: fall through to the generic message.
    }
    setStatus({ state: "error", message: errorMessage });
  }

  if (status.state === "sent") {
    return (
      <div className="contact-sent" role="status">
        <h2>Message sent</h2>
        <p>Thanks for getting in touch. I'll reply to {status.email}.</p>
        <button
          className="text-button"
          type="button"
          onClick={() => setStatus({ state: "idle" })}
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          aria-describedby="contact-email-hint"
          required
        />
        <p className="field-hint" id="contact-email-hint">
          Only used to reply to you.
        </p>
      </div>

      <div className="field">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows={7} maxLength={5000} required />
      </div>

      {/* Hidden from people; bots that fill it in are ignored. */}
      <div className="contact-trap" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status.state === "error" && (
        <p className="form-error" role="alert">
          {status.message}
        </p>
      )}

      <button className="pill-button" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
