import { useEffect } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { ContactForm } from "./components/ContactForm";
import { posts, type Post } from "./posts";
import "./App.css";

type Page = "writing" | "contact";

function SiteHeader({ current }: { current?: Page }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="Shalin, home">
        Shalin
      </a>
      <nav className="site-nav" aria-label="Main">
        <a href="/" aria-current={current === "writing" ? "page" : undefined}>
          Writing
        </a>
        <a href="/contact" aria-current={current === "contact" ? "page" : undefined}>
          Contact
        </a>
      </nav>
    </header>
  );
}

function PostCover({ post, sizes, decorative = false }: {
  post: Post;
  sizes: string;
  decorative?: boolean;
}) {
  const imagePath = `/images/posts/${post.slug}`;

  return (
    <img
      className="post-cover"
      src={`${imagePath}.webp`}
      srcSet={`${imagePath}-480.webp 480w, ${imagePath}.webp 960w`}
      sizes={sizes}
      width={960}
      height={960}
      alt={decorative ? "" : post.coverAlt}
    />
  );
}

function BlogIndex() {
  return (
    <>
      <SiteHeader current="writing" />
      <main className="post-index">
        <h1 className="visually-hidden">Writing</h1>
        <div className="post-grid">
          {posts.map((post) => (
            <article className="post-card" key={post.slug}>
              <a className="post-card-link" href={`/writing/${post.slug}`}>
                <PostCover
                  post={post}
                  sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 767px) calc(50vw - 32px), (max-width: 1023px) calc(48vw - 32px), (max-width: 1383px) calc(31vw - 24px), 403px"
                  decorative
                />
                <time dateTime={post.dateTime}>{post.dateTime}</time>
                <h2>{post.title}</h2>
              </a>
            </article>
          ))}
        </div>
      </main>
      <footer>
        <p>Shalin</p>
        <p>{posts.length} {posts.length === 1 ? "post" : "posts"}</p>
      </footer>
    </>
  );
}

function Article({ post }: { post: Post }) {
  return (
    <>
      <SiteHeader />
      <main className="article-page">
        <a className="pill-button" href="/">
          <ArrowLeftIcon width={18} height={18} aria-hidden="true" />
          All writing
        </a>

        <article>
          <header className="article-header">
            <div className="post-meta">
              <time dateTime={post.dateTime}>{post.publishedAt}</time>
              <span>{post.readingTime}</span>
            </div>
            <h1>{post.title}</h1>
            <p>{post.summary}</p>
          </header>

          <PostCover post={post} sizes="(max-width: 751px) calc(100vw - 32px), 720px" />

          <div className="article-copy">
            {post.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <footer>
        <p>Shalin</p>
        <a href="/">All writing</a>
      </footer>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <SiteHeader current="contact" />
      <main className="article-page">
        <header className="article-header contact-header">
          <h1>Contact</h1>
          <p>Send me a message and I'll reply by email.</p>
        </header>
        <ContactForm />
      </main>
      <footer>
        <p>Shalin</p>
        <a href="/">All writing</a>
      </footer>
    </>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  const post = posts.find((entry) => path === `/writing/${entry.slug}`);
  const isContact = path === "/contact";

  useEffect(() => {
    const description = post
      ? post.summary
      : isContact
        ? "Send Shalin Naidoo a message."
        : "Writing by Shalin Naidoo about software, systems, and interesting problems.";
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [post, isContact]);

  let page = <BlogIndex />;
  if (post) page = <Article post={post} />;
  else if (isContact) page = <ContactPage />;

  return (
    <div className="site-shell">
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          <filter id="post-cover-slate" colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="0" />
            {/* Keep shadows near the slate background and highlights below the title contrast. */}
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.141 0.208 0.322 0.447 0.573" />
              <feFuncG type="table" tableValues="0.192 0.275 0.396 0.522 0.635" />
              <feFuncB type="table" tableValues="0.231 0.318 0.447 0.573 0.678" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      {page}
    </div>
  );
}
