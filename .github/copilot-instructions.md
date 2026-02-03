# Copilot instructions (Globetrack)

## Big picture
- Next.js **App Router** app (Next 15 / React 19). Public site lives under `app/(main)` and tracking under `app/track`; admin UI under `app/admin`.
- Admin gating is cookie-based:
  - `middleware.ts` redirects `/admin/*` to `/login` when cookie `admin` is missing.
  - `server/actions/authActions.ts` sets/deletes the `admin` cookie and authenticates against the `admin_users` table (NOT Supabase Auth).
  - `app/layout.tsx` reads header `x-is-admin-route` (set by `middleware.ts`) to hide the marketing `Header`/`Footer` on admin routes.

## Local dev workflow
- Package manager: `pnpm` (repo has `pnpm-lock.yaml`).
- Common commands:
  - `pnpm dev`
  - `pnpm build`
  - `pnpm start`
  - `pnpm lint`
- Note: `next.config.mjs` sets `eslint.ignoreDuringBuilds=true` and `typescript.ignoreBuildErrors=true` (builds may succeed with type/lint issues).

## Supabase integration
- Clients:
  - Browser/client components typically import `createClient` from `lib/supabase.ts`.
  - Server Actions typically import `createClient` from `lib/supabase/server.ts`.
- Required env vars (missing values cause `lib/supabase.ts` to return a mock client):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Data model is Supabase Postgres tables (not Supabase Auth):
  - `admin_users` used by `server/actions/authActions.ts`.
  - `packages` used by `server/actions/packageActions.ts` and `lib/actions/package.ts`.
- Storage:
  - Bucket name: `package-images` (used in `lib/supabase-storage.ts`).
  - `server/actions/storageActions.ts` calls `initStorage()`; `app/layout.tsx` calls `initializeStorage()` at module load (non-blocking).
  - If "Bucket not found" error occurs, the bucket needs to be created in Supabase (code will attempt auto-creation).
  - Storage policies allow public read and anonymous upload/delete for `package-images` bucket.

## Server Actions & patterns
- Mutations and most data access happen via Next Server Actions in `server/actions/*` (`"use server"`).
- Admin package listing filters by cookie admin id:
  - `server/actions/packageActions.ts#getAllPackages()` applies `.eq('admin_id', adminId)` when an admin cookie is present.
  - If packages exist but don’t show up, check that rows have `admin_id` matching the logged-in admin.

## API routes
- Email route: `app/api/send-email/route.ts` uses `nodemailer` (Gmail SMTP).
  - If modifying, keep credentials/config in environment variables (it’s currently hardcoded in the file).

## UI conventions
- UI components are in `components/` (shadcn/radix style). Admin UI components live in `components/admin/*`.
- Toasters:
  - `app/providers.tsx` mounts `sonner` Toaster.
  - `app/layout.tsx` also mounts `components/ui/toaster`.

## Third-party scripts
- Root layout (`app/layout.tsx`) is the canonical place for global scripts (e.g., Jivo chat widget).
