FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Dependencies
FROM base AS deps
WORKDIR /app

# Build tools for better-sqlite3 native module
RUN apk add --no-cache python3 make g++

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile
# Build better-sqlite3 native module
RUN cd node_modules/better-sqlite3 && npx --yes node-gyp rebuild

# Build
FROM base AS builder
WORKDIR /app

# Need python3/make/g++ again for any rebuild steps
RUN apk add --no-cache python3 make g++

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install tsx globally for seed script
RUN npm install -g tsx

# Build-time args
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=""
ARG NEXT_PUBLIC_GTM_ID=""
ARG NEXT_PUBLIC_IPMS247_URL=""
ARG NEXT_PUBLIC_WHATSAPP_NUMBER=9607773998
ARG NEXT_PUBLIC_GOOGLE_MAPS_KEY=""

ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID
ENV NEXT_PUBLIC_IPMS247_URL=$NEXT_PUBLIC_IPMS247_URL
ENV NEXT_PUBLIC_WHATSAPP_NUMBER=$NEXT_PUBLIC_WHATSAPP_NUMBER
ENV NEXT_PUBLIC_GOOGLE_MAPS_KEY=$NEXT_PUBLIC_GOOGLE_MAPS_KEY
ENV NEXT_TELEMETRY_DISABLED=1

# Create data directory and seed database before build
RUN mkdir -p data uploads
RUN tsx scripts/seed-database.ts

RUN pnpm build

# Production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Need native module support at runtime
RUN apk add --no-cache libstdc++

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy the seeded database
COPY --from=builder --chown=nextjs:nodejs /app/data ./data

# Create uploads directory and Next.js ISR cache directory
RUN mkdir -p uploads .next/cache && chown nextjs:nodejs uploads data .next/cache

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV DATABASE_PATH="./data/aveyla.db"
ENV UPLOADS_DIR="./uploads"

CMD ["node", "server.js"]
