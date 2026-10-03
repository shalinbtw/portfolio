# Shalin Naidoo | Writing

A personal blog built with React, TypeScript, and Vite. The homepage opens directly into a grid of posts, with articles at `/writing/:slug`.

```sh
npm install
npm run dev
```

Validate with `npm run build` and `npm run lint`.

- `src/App.tsx`: the post index and shared article layout.
- `src/posts.ts`: article content and metadata, ordered newest first.
- `src/App.css`: responsive editorial layout and component styling.
- `src/index.css`: global typography and dark color tokens.
- `public/fonts/`: self-hosted Poppins for the site, plus the Geist, Geist Mono, and
  Instrument Serif files the brand digest uses, with their licences.
- `docs/brand-digest.html`: an offline reference for the earlier Louder palette,
  typography, components, contrast, and copyable CSS tokens. Open the file directly
  in a browser. It stays in the repo and is not included in the production build.

The look follows the LocalThunk blog landing page: dark slate (`#1a242c`), off-white text (`#f3f6f8`), Poppins, and a grid of
posts showing a date above a large title. Electric lime (`#c6ff3d`) remains for the
favicon and text selection. The site always uses this dark palette.

## Cloudflare Workers

Cloudflare Workers serves the site with Static Assets. `wrangler.jsonc`
publishes `dist` and enables the SPA fallback so direct visits and refreshes at
`/writing/engineering-the-feedback-loop` load the React application. No Worker script is
needed to serve the site.

Use the Node.js version in `.node-version` and install dependencies with `npm ci`.

```sh
# Build and preview with Cloudflare's local runtime
npm run preview

# Authenticate once, then build and deploy
npx wrangler login
npm run deploy
```

To validate deployment configuration without publishing:

```sh
npm run build
npx wrangler deploy --dry-run
```

Connect the Worker to GitHub under **Settings > Builds** using these settings:

| Setting | Value |
| --- | --- |
| Repository | `shalinbtw/portfolio` |
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | Repository root |

The Worker name in Cloudflare must match `portfolio` in `wrangler.jsonc`.

Production: <https://shalinbtw.com>

The custom domain is declared in `wrangler.jsonc`. The `workers.dev` address and
version preview URLs are disabled, matching the Cloudflare dashboard settings.

The former Cloudflare Pages project has been removed. Use the Worker's deployment
history in Cloudflare for rollbacks.
