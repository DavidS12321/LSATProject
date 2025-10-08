# Argumind Web

Argumind is an AI-assisted LSAT preparation experience that will seamlessly connect web and mobile. This repository contains the Next.js web app foundation with NextAuth, Prisma, TypeScript, and Tailwind CSS.

## Getting started

### 1. Provision PostgreSQL on Supabase
1. Create a new project in [Supabase](https://supabase.com/).
2. Within the project settings, copy the **Connection string** for the primary database (Node.js format works well).
3. Whitelist your local IP if necessary and create a strong database password.

### 2. Configure environment variables
Create an `.env` file in `argumind/` based on the template below. Values marked with `TODO` must be supplied by your Supabase and OAuth credentials.

```bash
# argumind/.env
DATABASE_URL="postgresql://postgres:[SUPABASE_PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres"
NEXTAUTH_SECRET="generate_a_long_random_string"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="TODO.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="TODO"
```

A copy of this template lives in `.env.example`.

### 3. Install dependencies
From the repository root run:

```bash
npm install
```

> **Note:** The `bcryptjs` dependency is declared in `package.json`. If your environment blocks new package downloads you will need to install it manually when network access is available.

### 4. Apply the Prisma schema
Generate the Prisma client and push the schema to Supabase:

```bash
npx prisma generate
npx prisma db push
```

This will create the `User`, `Account`, `Session`, and `VerificationToken` tables with hashed password support.

### 5. Start the development server

```bash
npm run dev
```

The app is now accessible at [http://localhost:3000](http://localhost:3000).

## Auth APIs

### Register a user
- **Route:** `POST /api/auth/register`
- **Body:**
  ```json
  {
    "name": "Test User",
    "email": "user@example.com",
    "password": "Password123"
  }
  ```
- **Success response:** `201 Created` with `{ "message": "Account created successfully." }`
- **Failure cases:**
  - `409 Conflict` if the email already exists.
  - `422 Unprocessable Entity` when validation fails.

You can verify the endpoint with Postman by creating a `POST` request to `http://localhost:3000/api/auth/register` and sending the JSON payload above.

### Sign in
Credential-based sign in is provided by NextAuth:

```http
POST /api/auth/callback/credentials
Content-Type: application/x-www-form-urlencoded

csrfToken=...&email=user@example.com&password=Password123
```

The front-end form handles this for you using `next-auth`'s `signIn` helper.

Google OAuth is available once `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are configured.

## Features

- Minimalist landing page introducing Argumind
- Credential-based sign in & sign up with Prisma + NextAuth
- Google OAuth entry point (requires provider credentials)
- Secure password hashing that prefers `bcryptjs` with an automatic Node `scrypt` fallback
- Zod-powered validation on both client and server
- Supabase-ready PostgreSQL schema managed via Prisma
