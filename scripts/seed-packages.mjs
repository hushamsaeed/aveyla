#!/usr/bin/env node
/**
 * Re-seed package documents with full pricing tiers.
 * Usage: node scripts/seed-packages.mjs
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import os from "os";
import path from "path";

async function getToken() {
  const configPath = path.join(os.homedir(), ".config", "sanity", "config.json");
  try {
    const data = JSON.parse(fs.readFileSync(configPath, "utf8"));
    return data?.authToken || data?.token;
  } catch { return null; }
}

const token = process.env.SANITY_TOKEN || await getToken();
if (!token) { console.error("No token. Set SANITY_TOKEN or run 'npx sanity login'"); process.exit(1); }

const client = createClient({
  projectId: "c1itog7c",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

const packages = [
  {
    _id: "package-dive-dive-dive",
    _type: "package",
    name: "Dive Dive Dive",
    slug: { _type: "slug", current: "dive-dive-dive" },
    tagline: "For those who want nothing but reef time",
    description: "Full-board accommodation with daily guided dives across the Baa Atoll UNESCO Biosphere Reserve. Tanks and weights included. Over 30 dive sites accessible from Dharavandhoo.",
    season: null,
    active: true,
    inclusions: [
      "Accommodation in preferred room category",
      "Full board meals (Breakfast, Lunch & Dinner)",
      "Local area dives (Tanks & Weights included)",
      "Return domestic flights Malé–Dharavandhoo–Malé",
      "10% Service Charge & 17% TGST included",
      "Green tax $6 per day per person",
    ],
    priceFrom: 1020,
    seasonNotes: "Available year-round",
    pricingTiers: [
      { _type: "pricingTier", _key: "ddd3n", nights: 3, label: "3 Nights", dives: 6, villageTwin: 1020, villageSingle: 1259, beachTwin: 1110, beachSingle: 1439 },
      { _type: "pricingTier", _key: "ddd4n", nights: 4, label: "4 Nights", dives: 8, villageTwin: 1249, villageSingle: 1576, beachTwin: 1369, beachSingle: 1818 },
      { _type: "pricingTier", _key: "ddd5n", nights: 5, label: "5 Nights", dives: 10, villageTwin: 1459, villageSingle: 1865, beachTwin: 1610, beachSingle: 2159 },
      { _type: "pricingTier", _key: "ddd6n", nights: 6, label: "6 Nights", dives: 12, villageTwin: 1688, villageSingle: 2177, beachTwin: 1865, beachSingle: 2529 },
      { _type: "pricingTier", _key: "ddd7n", nights: 7, label: "7 Nights", dives: 14, villageTwin: 1919, villageSingle: 2488, beachTwin: 2125, beachSingle: 2899 },
    ],
  },
  {
    _id: "package-dive-hanifaru",
    _type: "package",
    name: "Dive Hanifaru",
    slug: { _type: "slug", current: "dive-hanifaru" },
    tagline: "Diving and manta encounters, combined",
    description: "Combines scuba diving across the Baa Atoll with manta snorkelling excursions to Hanifaru Bay. The best of both worlds — reef dives and the greatest manta aggregation on earth.",
    season: "June – November",
    active: true,
    inclusions: [
      "Accommodation in preferred room category",
      "Full board meals (Breakfast, Lunch & Dinner)",
      "Guided dives (Tanks & Weights included)",
      "Manta snorkelling trips to Hanifaru Bay",
      "Return domestic flights Malé–Dharavandhoo–Malé",
      "10% Service Charge & 17% TGST included",
      "Green tax $6 per day per person",
    ],
    priceFrom: 1020,
    seasonNotes: "June – November (manta season)",
    pricingTiers: [
      { _type: "pricingTier", _key: "dh3n", nights: 3, label: "3 Nights", dives: 4, snorkelTrips: 2, villageTwin: 1020, villageSingle: 1255, beachTwin: 1110, beachSingle: 1434 },
      { _type: "pricingTier", _key: "dh4n", nights: 4, label: "4 Nights", dives: 6, snorkelTrips: 2, villageTwin: 1249, villageSingle: 1579, beachTwin: 1366, beachSingle: 1810 },
      { _type: "pricingTier", _key: "dh5n", nights: 5, label: "5 Nights", dives: 9, snorkelTrips: 3, villageTwin: 1626, villageSingle: 2030, beachTwin: 1777, beachSingle: 2329 },
      { _type: "pricingTier", _key: "dh6n", nights: 6, label: "6 Nights", dives: 12, snorkelTrips: 4, villageTwin: 1977, villageSingle: 2510, beachTwin: 2155, beachSingle: 2818 },
      { _type: "pricingTier", _key: "dh7n", nights: 7, label: "7 Nights", dives: 14, snorkelTrips: 4, villageTwin: 2210, villageSingle: 2777, beachTwin: 2410, beachSingle: 3189 },
    ],
  },
  {
    _id: "package-manta-madness",
    _type: "package",
    name: "Manta Madness",
    slug: { _type: "slug", current: "manta-madness" },
    tagline: "The ultimate Hanifaru Bay snorkelling experience",
    description: "A snorkelling-focused package built around manta encounters at Hanifaru Bay. No certification needed — just mask, snorkel, and the largest manta ray congregation on earth.",
    season: "June – November",
    active: true,
    inclusions: [
      "Accommodation in preferred room category",
      "Full board meals (Breakfast, Lunch & Dinner)",
      "Manta snorkelling trips to Hanifaru Bay",
      "Return domestic flights Malé–Dharavandhoo–Malé",
      "10% Service Charge & 17% TGST included",
      "Green tax $6 per day per person",
    ],
    priceFrom: 720,
    seasonNotes: "June – November (manta season)",
    pricingTiers: [
      { _type: "pricingTier", _key: "mm3n", nights: 3, label: "3 Nights", snorkelTrips: 2, villageTwin: 720, villageSingle: 969, beachTwin: 818, beachSingle: 1144 },
      { _type: "pricingTier", _key: "mm4n", nights: 4, label: "4 Nights", snorkelTrips: 2, villageTwin: 810, villageSingle: 1135, beachTwin: 929, beachSingle: 1375 },
      { _type: "pricingTier", _key: "mm5n", nights: 5, label: "5 Nights", snorkelTrips: 3, villageTwin: 970, villageSingle: 1377, beachTwin: 1119, beachSingle: 1677 },
      { _type: "pricingTier", _key: "mm6n", nights: 6, label: "6 Nights", snorkelTrips: 4, villageTwin: 1130, villageSingle: 1620, beachTwin: 1310, beachSingle: 1977 },
      { _type: "pricingTier", _key: "mm7n", nights: 7, label: "7 Nights", snorkelTrips: 4, villageTwin: 1220, villageSingle: 1789, beachTwin: 1429, beachSingle: 2200 },
    ],
  },
];

async function main() {
  console.log("Seeding 3 packages with full pricing tiers...\n");
  for (const pkg of packages) {
    try {
      await client.createOrReplace(pkg);
      console.log(`  ✓ ${pkg.name} (${pkg.pricingTiers.length} tiers)`);
    } catch (err) {
      console.error(`  ✗ ${pkg.name}: ${err.message}`);
    }
  }
  console.log("\nDone.");
}

main();
