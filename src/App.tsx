import "./App.css";

type Post = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingTime: string;
  cover: string;
  coverAlt: string;
};

const samplePost: Post = {
  slug: "building-this-blog",
  title: "Building this blog",
  summary: "A short note on simplifying this site into a place for writing.",
  publishedAt: "10 September 2026",
  readingTime: "2 min read",
  cover: "/images/blog-desk.webp",
  coverAlt: "An open blank notebook beside a pencil and keyboard on a blue desk",
};

const posts = [samplePost];

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="/" aria-label="Shalin Naidoo, home">
        <span className="wordmark-mark" aria-hidden="true">
          SN
        </span>
        <span>Shalin Naidoo</span>
      </a>
    </header>
  );
}

function BlogIndex() {
  return (
    <>
      <SiteHeader />
      <main className="post-grid" aria-label="Blog posts">
        {posts.map((post) => (
          <article className="post-card" key={post.slug}>
            <a href={`/writing/${post.slug}`}>
              <img
                src={post.cover}
                alt={post.coverAlt}
                width="1200"
                height="900"
              />
              <div className="post-card-body">
                <div className="post-meta">
                  <time dateTime="2026-09-10">{post.publishedAt}</time>
                  <span>{post.readingTime}</span>
                </div>
                <h1>{post.title}</h1>
                <p>{post.summary}</p>
                <span className="read-link">
                  Read post <span aria-hidden="true">↗</span>
                </span>
              </div>
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
            width="1200"
            height="900"
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
