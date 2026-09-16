# Shalin Naidoo | Writing

A personal blog built with React, TypeScript, and Vite. The homepage opens directly into a simple writing list and includes one sample article.

```sh
npm install
npm run dev
```

Validate with `npm run build` and `npm run lint`.

- `src/App.tsx`: the post index and sample article.
- `src/App.css`: responsive editorial layout and component styling.
- `src/index.css`: global typography, color tokens, and automatic dark mode.
- `public/images/building-this-blog.webp`: generated article cover featuring the post title.
- `docs/image-prompts/building-this-blog.md`: cover generation prompt and asset details.
- `public/fonts/`: self-hosted Geist, Geist Mono, and Instrument Serif, with their licences.
- `docs/brand-digest.html`: an offline brand reference covering the Louder palette,
  typography, components, contrast, and copyable CSS tokens. Open the file directly
  in a browser. It stays in the repo and is not included in the production build.

The visual identity follows [Louder](https://trylouder.ai/): warm paper
(`#f4f2ec`), near-black ink (`#0b0b0a`), and electric lime (`#c6ff3d`). The header
sun/moon button switches between light and dark mode and remembers the choice.
It follows the system preference until first used. Dark colours are a portfolio
adaptation of Louder's light palette.

## Cloudflare Workers

Cloudflare Workers serves the site with Static Assets. `wrangler.jsonc`
publishes `dist` and enables the SPA fallback so direct visits and refreshes at
`/writing/building-this-blog` load the React application. No Worker script is
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
| Production branch | `master` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | Repository root |

The Worker name in Cloudflare must match `portfolio` in `wrangler.jsonc`.

Production: <https://shalinbtw.com>

The custom domain is declared in `wrangler.jsonc`. The `workers.dev` address and
version preview URLs are disabled, matching the Cloudflare dashboard settings.

The former Cloudflare Pages project has been removed. Use the Worker's deployment
history in Cloudflare for rollbacks.
