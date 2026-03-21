#!/usr/bin/env node
/**
 * Generate all site images using Google Gemini API (Imagen).
 * Usage: GEMINI_API_KEY=... node scripts/generate-images.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public", "images");
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("ERROR: Set GEMINI_API_KEY environment variable");
  process.exit(1);
}

const IMAGES = [
  // Hero & Main
  { path: "hero-poster.jpg", prompt: "Cinematic aerial view of Baa Atoll lagoon transitioning to underwater, turquoise water, coral reef visible below surface, Maldives, golden hour light, National Geographic quality, photorealistic" },
  { path: "hanifaru-manta.jpg", prompt: "Giant manta ray gliding underwater in deep blue ocean, sunlight rays from above, close-up silhouette, Hanifaru Bay Maldives, cinematic underwater photography, photorealistic" },
  { path: "hanifaru-hero.jpg", prompt: "Underwater wide-angle of multiple manta rays feeding in shallow turquoise lagoon, plankton-rich water, Hanifaru Bay UNESCO Biosphere Reserve, dramatic natural light, photorealistic" },
  { path: "about-aerial.jpg", prompt: "Aerial drone photograph of small tropical island with palm trees, white sand beach, turquoise lagoon, coral reef ring, Maldives Baa Atoll, bright daylight, photorealistic" },

  // Rooms
  { path: "rooms/ocean-deluxe.jpg", prompt: "Bright minimalist boutique hotel room with king bed, white linens, ocean view through large window, tropical sunlight, wooden accents, Maldives style, interior photography, photorealistic" },
  { path: "rooms/beach-deluxe.jpg", prompt: "Beachfront hotel room terrace overlooking white sand and turquoise ocean, tropical plants, comfortable outdoor seating, morning light, Maldives, photorealistic" },
  { path: "rooms/village-deluxe.jpg", prompt: "Cozy tropical hotel room with garden view, king bed, natural wood furniture, private bathroom visible, lush green tropical garden outside, warm afternoon light, photorealistic" },

  // Activities
  { path: "activities/scuba.jpg", prompt: "Scuba diver swimming above colorful coral reef, tropical fish, clear blue water, underwater photography, Maldives Baa Atoll, natural light from surface, photorealistic" },
  { path: "activities/snorkelling.jpg", prompt: "Person snorkelling at water surface above tropical reef, clear turquoise water, sun rays penetrating, Maldives, wide angle underwater shot, photorealistic" },
  { path: "activities/night-snorkelling.jpg", prompt: "Bioluminescent plankton glowing blue in dark ocean water at night, person with underwater torch, magical deep blue atmosphere, Maldives, photorealistic" },
  { path: "activities/freediving.jpg", prompt: "Freediver descending into deep blue ocean, single breath, silhouette against sunlit surface, minimalist, Maldives underwater, serene, photorealistic" },
  { path: "activities/sandbank.jpg", prompt: "Pristine white sandbank emerging from turquoise lagoon, aerial view, crystal clear water, no people, Maldives Baa Atoll, bright tropical sunlight, photorealistic" },
  { path: "activities/fishing.jpg", prompt: "Deep sea fishing boat on open Indian Ocean at sunset, golden sky, calm water, silhouette of fishing rod, Maldives, photorealistic" },
  { path: "activities/local-island.jpg", prompt: "Maldivian local island village with colorful houses, palm trees, sandy street, warm tropical light, authentic island culture, photorealistic" },
  { path: "activities/dining.jpg", prompt: "Beachside dinner table set for two, candles, fresh seafood platter, ocean view background, tropical evening, warm ambient lighting, Maldives resort, food photography, photorealistic" },

  // Packages
  { path: "packages/manta-madness.jpg", prompt: "Manta ray feeding in shallow water with diver observing nearby, underwater wide angle, dramatic lighting from surface, Hanifaru Bay Maldives, photorealistic" },
  { path: "packages/dive-dive-dive.jpg", prompt: "Group of scuba divers descending along colorful coral wall, tropical fish schools, clear blue water, Maldives reef, cinematic underwater, photorealistic" },
  { path: "packages/dive-hanifaru.jpg", prompt: "Whale shark swimming in deep blue ocean with small fish, diver in distance for scale, Maldives Baa Atoll, awe-inspiring underwater photography, photorealistic" },

  // Gallery
  { path: "gallery/manta-1.jpg", prompt: "Close-up of manta ray belly markings as it glides overhead, underwater perspective looking up, sunlight behind, Hanifaru Bay, photorealistic" },
  { path: "gallery/reef-1.jpg", prompt: "Vibrant coral reef garden with anemones, clownfish, soft corals, clear water, Baa Atoll Maldives, macro underwater photography, photorealistic" },
  { path: "gallery/room-1.jpg", prompt: "Luxury hotel room interior, white bed with ocean-blue accent pillows, natural wood furniture, ocean visible through window, bright and airy, photorealistic" },
  { path: "gallery/beach-1.jpg", prompt: "Maldives beach sunset with palm tree silhouettes, golden and pink sky reflecting on calm water, white sand foreground, photorealistic" },
  { path: "gallery/dining-1.jpg", prompt: "Fresh grilled fish plate with tropical garnish on wooden table, ocean blur background, natural styling, food photography, photorealistic" },
  { path: "gallery/dive-1.jpg", prompt: "Two scuba divers with guide exploring underwater cave entrance, torch light, blue ambient water, Maldives dive site, photorealistic" },
  { path: "gallery/aerial-1.jpg", prompt: "Aerial view of Dharavandhoo island from high altitude, oval shape, reef surrounding, deep blue ocean contrast, Maldives, photorealistic" },
  { path: "gallery/night-1.jpg", prompt: "Night snorkelling scene with underwater torchlight illuminating reef, dark water, magical atmosphere, Maldives, photorealistic" },
  { path: "gallery/room-2.jpg", prompt: "Hotel room private terrace with two chairs and small table, beach view, tropical plants, late afternoon golden light, photorealistic" },
];

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`;

async function generateImage(imageSpec, index) {
  const outputPath = path.join(PUBLIC_DIR, imageSpec.path);

  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`[${index + 1}/${IMAGES.length}] SKIP ${imageSpec.path} (exists)`);
    return true;
  }

  console.log(`[${index + 1}/${IMAGES.length}] Generating ${imageSpec.path}...`);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Generate a high-quality photorealistic image: ${imageSpec.prompt}. The image should be landscape orientation, high resolution, suitable for a luxury resort website.`,
              },
            ],
          },
        ],
        generationConfig: {
          responseModalities: ["IMAGE"],
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`  ERROR ${response.status}: ${errText.slice(0, 200)}`);
      return false;
    }

    const data = await response.json();

    // Find image part in response
    const parts = data.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p) => p.inlineData?.mimeType?.startsWith("image/"));

    if (!imagePart) {
      console.error(`  ERROR: No image in response for ${imageSpec.path}`);
      console.error(`  Parts:`, parts.map((p) => Object.keys(p)).join(", "));
      return false;
    }

    // Decode and save
    const buffer = Buffer.from(imagePart.inlineData.data, "base64");
    fs.writeFileSync(outputPath, buffer);

    const sizeKB = Math.round(buffer.length / 1024);
    console.log(`  OK (${sizeKB}KB)`);
    return true;
  } catch (err) {
    console.error(`  ERROR: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log(`\nGenerating ${IMAGES.length} images for Aveyla Manta Village\n`);
  console.log(`Output: ${PUBLIC_DIR}\n`);

  // Ensure directories exist
  for (const dir of ["rooms", "activities", "packages", "gallery"]) {
    fs.mkdirSync(path.join(PUBLIC_DIR, dir), { recursive: true });
  }

  let success = 0;
  let failed = 0;
  const failures = [];

  for (let i = 0; i < IMAGES.length; i++) {
    const ok = await generateImage(IMAGES[i], i);
    if (ok) {
      success++;
    } else {
      failed++;
      failures.push(IMAGES[i].path);
    }

    // Rate limit: wait between requests
    if (i < IMAGES.length - 1) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  console.log(`\n--- Done ---`);
  console.log(`Success: ${success}/${IMAGES.length}`);
  if (failed > 0) {
    console.log(`Failed: ${failed}`);
    console.log(`Failed images: ${failures.join(", ")}`);
    console.log(`\nRe-run the script to retry failed images (existing ones are skipped).`);
  }
}

main();
