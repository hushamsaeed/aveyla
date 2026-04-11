import { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL || "https://www.aveyla.com";

const STATIC_PAGES = [
  "/",
  "/rooms",
  "/rooms/ocean-deluxe",
  "/rooms/beach-deluxe",
  "/rooms/village-deluxe",
  "/activities",
  "/activities/scuba-diving",
  "/activities/snorkelling",
  "/activities/night-snorkelling",
  "/activities/freediving",
  "/activities/sandbank-trips",
  "/activities/big-game-fishing",
  "/activities/local-island-visits",
  "/dining",
  "/packages",
  "/packages/manta-madness",
  "/packages/dive-dive-dive",
  "/packages/dive-hanifaru",
  "/hanifaru-bay",
  "/gallery",
  "/about",
  "/contact",
  "/faq",
  "/privacy-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_PAGES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
