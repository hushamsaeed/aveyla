#!/usr/bin/env node
/**
 * Seed Sanity CMS with existing site content.
 * Usage: node scripts/seed-content.mjs
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "c1itog7c",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

// If no token, try to read from sanity CLI config
async function getClient() {
  if (process.env.SANITY_TOKEN) return client;

  // Try reading token from Sanity CLI config
  const fs = await import("fs");
  const os = await import("os");
  const path = await import("path");

  const configPath = path.join(os.homedir(), ".config", "sanity", "auth.json");
  try {
    const authData = JSON.parse(fs.readFileSync(configPath, "utf8"));
    const token = authData?.token || authData?.authToken;
    if (token) {
      return createClient({
        projectId: "c1itog7c",
        dataset: "production",
        apiVersion: "2024-01-01",
        useCdn: false,
        token,
      });
    }
  } catch {
    // Try alternative config locations
    const altPaths = [
      path.join(os.homedir(), ".sanity", "auth.json"),
      path.join(os.homedir(), ".config", "sanity", "config.json"),
    ];
    for (const p of altPaths) {
      try {
        const data = JSON.parse(fs.readFileSync(p, "utf8"));
        const token = data?.token || data?.authToken;
        if (token) {
          return createClient({
            projectId: "c1itog7c",
            dataset: "production",
            apiVersion: "2024-01-01",
            useCdn: false,
            token,
          });
        }
      } catch { /* continue */ }
    }
  }

  console.error("No Sanity token found. Set SANITY_TOKEN env var or run 'npx sanity login'");
  process.exit(1);
}

const documents = [
  // === ROOMS ===
  {
    _id: "room-ocean-deluxe",
    _type: "room",
    name: "Ocean Deluxe",
    slug: { _type: "slug", current: "ocean-deluxe" },
    roomType: "Ocean Deluxe",
    description: "The Ocean Deluxe rooms face directly onto the lagoon, with unobstructed views from a private balcony. King bed, air conditioning, boutique bath amenities, and the sound of the reef at night. Four rooms, each identical in layout, each different in the light that enters.",
    amenities: ["King Bed", "Air Conditioning", "In-Room Safe", "LCD TV 32\"", "Tea & Coffee", "Boutique Bath Amenities", "Private Balcony", "Ocean View"],
    noticeActive: false,
    noticeText: "",
  },
  {
    _id: "room-beach-deluxe",
    _type: "room",
    name: "Beach Deluxe",
    slug: { _type: "slug", current: "beach-deluxe" },
    roomType: "Beach Deluxe",
    description: "Steps from the beach, the Beach Deluxe rooms open onto a private terrace where the lagoon fills the frame. Morning light arrives unfiltered. Four rooms, oriented to catch the sunrise over the Baa Atoll.",
    amenities: ["King Bed", "Air Conditioning", "In-Room Safe", "LCD TV 32\"", "Tea & Coffee", "Boutique Bath Amenities", "Private Terrace", "Beach Access"],
    noticeActive: false,
    noticeText: "",
  },
  {
    _id: "room-village-deluxe",
    _type: "room",
    name: "Village Deluxe",
    slug: { _type: "slug", current: "village-deluxe" },
    roomType: "Village Deluxe",
    description: "Set among the garden, the Village Deluxe rooms offer quiet retreat after a day on the reef. Eight rooms, each with private bathroom and the cooling shade of tropical planting.",
    amenities: ["King Bed", "Air Conditioning", "In-Room Safe", "LCD TV 32\"", "Tea & Coffee", "Boutique Bath Amenities", "Private Bathroom", "Garden View"],
    noticeActive: true,
    noticeText: "Temporary discount — nearby construction",
  },

  // === ACTIVITIES ===
  {
    _id: "activity-scuba-diving",
    _type: "activity",
    name: "Scuba Diving",
    slug: { _type: "slug", current: "scuba-diving" },
    category: "diving",
    shortDescription: "PADI-certified encounters at 30+ dive sites",
    description: "Aveyla's PADI dive centre operates daily guided dives across more than thirty sites in the Baa Atoll. From the shallow house reef — accessible from the beach — to the deep channels where pelagics patrol, every dive is led by instructors who have logged thousands of hours in these waters.",
    safetyRequirements: [
      "PADI Open Water certification or equivalent (minimum)",
      "Medical fitness declaration required",
      "Minimum age: 12 years (with guardian)",
      "Equipment provided: BCD, regulator, wetsuit, mask, fins",
      "All dives include certified dive guide",
    ],
  },
  {
    _id: "activity-snorkelling",
    _type: "activity",
    name: "Snorkelling",
    slug: { _type: "slug", current: "snorkelling" },
    category: "snorkelling",
    shortDescription: "Reef access directly from the shore",
    description: "The house reef begins ten metres from the beach. Mask, snorkel, and fins are all that's needed to enter a world of reef sharks, eagle rays, and schooling fusiliers. Guided excursions reach outer reefs and Hanifaru Bay during manta season.",
  },
  {
    _id: "activity-night-snorkelling",
    _type: "activity",
    name: "Night Snorkelling",
    slug: { _type: "slug", current: "night-snorkelling" },
    category: "snorkelling",
    shortDescription: "Bioluminescent plankton under the stars",
    description: "After dark, the reef transforms. Torch-lit excursions reveal bioluminescent plankton, hunting octopuses, and sleeping parrotfish. The experience is guided and begins from the beach.",
  },
  {
    _id: "activity-freediving",
    _type: "activity",
    name: "Freediving",
    slug: { _type: "slug", current: "freediving" },
    category: "diving",
    shortDescription: "Single-breath descents into the blue",
    description: "Single-breath descents into the blue channels of the Baa Atoll. Guided sessions for certified freedivers, with safety divers on every excursion. The clarity here makes depth feel effortless.",
    safetyRequirements: [
      "AIDA or equivalent freediving certification recommended",
      "Medical fitness declaration required",
      "Minimum age: 16 years",
      "Safety diver accompanies every session",
      "Equipment provided on request",
    ],
  },
  {
    _id: "activity-sandbank-trips",
    _type: "activity",
    name: "Sandbank Trips",
    slug: { _type: "slug", current: "sandbank-trips" },
    category: "excursion",
    shortDescription: "Private sandbars rising from the lagoon",
    description: "Private sandbars emerge from the lagoon at low tide — islands that exist for hours before the ocean reclaims them. Picnic lunch, snorkelling gear, and nothing else for miles.",
  },
  {
    _id: "activity-big-game-fishing",
    _type: "activity",
    name: "Big Game Fishing",
    slug: { _type: "slug", current: "big-game-fishing" },
    category: "excursion",
    shortDescription: "Open-water pursuits beyond the atoll",
    description: "Beyond the atoll edge, the Indian Ocean drops away. Sailfish, tuna, wahoo, and mahi-mahi run these waters. Half-day and full-day charters depart from Dharavandhoo harbour.",
  },
  {
    _id: "activity-local-island-visits",
    _type: "activity",
    name: "Local Island Visits",
    slug: { _type: "slug", current: "local-island-visits" },
    category: "excursion",
    shortDescription: "Dharavandhoo culture beyond the resort",
    description: "Dharavandhoo is a living island — not a resort island. Walk the village, visit the school, meet the people who share this atoll with the mantas. Cultural excursions to neighbouring islands available.",
  },

  // === PACKAGES ===
  {
    _id: "package-dive-dive-dive",
    _type: "package",
    name: "Dive Dive Dive",
    slug: { _type: "slug", current: "dive-dive-dive" },
    tagline: "For those who want nothing but reef time",
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
  },
  {
    _id: "package-dive-hanifaru",
    _type: "package",
    name: "Dive Hanifaru",
    slug: { _type: "slug", current: "dive-hanifaru" },
    tagline: "Diving and manta encounters, combined",
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
  },
  {
    _id: "package-manta-madness",
    _type: "package",
    name: "Manta Madness",
    slug: { _type: "slug", current: "manta-madness" },
    tagline: "The ultimate Hanifaru Bay snorkelling experience",
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
  },

  // === REVIEWS ===
  {
    _id: "review-sarah-k",
    _type: "review",
    quote: "The manta encounter was life-changing. Aveyla's dive team made it feel safe, personal, and utterly unforgettable.",
    guestName: "Sarah K.",
    guestCountry: "United Kingdom",
    starRating: 5,
    date: "2025-09-15",
    active: true,
  },
  {
    _id: "review-marco-lena",
    _type: "review",
    quote: "We've dived all over Southeast Asia. Nothing compares to Hanifaru Bay, and nowhere gets you closer than Aveyla.",
    guestName: "Marco & Lena",
    guestCountry: "Germany",
    starRating: 5,
    date: "2025-08-22",
    active: true,
  },
  {
    _id: "review-james-t",
    _type: "review",
    quote: "Solar-powered, small, and right on the reef. This is what responsible travel should look like.",
    guestName: "James T.",
    guestCountry: "Australia",
    starRating: 5,
    date: "2025-10-03",
    active: true,
  },

  // === FAQ ITEMS ===
  {
    _id: "faq-transfer",
    _type: "faqItem",
    question: "How do I get to Dharavandhoo Island?",
    answer: "Domestic flight from Velana International Airport (Malé) to Dharavandhoo Airport (approximately 20 minutes), followed by a short transfer to Aveyla. Alternatively, speedboat transfer can be arranged.",
    category: "Transfer & Getting Here",
    sortOrder: 1,
    active: true,
  },
  {
    _id: "faq-transfer-time",
    _type: "faqItem",
    question: "How long is the transfer from Malé?",
    answer: "The domestic flight is approximately 20 minutes. From Dharavandhoo Airport to Aveyla is a 5-minute drive. Total transfer time is under 30 minutes from landing.",
    category: "Transfer & Getting Here",
    sortOrder: 2,
    active: true,
  },
  {
    _id: "faq-certification",
    _type: "faqItem",
    question: "Do I need a diving certification?",
    answer: "For scuba diving, a PADI Open Water certification or equivalent is required. Snorkelling and sandbank trips require no certification. Freediving sessions are recommended for certified freedivers.",
    category: "Diving & Activities",
    sortOrder: 3,
    active: true,
  },
  {
    _id: "faq-manta-season",
    _type: "faqItem",
    question: "When is the best time to see manta rays?",
    answer: "Manta season runs from June to November, with peak aggregations in August, September, and October. Outside this season, individual mantas are still regularly encountered on dives.",
    category: "Diving & Activities",
    sortOrder: 4,
    active: true,
  },
  {
    _id: "faq-solar",
    _type: "faqItem",
    question: "Is Aveyla really 100% solar powered?",
    answer: "Yes. The entire property runs on solar electricity. This is a fundamental part of our operating philosophy, not a marketing claim.",
    category: "Rooms & Facilities",
    sortOrder: 5,
    active: true,
  },
  {
    _id: "faq-dietary",
    _type: "faqItem",
    question: "What dietary requirements can you accommodate?",
    answer: "We accommodate vegetarian, vegan, gluten-free, and halal dietary requirements with advance notice. Please inform us at the time of booking.",
    category: "Rooms & Facilities",
    sortOrder: 6,
    active: true,
  },
  {
    _id: "faq-payment",
    _type: "faqItem",
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard, and American Express. Payment is processed securely through our booking engine.",
    category: "Booking & Payment",
    sortOrder: 7,
    active: true,
  },
  {
    _id: "faq-cancellation",
    _type: "faqItem",
    question: "What is your cancellation policy?",
    answer: "Please refer to the booking confirmation for specific cancellation terms, or contact us directly at info@aveyla.com for details.",
    category: "Booking & Payment",
    sortOrder: 8,
    active: true,
  },
];

async function main() {
  const sanityClient = await getClient();

  console.log(`Seeding ${documents.length} documents to Sanity (project: c1itog7c)\n`);

  let success = 0;
  let failed = 0;

  for (const doc of documents) {
    try {
      await sanityClient.createOrReplace(doc);
      console.log(`  ✓ ${doc._type}: ${doc.name || doc.question || doc.guestName}`);
      success++;
    } catch (err) {
      console.error(`  ✗ ${doc._type}: ${doc.name || doc.question || doc.guestName} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n--- Done ---`);
  console.log(`Success: ${success}/${documents.length}`);
  if (failed > 0) console.log(`Failed: ${failed}`);
}

main();
