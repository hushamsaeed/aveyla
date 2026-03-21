# Aveyla Manta Village — Project Phases

## Phase 1: Project Setup & Design System
**Status**: DONE ✅
**Goal**: Scaffolded Next.js project with Tailwind design tokens matching the FSD colour palette, typography, and spacing system. Sanity project initialised. Dev environment runnable.
**Tasks**:
- [ ] Initialise Next.js 14+ project with App Router, TypeScript, pnpm
- [ ] Configure Tailwind with design tokens: 8 colours, typography scale (Cormorant Garamond + Inter), 8px spacing system
- [ ] Self-host fonts (Cormorant Garamond Light/SemiBold, Inter Regular/Medium/SemiBold)
- [ ] Set up CSS custom properties for colour palette and motion tokens
- [ ] Initialise Sanity project with embedded studio at /studio
- [ ] Configure .env.local from .env.example
- [ ] Set up project structure (app/, components/, lib/, sanity/, public/)
- [ ] Add Vitest + React Testing Library
- [ ] Add Playwright config for E2E
**Done when**:
- [ ] `pnpm dev` starts without errors and renders a page at localhost:3000
- [ ] `pnpm build` completes with zero errors
- [ ] `tailwind.config.ts` contains all 8 colour tokens and typography scale
- [ ] Fonts load correctly (verify Cormorant Garamond + Inter render)
- [ ] `pnpm test` runs (even if no tests yet)

**Outputs**: <!-- filled on completion -->

---

## Phase 2: Design — Pencil Screens
**Status**: TODO
**Goal**: All page designs created in Pencil (.pen files) covering desktop and mobile for every page type. Designs validated before any component code is written.
**Tasks**:
- [ ] Create homepage design (desktop + mobile) — all 9 sections with descent/ascent narrative
- [ ] Create rooms overview + room detail design (desktop + mobile)
- [ ] Create activities overview + activity detail design (desktop + mobile)
- [ ] Create packages overview + package detail design (desktop + mobile)
- [ ] Create Hanifaru Bay editorial page design (desktop + mobile)
- [ ] Create gallery page design (desktop + mobile) — masonry grid + lightbox
- [ ] Create FAQ page design (desktop + mobile) — accordion layout
- [ ] Create contact page design (desktop + mobile) — form + map
- [ ] Create about page design (desktop + mobile)
- [ ] Create global components: nav (desktop + mobile overlay), footer, WhatsApp button
- [ ] Validate all designs match FSD colour palette, typography, and spacing
**Done when**:
- [ ] `ls designs/pencil/*.pen | wc -l` shows design files exist
- [ ] Each design file covers desktop and mobile variants
- [ ] Visual review confirms FSD design system compliance (colours, fonts, spacing)

**Outputs**: <!-- filled on completion -->

---

## Phase 3: Global Components
**Status**: TODO
**Goal**: Navigation bar, footer, WhatsApp floating button, and root layout shell — the persistent UI that wraps every page.
**Tasks**:
- [ ] Build fixed nav: logo (SVG), nav links, mega-menu (Activities), dropdown (Packages), Book Now CTA
- [ ] Nav scroll behaviour: transparent-to-Deep Ocean at 80px, 200ms transition
- [ ] Mobile nav: full-screen overlay, "Menu" label, ESC to close
- [ ] Build footer: logo, contacts (clickable tel/mailto/WhatsApp), nav links, social icons (new tab), payment icons, legal text
- [ ] WhatsApp floating button: fixed bottom-right, wa.me link, tooltip, z-index above all
- [ ] Root layout.tsx wiring: nav + main + footer + WhatsApp
- [ ] Keyboard navigation for mega-menu and mobile nav
**Done when**:
- [ ] `pnpm build` succeeds
- [ ] Nav renders on all pages with correct links
- [ ] Mobile nav opens/closes at <768px
- [ ] Footer displays licence, contacts, social links
- [ ] WhatsApp button visible and clickable on all pages

**Outputs**: <!-- filled on completion -->

---

## Phase 4: Homepage
**Status**: TODO
**Goal**: Complete homepage with all 9 FSD sections implementing the "descent/ascent" visual narrative.
**Tasks**:
- [ ] Hero section: 100vh, video/parallax with poster fallback, headline, dual CTAs, scroll indicator, pause button
- [ ] Brand statement: Deep Ocean bg, monument text, supporting copy
- [ ] Hanifaru Bay feature: two-column, pull quote, editorial, CTA
- [ ] Rooms section: 3 room cards (horizontal scroll mobile), Lagoon Light bg
- [ ] Activities mosaic: 8 cards in staggered grid, progressive darkness
- [ ] Packages section: 3 full-width cards, darkest register
- [ ] Social proof: TripAdvisor badge, rotating review quotes
- [ ] About/conservation teaser: two-column, Coral White bg
- [ ] Smooth scroll for "Explore the Reef" CTA
- [ ] prefers-reduced-motion: disable video autoplay, parallax, animations
**Done when**:
- [ ] `pnpm build` succeeds
- [ ] Homepage renders all 9 sections at localhost:3000
- [ ] Hero video/image displays, CTAs functional
- [ ] Visual register shifts from light (hero) -> dark (packages) -> light (about)
- [ ] Mobile layout correct at 375px

**Outputs**: <!-- filled on completion -->

---

## Phase 5: Room Pages
**Status**: TODO
**Goal**: Rooms overview listing and 3 room detail pages with gallery lightbox, amenities, notice banner, and booking CTA.
**Tasks**:
- [ ] Rooms overview page: 3 room cards linking to detail pages
- [ ] Room detail template: hero image, gallery strip with lightbox, amenity icon grid, description, Book Now CTA
- [ ] Lightbox component: arrow nav, keyboard (left/right/ESC), swipe on mobile, ARIA roles
- [ ] Village Deluxe conditional notice banner (amber, CMS-driven)
- [ ] Three room pages: /rooms/ocean-deluxe, /rooms/beach-deluxe, /rooms/village-deluxe
**Done when**:
- [ ] `pnpm build` succeeds
- [ ] All 4 room routes render (overview + 3 detail)
- [ ] Lightbox opens, navigates via keyboard, closes on ESC
- [ ] Notice banner renders when flag is true, hidden when false

**Outputs**: <!-- filled on completion -->

---

## Phase 6: Activity Pages
**Status**: TODO
**Goal**: Activities overview and 8 activity detail pages with safety/certification blocks where required.
**Tasks**:
- [ ] Activities overview page: 8 activity cards in grid
- [ ] Activity detail template: hero, description, safety block (conditional), related activities
- [ ] Safety/certification component for Scuba & Freediving (PADI requirements, health, minimum age)
- [ ] Eight activity pages: scuba-diving, snorkelling, night-snorkelling, freediving, sandbank-trips, big-game-fishing, local-island-visits
- [ ] Dining page at /dining (activity detail template)
**Done when**:
- [ ] `pnpm build` succeeds
- [ ] All 9 activity routes render (overview + 7 activities + dining)
- [ ] Scuba and freediving pages show safety requirements
- [ ] Related activities component displays 3 suggestions

**Outputs**: <!-- filled on completion -->

---

## Phase 7: Package & Hanifaru Bay Pages
**Status**: TODO
**Goal**: Packages overview, 3 package detail pages, and the Hanifaru Bay editorial feature page.
**Tasks**:
- [ ] Packages overview: 3 package cards
- [ ] Package detail template: hero (dark treatment), inclusions (icon+label), pricing, value comparison, dual CTAs
- [ ] Three package pages: /packages/manta-madness, /packages/dive-dive-dive, /packages/dive-hanifaru
- [ ] Hanifaru Bay page: full-viewport opening image, 400-600 word editorial area, seasonal calendar (June-Nov), manta gallery, CTA to packages
- [ ] Seasonal calendar component: colour-coded months, Aug-Oct highlighted
**Done when**:
- [ ] `pnpm build` succeeds
- [ ] All 5 routes render (packages overview + 3 packages + hanifaru-bay)
- [ ] Package pages show inclusions, pricing area, both CTAs
- [ ] Hanifaru Bay seasonal calendar renders with month highlighting

**Outputs**: <!-- filled on completion -->

---

## Phase 8: Gallery, FAQ, Contact, About, Privacy
**Status**: TODO
**Goal**: Remaining 5 pages — gallery with filters, FAQ accordion, contact form, about page, privacy policy.
**Tasks**:
- [ ] Gallery: masonry grid, filter tabs (All/Underwater/Rooms/Beach/Dining/Activities), URL params, lightbox
- [ ] FAQ: accordion (one-open-at-a-time), categorised, FAQPage schema markup
- [ ] Contact: form (Name/Email/Arrival/Departure/Guests/Message), honeypot spam protection, map embed, direct contacts
- [ ] About: editorial layout, solar/conservation/UNESCO content area, CTA to contact
- [ ] Privacy Policy: static legal page template
- [ ] Branded 404 page (not-found.tsx)
**Done when**:
- [ ] `pnpm build` succeeds
- [ ] Gallery filters work, lightbox accessible
- [ ] FAQ accordion opens/closes, schema validates in Rich Results Test
- [ ] Contact form submits (honeypot rejects bots)
- [ ] About and Privacy pages render
- [ ] 404 page renders with navigation back to home

**Outputs**: <!-- filled on completion -->

---

## Phase 9: CMS Integration
**Status**: TODO
**Goal**: Sanity content models for all 8 types, studio configured, all pages wired to live CMS data.
**Tasks**:
- [ ] Define Sanity schemas: Room, Activity, Package, GalleryImage, Review, FAQItem, SiteNotice, SEOMetadata
- [ ] Configure Sanity Studio with role-based access (Admin, Editor)
- [ ] Build GROQ queries for each page type
- [ ] Wire all pages to Sanity data (replace static/placeholder content)
- [ ] Image pipeline: Sanity image URL builder with WebP, responsive srcset
- [ ] Alt text required validation on GalleryImage schema
- [ ] Seed initial content for all content types
**Done when**:
- [ ] `pnpm build` succeeds with Sanity data
- [ ] Sanity Studio accessible at /studio
- [ ] All 8 content types are CRUD-functional in Studio
- [ ] Editing a room description in Sanity reflects on the live page (after rebuild/revalidation)
- [ ] Editor role cannot make structural changes

**Outputs**: <!-- filled on completion -->

---

## Phase 10: SEO, Analytics & Redirects
**Status**: TODO
**Goal**: Structured data, meta tags, GA4 event tracking, sitemap, and all 16 Wix URL redirects.
**Tasks**:
- [ ] Structured data: Hotel (homepage), FAQPage (FAQ), BreadcrumbList (all pages)
- [ ] Meta tags: unique title + description per page, CMS-editable, OG tags with 1200x630 images
- [ ] Meta title format: "Page Name | Aveyla Manta Village | Maldives"
- [ ] GA4 setup: 12 custom events (hero_cta_click, navigation_book_click, footer_book_click, room_book_click, package_book_click, whatsapp_click, gallery_open, activity_view, hanifaru_page_view, booking_widget_open, faq_expand, video_pause)
- [ ] XML sitemap (auto-generated), robots.txt, Search Console verification
- [ ] 16 Wix 301 redirects in next.config.ts
- [ ] hreflang: en for Phase 1, architecture ready for de/it
- [ ] Canonical URLs (self-referencing) on all pages
**Done when**:
- [ ] `curl -I localhost:3000/copy-of-manta-madness-1` returns 301 (and all 16 redirects)
- [ ] Google Rich Results Test validates Hotel and FAQPage schema
- [ ] `/sitemap.xml` returns valid XML
- [ ] GA4 debug mode shows all 12 events firing

**Outputs**: <!-- filled on completion -->

---

## Phase 11: Performance & Accessibility QA
**Status**: TODO
**Goal**: Meet all non-functional requirements — Lighthouse 90+ mobile, WCAG 2.1 AA, cross-browser verified.
**Tasks**:
- [ ] Lighthouse CI: homepage, room detail, activity detail, gallery — all 90+ mobile
- [ ] LCP < 2.5s on 4G (hero poster < 200KB WebP, video < 8MB)
- [ ] CLS < 0.1 (all images have explicit width/height)
- [ ] JS bundle < 150KB gzip initial load
- [ ] axe-core scan: zero critical, zero serious violations
- [ ] Keyboard-only test: full booking flow (Tab, Enter, Escape)
- [ ] Screen reader test: VoiceOver homepage + gallery lightbox
- [ ] Cross-browser: Chrome, Safari, Firefox, Edge, Samsung Internet (last 2 versions)
- [ ] Responsive: 375, 768, 1024, 1280, 1440px breakpoints
- [ ] Video: muted + playsinline on iOS Safari, prefers-reduced-motion respected
- [ ] Colour contrast: all combinations pass 4.5:1
**Done when**:
- [ ] `pnpm lighthouse` (or Lighthouse CI) reports 90+ mobile on homepage
- [ ] `pnpm test:a11y` (axe scan) reports zero critical/serious
- [ ] `pnpm test:e2e` Playwright cross-browser suite passes
- [ ] Manual keyboard-only booking flow completes successfully

**Outputs**: <!-- filled on completion -->

---

## Phase 12: Launch Prep
**Status**: TODO
**Goal**: Everything needed for DNS cutover — redirects verified, booking live-tested, cookie consent active, monitoring in place.
**Tasks**:
- [ ] DNS cutover plan: reduce TTL 48h before, rollback plan documented
- [ ] SSL certificate: active and auto-renewing on Vercel
- [ ] GA4 verified firing on production domain (no duplicate tags)
- [ ] Search Console: property verified, sitemap submitted
- [ ] All 16 Wix 301 redirects verified with curl on production
- [ ] robots.txt: production config (no disallow on content pages)
- [ ] Booking engine: live transaction test on production, confirmation email received
- [ ] Content audit: no placeholder text, unique meta per page
- [ ] Cookie consent banner: blocks GA4 until accepted
- [ ] Legal: Privacy Policy live, footer licence/registration text correct
- [ ] Hotjar or Microsoft Clarity installed for post-launch UX review
- [ ] 404 page: branded, links to home and key pages
**Done when**:
- [ ] `curl -I https://aveyla.com` returns 200 with valid SSL
- [ ] All 16 redirects return 301 on production domain
- [ ] Booking flow completable end-to-end on production
- [ ] Cookie consent blocks GA4 until accepted (verified in network tab)
- [ ] Hotjar/Clarity recording sessions

**Outputs**: <!-- filled on completion -->
