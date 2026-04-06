#!/bin/sh
set -e

# Run seed if database doesn't exist
if [ ! -f "./data/aveyla.db" ]; then
  echo "No database found. Running seed..."
  npx tsx scripts/seed-database.ts
fi

# Start Next.js
exec node server.js
