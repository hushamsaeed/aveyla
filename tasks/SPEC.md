# Aveyla Manta Village — Website Redesign Specification

## Summary

Full website redesign for Aveyla Manta Village, a 16-room boutique beachfront hotel on Dharavandhoo Island, Baa Atoll — the Maldives' only UNESCO Marine Biosphere Reserve. Replacing a generic Wix site with a cinematic, performance-optimized Next.js application that positions Aveyla as the definitive destination for Hanifaru Bay manta ray encounters.

**Business goal:** 40% increase in direct bookings within 6 months of launch, reducing OTA dependency.
**Launch target:** April 2026 (ahead of June manta season).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ (App Router, React Server Components) |
| CMS | Sanity (headless, GROQ queries) |
| Styling | Tailwind CSS + CSS custom properties |
| Hosting | Vercel |
| CDN/Images | Vercel Image Optimization (WebP + JPEG fallback) |
| Analytics | GA4 + Google Tag Manager |
| Forms | Resend (email API) + React Hook Form |
| Booking | IPMS247 (existing — iframe modal or styled redirect) |
| Maps | Google Maps Embed API or Mapbox GL JS |
| Package Manager | pnpm |

## Architecture

```
aveyla/
├── _intake/                  # Source documents (BRD, PRD, FSD)
├── designs/pencil/           # Pencil design files (.pen)
├── tasks/                    # Spec, phases, status
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── (site)/           # Main site route group
│   │   │   ├── page.tsx      # Homepage
│   │   │   ├── rooms/
│   │   │   ├── activities/
│   │   │   ├── packages/
│   │   │   ├── hanifaru-bay/
│   │   │   ├── gallery/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── faq/
│   │   │   └── privacy-policy/
│   │   ├── layout.tsx        # Root layout (nav + footer)
│   │   └── not-found.tsx     # Branded 404
│   ├── components/
│   │   ├── global/           # Nav, Footer, WhatsApp, CookieConsent
│   │   ├── home/             # Homepage sections
│   │   ├── rooms/
│   │   ├── activities/
│   │   ├── packages/
│   │   ├── gallery/
│   │   ├── shared/           # Lightbox, CTA, Cards, Accordion
│   │   └── ui/               # Design system primitives
│   ├── lib/
│   │   ├── sanity/           # Client, queries, types
│   │   └── analytics/        # GA4 event helpers
│   └── styles/
│       └── globals.css       # Tailwind directives, CSS vars
├── sanity/                   # Sanity Studio (embedded or separate)
│   ├── schemas/              # 8 content types
│   └── sanity.config.ts
├── public/
│   ├── fonts/                # Cormorant Garamond + Inter (self-hosted)
│   └── images/               # Static assets, payment icons, social icons
├── next.config.ts
├── tailwind.config.ts
├── .env.example
└── package.json
```

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier | Yes |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (production) | Yes |
| `SANITY_API_TOKEN` | Sanity read token (server-side) | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID | Yes |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID | Yes |
| `NEXT_PUBLIC_IPMS247_URL` | IPMS247 booking engine URL | Yes |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (9607773998) | Yes |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Google Maps Embed API key | Yes |
| `RESEND_API_KEY` | Resend email API key (contact form) | Yes |
| `CONTACT_EMAIL` | Destination for contact form (info@aveyla.com) | Yes |

## Test Setup

- **Unit/Component:** Vitest + React Testing Library
- **E2E:** Playwright (cross-browser: Chrome, Safari, Firefox, Edge)
- **Performance:** Lighthouse CI (threshold: 90 mobile)
- **Accessibility:** axe-core (zero critical/serious violations)
- **No external services required to run tests** (Sanity mocked in unit tests)

## Design System

### Colours
| Token | Hex | Usage |
|-------|-----|-------|
| deep-ocean | #0A1628 | Primary dark bg, hero overlay, footer |
| ocean-blue | #0D4F6E | Nav, headings, CTA bg, links |
| reef-teal | #0E7490 | Section accents, icons, hover states |
| sand-gold | #C8A96E | Dividers, decorative accents, CTA highlights |
| lagoon-light | #E8F4F8 | Light section bg, table alternates |
| coral-white | #FDFAF6 | Page bg, card bg |
| pure-white | #FFFFFF | Text on dark, icons on dark |
| slate | #4A5568 | Body text, captions |

### Typography
- **Display/Headlines:** Cormorant Garamond (Light 300, SemiBold 600)
- **Body/UI:** Inter (Regular 400, Medium 500, SemiBold 600)
- Max two typefaces. No exceptions.

### Spacing
- Base unit: 8px. All spacing multiples of 8.
- 12-column grid, max-width 1440px.
- Gutters: 32px desktop, 16px mobile.

## Pages (24 total)

| # | Page | Route |
|---|------|-------|
| 1 | Homepage | `/` |
| 2 | Rooms Overview | `/rooms` |
| 3 | Ocean Deluxe | `/rooms/ocean-deluxe` |
| 4 | Beach Deluxe | `/rooms/beach-deluxe` |
| 5 | Village Deluxe | `/rooms/village-deluxe` |
| 6 | Activities Overview | `/activities` |
| 7 | Scuba Diving | `/activities/scuba-diving` |
| 8 | Snorkelling | `/activities/snorkelling` |
| 9 | Night Snorkelling | `/activities/night-snorkelling` |
| 10 | Freediving | `/activities/freediving` |
| 11 | Sandbank Trips | `/activities/sandbank-trips` |
| 12 | Big Game Fishing | `/activities/big-game-fishing` |
| 13 | Local Island Visits | `/activities/local-island-visits` |
| 14 | Dining | `/dining` |
| 15 | Packages Overview | `/packages` |
| 16 | Manta Madness | `/packages/manta-madness` |
| 17 | Dive Dive Dive | `/packages/dive-dive-dive` |
| 18 | Dive Hanifaru | `/packages/dive-hanifaru` |
| 19 | Hanifaru Bay | `/hanifaru-bay` |
| 20 | Gallery | `/gallery` |
| 21 | About | `/about` |
| 22 | Contact | `/contact` |
| 23 | FAQ | `/faq` |
| 24 | Privacy Policy | `/privacy-policy` |

## Features & Acceptance Criteria

### F1: Cinematic Homepage (9 sections)
- Hero with video/parallax, headline "Where the Manta Rays Are."
- Brand statement, Hanifaru feature, rooms cards, activities mosaic, packages, social proof, about teaser
- "Descent/ascent" visual narrative arc (light -> dark -> light)
- AC: All 9 sections render, CTAs functional, video pauses on prefers-reduced-motion

### F2: IPMS247 Booking Integration
- "Book Now" CTA in nav, hero, rooms, packages, footer
- Modal overlay or styled new-tab redirect
- AC: Booking flow completable from any CTA, GA4 event fires on open

### F3: WhatsApp Floating Button
- Persistent on all pages, links to wa.me/9607773998
- AC: Opens native app on mobile, web.whatsapp.com on desktop, GA4 tracks clicks

### F4: Room Pages with Lightbox Gallery
- 3 detail pages + overview listing
- Photo gallery, amenity grid, conditional notice banner, booking CTA
- AC: Lightbox navigates via keyboard/swipe, notice banner CMS-togglable

### F5: Activity Pages with Safety Blocks
- 8 detail pages + overview listing
- Safety/certification requirements on scuba & freediving
- AC: All 8 pages render, safety blocks present where required

### F6: Package Pages with Pricing
- 3 detail pages + overview
- Inclusions, pricing, value comparison, booking + WhatsApp CTAs
- AC: Pricing CMS-editable, both CTAs functional

### F7: Hanifaru Bay Editorial
- Full-viewport opening image, 400-600 word editorial
- Seasonal calendar (June-November), manta gallery
- AC: Calendar renders, CMS-editable, links to relevant packages

### F8: Filterable Gallery
- Masonry grid, filter by category (All, Underwater, Rooms, Beach, Dining, Activities)
- Lightbox with keyboard/swipe navigation
- AC: Filters work via URL params, lightbox accessible, images lazy-loaded

### F9: FAQ with Schema Markup
- Accordion, categorised, one-open-at-a-time
- FAQPage structured data
- AC: Schema validates in Google Rich Results Test, CMS-editable

### F10: Contact Form
- Name, Email, Arrival/Departure dates, Guests, Message
- Honeypot spam protection, auto-acknowledgement email
- AC: Submission sends to info@aveyla.com, auto-reply received, spam test passes

### F11: Sanity CMS
- 8 content types: Room, Activity, Package, Gallery Image, Review, FAQ Item, Site Notice, SEO Metadata
- Staff can edit rooms, packages, gallery, FAQ, notices without developer
- AC: All content types CRUD-functional in Sanity Studio, role-based access works

### F12: SEO & Analytics
- Structured data (Hotel, FAQPage, BreadcrumbList), meta/OG tags per page
- 12 GA4 custom events, XML sitemap, robots.txt
- 16 Wix 301 redirects
- AC: All redirects return 301, schema validates, GA4 events fire

### F13: Performance & Accessibility
- Lighthouse 90+ mobile, LCP < 2.5s, CLS < 0.1
- WCAG 2.1 AA, axe zero critical/serious, keyboard-navigable booking flow
- AC: Lighthouse CI passes, axe scan clean, VoiceOver test passes

### F14: Cookie Consent & Legal
- Cookie consent banner (GDPR), Privacy Policy page
- Footer: licence, registration, tourism act
- AC: Consent banner blocks GA4 until accepted, legal text in footer

## Out of Scope (Phase 1)

- Mobile app (iOS/Android)
- New PMS (migration from IPMS247)
- Email marketing platform (Mailchimp/Klaviyo beyond basic embed)
- Social media content creation
- German and Italian translations (Phase 2)
- Photography/video production
- TripAdvisor/Booking.com listing management

## Definition of Done

1. All 24 pages render correctly on Chrome, Safari, Firefox, Edge (last 2 versions)
2. Mobile-first responsive at 375, 768, 1024, 1280, 1440px breakpoints
3. Lighthouse mobile 90+ on all page types
4. WCAG 2.1 AA — zero critical/serious axe violations
5. All 16 Wix URLs 301-redirect correctly
6. Booking flow completable from every "Book Now" CTA
7. WhatsApp button functional on all pages
8. All 12 GA4 events firing
9. Sanity CMS: staff can edit all content types without developer
10. All structured data validates
11. Cookie consent blocks tracking until accepted
12. Contact form delivers to info@aveyla.com with auto-reply
