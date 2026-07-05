# The Lone Traveler

A personal travel + photography blog: public stories, destination hubs, and a
gallery, with an owner-only admin desk for writing entries and uploading
photographs and films.

**Stack**: Next.js 16 (App Router) · Tailwind CSS 4 · Neon Postgres + Prisma 7 ·
Auth.js v5 (Google, single-account allowlist) · Cloudinary (signed uploads,
image/video delivery) · Vercel

## One-time setup

Copy the env template and fill it in as you complete the three steps below:

```bash
cp .env.example .env.local
```

### 1. Neon (database)

1. Create a project at https://console.neon.tech
2. Copy the **pooled** connection string (host contains `-pooler`) → `DATABASE_URL`
3. Copy the **direct** connection string → `DIRECT_URL`
4. Run the first migration and seed:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 2. Google OAuth (admin sign-in)

1. https://console.cloud.google.com/apis/credentials → Create OAuth client ID
   (type: Web application)
2. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   (add the production one after deploying: `https://YOUR-DOMAIN/api/auth/callback/google`)
3. Client ID → `AUTH_GOOGLE_ID`, client secret → `AUTH_GOOGLE_SECRET`
4. `ADMIN_EMAIL` = the Google account that owns the site (the only one allowed in)
5. `AUTH_SECRET` = output of `npx auth secret` (or any long random string)

### 3. Cloudinary (photos and films)

1. Create a free account at https://cloudinary.com
2. From the dashboard copy: cloud name → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`,
   API key → `CLOUDINARY_API_KEY`, API secret → `CLOUDINARY_API_SECRET`

## Run

```bash
npm install
npm run dev
```

- Public site: http://localhost:3000
- Admin desk: http://localhost:3000/admin (Google sign-in, owner account only)

## Deploy (Vercel)

1. Push to GitHub and import the repo at https://vercel.com/new
2. Add every variable from `.env.local` in Project Settings → Environment
   Variables (set `NEXT_PUBLIC_SITE_URL` to the production URL)
3. Add the production redirect URI to the Google OAuth client
4. Deploy. Migrations: run `npx prisma migrate deploy` against Neon when the
   schema changes (or wire it into the build command).

## How content works

- **Stories** are markdown. Media is embedded via the admin editor's
  "Insert media" button, which writes `![alt](cld:image:<publicId>)` or
  `![alt](cld:video:<publicId>)` — rendered as optimized Cloudinary images and
  streams on the public site.
- **Destinations** are first-class pages that gather their stories,
  photographs, and films.
- **Gallery** shows every media item marked "Show in public gallery".
- Drafts are invisible publicly until published.
