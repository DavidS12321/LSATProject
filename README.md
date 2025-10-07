# LSATProject

This repository hosts the Argumind web application. The Next.js project lives in the `argumind/` workspace.

## Getting started

1. Install dependencies (this installs the `argumind` workspace packages):
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```

The helper scripts defined at the repository root simply forward to the equivalent scripts inside the `argumind` workspace, so you can also run `npm run build`, `npm run lint`, etc. at the root.

### Troubleshooting

If you see `'next' is not recognized as an internal or external command`, it means the workspace dependencies have not been installed yet. Run `npm install` from the repository root (or `npm install` inside the `argumind/` folder) so the Next.js CLI is downloaded to `node_modules/.bin/` before starting the dev server.
