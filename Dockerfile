FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build-time env vars (defaults for build — overridden at runtime)
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=""
ENV NEXT_PUBLIC_SANITY_DATASET="production"
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=""
ENV NEXT_PUBLIC_GTM_ID=""
ENV NEXT_PUBLIC_IPMS247_URL=""
ENV NEXT_PUBLIC_WHATSAPP_NUMBER="9607773998"
ENV NEXT_PUBLIC_GOOGLE_MAPS_KEY=""
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
