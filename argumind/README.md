# Argumind Web

Argumind is an AI-assisted LSAT preparation experience that will seamlessly connect web and mobile. This repository contains the Next.js web app foundation with NextAuth, Prisma, TypeScript, and Tailwind CSS.

## Getting started

You can work entirely from the repository root thanks to the npm workspace configuration:

```bash
npm install
npm run dev
```

> ❗️ If you skip `npm install`, the dev server will fail with `'next' is not recognized as an internal or external command`. Install dependencies first so the Next.js CLI is available.

If you prefer to manage the app directly inside the `argumind/` directory, the following commands are equivalent:

1. Install dependencies:
   ```bash
   cd argumind
   npm install
   ```
2. Copy the environment template and provide credentials when they become available:
   ```bash
   cp .env.example .env.local
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

> ℹ️ Database connectivity is intentionally deferred for this iteration. API routes and authentication flows are scaffolded but return placeholder responses until PostgreSQL is configured.

## Features

- Minimalist landing page introducing Argumind
- Client-side sign-in and sign-up forms with Zod-powered validation
- Google sign-in entry point (pending OAuth credentials)
- Prisma schema and NextAuth configuration ready for future database integration
