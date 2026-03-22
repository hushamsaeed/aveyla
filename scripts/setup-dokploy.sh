#!/usr/bin/env bash
# Setup Aveyla in Dokploy via API — run this on the server
# Usage: ssh root@89.167.93.86 'bash -s' < scripts/setup-dokploy.sh

set -euo pipefail

PGCONT=$(docker ps -q --filter name=dokploy-postgres)
DOKPLOY_URL="http://localhost:3000"

echo "=== Getting admin credentials ==="
ADMIN_EMAIL=$(docker exec $PGCONT psql -U dokploy -d dokploy -Atc "SELECT email FROM auth LIMIT 1")
ADMIN_PASS_HASH=$(docker exec $PGCONT psql -U dokploy -d dokploy -Atc "SELECT password FROM auth LIMIT 1")
echo "Admin email: $ADMIN_EMAIL"

# Generate an API token directly in the database
API_TOKEN=$(openssl rand -hex 32)
ADMIN_ID=$(docker exec $PGCONT psql -U dokploy -d dokploy -Atc "SELECT \"authId\" FROM admin LIMIT 1")

echo "=== Creating API token ==="
docker exec $PGCONT psql -U dokploy -d dokploy -c "
INSERT INTO apikey (\"apiKeyId\", name, key, \"expiresAt\", \"authId\")
VALUES (
  'aveyla-setup-' || substr(md5(random()::text), 1, 8),
  'aveyla-setup',
  '$API_TOKEN',
  NOW() + INTERVAL '1 year',
  '$ADMIN_ID'
) ON CONFLICT DO NOTHING;
" 2>/dev/null || echo "(token may already exist)"

echo "=== Testing API token ==="
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DOKPLOY_URL/api/project.all" -H "x-api-key: $API_TOKEN")
if [ "$HTTP_CODE" != "200" ]; then
  echo "API token auth failed ($HTTP_CODE). Trying Bearer..."
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DOKPLOY_URL/api/project.all" -H "Authorization: Bearer $API_TOKEN")
  if [ "$HTTP_CODE" != "200" ]; then
    echo "Auth failed. Dokploy may require session auth."
    echo ""
    echo "=== MANUAL SETUP REQUIRED ==="
    echo "1. Go to https://dokploy.thecrayfish.tech"
    echo "2. Login with: $ADMIN_EMAIL"
    echo "3. Create Project 'Aveyla'"
    echo "4. Add Application → Docker → GitHub: hushamsaeed/aveyla"
    echo "5. Set build arg: NEXT_PUBLIC_SANITY_PROJECT_ID=c1itog7c"
    echo "6. Add domain: aveyla.thecrayfish.tech (HTTPS)"
    echo "7. Deploy"
    echo ""
    echo "Then remove the manual container:"
    echo "  docker stop aveyla-web && docker rm aveyla-web"
    exit 0
  fi
  AUTH_HEADER="Authorization: Bearer $API_TOKEN"
else
  AUTH_HEADER="x-api-key: $API_TOKEN"
fi

echo "API auth working! Creating project..."

# Create project
PROJECT_ID=$(curl -s -X POST "$DOKPLOY_URL/api/project.create" \
  -H "$AUTH_HEADER" \
  -H "Content-Type: application/json" \
  -d '{"name":"Aveyla","description":"Aveyla Manta Village website"}' | python3 -c "import json,sys; print(json.load(sys.stdin).get('projectId',''))" 2>/dev/null)

if [ -z "$PROJECT_ID" ]; then
  echo "Failed to create project. It may already exist."
  PROJECT_ID=$(curl -s "$DOKPLOY_URL/api/project.all" -H "$AUTH_HEADER" | python3 -c "import json,sys; projects=json.load(sys.stdin); print(next((p['projectId'] for p in projects if p['name']=='Aveyla'),''))" 2>/dev/null)
fi

echo "Project ID: $PROJECT_ID"

if [ -n "$PROJECT_ID" ]; then
  echo "=== Creating application ==="
  APP_RESULT=$(curl -s -X POST "$DOKPLOY_URL/api/application.create" \
    -H "$AUTH_HEADER" \
    -H "Content-Type: application/json" \
    -d "{\"projectId\":\"$PROJECT_ID\",\"name\":\"aveyla-web\",\"appName\":\"aveyla-web\",\"buildType\":\"dockerfile\",\"dockerfilePath\":\"./Dockerfile\"}")
  echo "App result: $APP_RESULT"
fi

echo ""
echo "=== Done ==="
echo "If API auth worked, the project is created in Dokploy."
echo "Configure the GitHub repo and domain in the Dokploy UI."
