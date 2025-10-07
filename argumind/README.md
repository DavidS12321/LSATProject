# Argumind Web

Argumind is an AI-assisted LSAT preparation experience that will seamlessly connect web and mobile. This repository contains the Next.js web app foundation with NextAuth, Prisma, TypeScript, and Tailwind CSS.

## Getting started

1. Install dependencies:
   ```bash
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
