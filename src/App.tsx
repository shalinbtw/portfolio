import { useEffect, useState } from "react";
import { ArrowTopRightIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import "./App.css";

type Post = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingTime: string;
  cover: string;
  coverAlt: string;
  coverWidth: number;
  coverHeight: number;
};

const samplePost: Post = {
  slug: "building-this-blog",
  title: "Building this blog",
  summary: "A short note on simplifying this site into a place for writing.",
  publishedAt: "10 September 2026",
  readingTime: "2 min read",
  cover: "/images/building-this-blog.webp",
  coverAlt: 'The title "Building this blog" printed on warm paper beside a pencil and a lime paper tab',
  coverWidth: 1672,
  coverHeight: 941,
};

const posts = [samplePost];

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
                <time dateTime="2026-09-10">{post.publishedAt}</time>
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
        <p>{posts.length} post</p>
      </footer>
    </>
  );
}

function SampleArticle() {
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
              <time dateTime="2026-09-10">{samplePost.publishedAt}</time>
              <span>{samplePost.readingTime}</span>
            </div>
            <h1>{samplePost.title}</h1>
            <p>{samplePost.summary}</p>
          </header>

          <img
            className="article-cover"
            src={samplePost.cover}
            alt={samplePost.coverAlt}
            width={samplePost.coverWidth}
            height={samplePost.coverHeight}
          />

          <div className="article-copy">
            <p>
              This site started as a portfolio, but the format asked for more
              attention than the things I actually wanted to share. A simple
              blog feels like a better fit.
            </p>
            <p>
              The new version begins with the writing. There is no introduction
              to get through and no elaborate navigation. Each post gets a clear
              title, a date, and enough room to be read comfortably.
            </p>
            <p>
              This is only a sample. It is here to test the shape of the archive
              and the reading experience before the real posts arrive.
            </p>
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
  const isSamplePost = window.location.pathname === `/writing/${samplePost.slug}`;

  return (
    <div className="site-shell">
      {isSamplePost ? <SampleArticle /> : <BlogIndex />}
    </div>
  );
}
