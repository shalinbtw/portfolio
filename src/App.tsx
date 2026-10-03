import { useEffect } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { posts, type Post } from "./posts";
import "./App.css";

function SiteHeader({ onIndex = false }: { onIndex?: boolean }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="Shalin, home">
        Shalin
      </a>
      <nav className="site-nav" aria-label="Main">
        <a href="/" aria-current={onIndex ? "page" : undefined}>
          Writing
        </a>
      </nav>
    </header>
  );
}

function BlogIndex() {
  return (
    <>
      <SiteHeader onIndex />
      <main className="post-index">
        <h1 className="visually-hidden">Writing</h1>
        <div className="post-grid">
          {posts.map((post) => (
            <article className="post-card" key={post.slug}>
              <a className="post-card-link" href={`/writing/${post.slug}`}>
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
        <a className="back-link" href="/">
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

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  const post = posts.find((entry) => path === `/writing/${entry.slug}`);

  useEffect(() => {
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      post?.summary ?? "Writing by Shalin Naidoo about software, systems, and interesting problems.",
    );
  }, [post]);

  return (
    <div className="site-shell">
      {post ? <Article post={post} /> : <BlogIndex />}
    </div>
  );
}
