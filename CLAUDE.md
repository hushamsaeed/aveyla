# Project: Aveyla Manta Village

> Keep this file under 150 lines. Loaded every session — every line costs context.

## Stack
- **Language / Runtime**: TypeScript / Node.js
- **Framework**: Next.js 14+ (App Router, RSC)
- **CMS**: Sanity (headless, project: c1itog7c)
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
# Seed CMS:     node scripts/seed-content.mjs
# Seed packages: node scripts/seed-packages.mjs
# Gen images:   GEMINI_API_KEY=... node scripts/generate-images.mjs
```

## Structure
```
src/
  app/            # Next.js App Router pages (24 routes)
  components/     # Feature-organized (global/, home/, rooms/, etc.)
  lib/            # Utilities (sanity client, analytics, structuredData)
  sanity/         # CMS config, schemas (8 types), queries
  styles/         # globals.css (Tailwind directives + CSS custom properties)
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
- Sanity schemas: src/sanity/schemas/
- GROQ queries: src/sanity/queries.ts
- Package pricing: src/app/packages/[slug]/page.tsx

---

## Core Rules
- **Plan first.** 3+ steps → write tasks/todo.md before code.
- **Verify before done.** Tests must pass. Show output.
- **No hacks.** Workarounds get replaced with real fixes.
- **Minimal impact.** Only change what the task requires.
- **Ask before destroying.** Deletes, force-pushes, truncates → confirm first.

## Learned Rules
- next.config must be .mjs (not .ts) for Next.js 14.2
- Orchestrator worker needs `pnpm` in allowedTools, not just `npm`
- Server has aggressive fail2ban — max 1 SSH per 5 min, never rapid-retry
- Dokploy v0.27.1 uses Better Auth — login via `/api/auth/sign-in/email`, session cookies
- Sanity CLI auth config at `~/.config/sanity/config.json` (field: authToken)
- Gemini image model: `gemini-2.5-flash-image` with `responseModalities: ["IMAGE"]`
- `use(params)` is React 19 only — use `useParams()` on React 18 client components
