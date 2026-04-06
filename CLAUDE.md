# Project: Aveyla Manta Village

> Keep this file under 150 lines. Loaded every session — every line costs context.

## Stack
- **Language / Runtime**: TypeScript / Node.js
- **Framework**: Next.js 14+ (App Router, RSC)
- **Database**: SQLite (better-sqlite3) + Drizzle ORM
- **Auth**: Custom JWT (jose + bcryptjs)
- **Styling**: Tailwind CSS 3.4 + CSS custom properties
- **Testing**: Vitest + React Testing Library, Playwright (E2E)
- **Package manager**: pnpm

## Commands
```bash
# Dev server:   pnpm dev
# Build:        pnpm build
# Lint + fix:   pnpm lint
# Tests (all):  pnpm test
# Tests (one):  pnpm vitest run src/path/to/file.test.ts
# E2E:          pnpm test:e2e
# Seed DB:      npx tsx scripts/seed-database.ts
# Gen images:   GEMINI_API_KEY=... node scripts/generate-images.mjs
```

## Structure
```
src/
  app/            # Next.js App Router pages + /admin/* panel
  components/     # Feature-organized (global/, home/, rooms/, admin/)
  db/             # Drizzle schema + SQLite connection
  lib/            # Utilities (data/, auth, images, analytics)
data/             # SQLite database (aveyla.db)
uploads/          # User-uploaded images
```

## Design System (Beach House Rebrand)
- **Primary**: Terracotta #C4724A
- **Background**: Linen #FAF6F0 | Salt White #FFFDF9
- **Text**: Dark Driftwood #2A2018 | Driftwood #8B7355
- **Accent**: Coral Clay #E8A87C | Warm Sand #D4B896
- **Links**: Muted Ocean #3D6B72
- **Fonts**: YoungSerif (display) + Lora (editorial) + Instrument Sans (UI)

## Deployment
- **Live**: https://aveyla.thecrayfish.tech
- **Server**: 89.167.93.86 (Dokploy, Traefik, port 3012)
- **Docker**: `docker build -t aveyla-web . && docker run -d --name aveyla-web -p 3012:3000 ...`
- **GitHub**: https://github.com/hushamsaeed/aveyla

## Reference Files
- Design tokens: tailwind.config.ts, src/app/globals.css
- Layout: src/app/layout.tsx
- DB schema: src/db/schema.ts
- Data access: src/lib/data/ (rooms, activities, packages, gallery, etc.)
- Auth: src/lib/auth.ts
- Admin panel: src/app/admin/
- Package pricing: src/app/packages/[slug]/page.tsx

---

## Core Rules
- **Plan first.** 3+ steps → write tasks/todo.md before code.
- **Verify before done.** Tests must pass. Show output.
- **No hacks.** Workarounds get replaced with real fixes.
- **Minimal impact.** Only change what the task requires.
- **Ask before destroying.** Deletes, force-pushes, truncates → confirm first.

## Environment Variables
- `DATABASE_PATH` — SQLite path (default: ./data/aveyla.db)
- `JWT_SECRET` — Required in production for admin auth
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — Initial admin user (seed only)
- `UPLOADS_DIR` — Upload directory (default: ./uploads)
- `RESEND_API_KEY` — Email service (optional)

## Learned Rules
- next.config must be .mjs (not .ts) for Next.js 14.2
- better-sqlite3 needs `serverExternalPackages` in next.config.mjs
- Orchestrator worker needs `pnpm` in allowedTools, not just `npm`
- Server has aggressive fail2ban — max 1 SSH per 5 min, never rapid-retry
- Dokploy v0.27.1 uses Better Auth — login via `/api/auth/sign-in/email`, session cookies
- Gemini image model: `gemini-2.5-flash-image` with `responseModalities: ["IMAGE"]`
- `use(params)` is React 19 only — use `useParams()` on React 18 client components
- Admin panel at /admin/login (default: admin@aveyla.com / aveyla2024)
