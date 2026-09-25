import { useEffect, useState } from "react";
import { ArrowTopRightIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { posts, type Post } from "./posts";
import "./App.css";

type Theme = "system" | "light" | "dark";

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = document.documentElement.dataset.theme;
    return saved === "light" || saved === "dark" ? saved : "system";
  });
  const [systemDark, setSystemDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const isDark = theme === "dark" || (theme === "system" && systemDark);
  const label = `Switch to ${isDark ? "light" : "dark"} mode`;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = (event: MediaQueryListEvent) => {
      setSystemDark(event.matches);
    };
    preference.addEventListener("change", updateSystemTheme);
    return () => preference.removeEventListener("change", updateSystemTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") delete root.dataset.theme;
    else root.dataset.theme = theme;

    try {
      if (theme === "system") localStorage.removeItem("portfolio-theme");
      else localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }

    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#141511" : "#f4f2ec");
  }, [theme, isDark]);

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <SunIcon width={20} height={20} aria-hidden="true" />
      ) : (
        <MoonIcon width={20} height={20} aria-hidden="true" />
      )}
    </button>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="Shalin Naidoo, home">
        Shalin Naidoo
      </a>
      <ThemeToggle />
    </header>
  );
}

function BlogIndex() {
  return (
    <>
      <SiteHeader />
      <main className="post-index" aria-label="Blog posts">
        {posts.map((post) => (
          <article className="post-entry" key={post.slug}>
            <a className="post-entry-link" href={`/writing/${post.slug}`}>
              <div className="post-meta">
                <time dateTime={post.dateTime}>{post.publishedAt}</time>
                <span>{post.readingTime}</span>
              </div>
              <div className="post-entry-body">
                <h1>{post.title}</h1>
                <p>{post.summary}</p>
              </div>
              <ArrowTopRightIcon className="post-entry-arrow" aria-hidden="true" />
            </a>
          </article>
        ))}
      </main>
      <footer>
        <p>Shalin Naidoo</p>
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
          <span aria-hidden="true">←</span> All writing
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

          <img
            className="article-cover"
            src={post.cover}
            alt={post.coverAlt}
            width={post.coverWidth}
            height={post.coverHeight}
          />

          <div className="article-copy">
            {post.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <footer>
        <p>Shalin Naidoo</p>
        <a href="/">All writing</a>
      </footer>
    </>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  const post = posts.find((entry) => path === `/writing/${entry.slug}`);

  useEffect(() => {
    document.title = post
      ? `${post.title} | Shalin Naidoo`
      : "Shalin Naidoo | Writing";
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
