const ROOM_IMAGES: Record<string, string> = {
  "ocean-deluxe": "/images/rooms/ocean-deluxe.jpg",
  "beach-deluxe": "/images/rooms/beach-deluxe.jpg",
  "village-deluxe": "/images/rooms/village-deluxe.jpg",
};

const ACTIVITY_IMAGES: Record<string, string> = {
  "scuba-diving": "/images/activities/scuba.jpg",
  "snorkelling": "/images/activities/snorkelling.jpg",
  "night-snorkelling": "/images/activities/night-snorkelling.jpg",
  "freediving": "/images/activities/freediving.jpg",
  "sandbank-trips": "/images/activities/sandbank.jpg",
  "big-game-fishing": "/images/activities/fishing.jpg",
  "local-island-visits": "/images/activities/local-island.jpg",
};

const PACKAGE_IMAGES: Record<string, string> = {
  "dive-dive-dive": "/images/packages/dive-dive-dive.jpg",
  "dive-hanifaru": "/images/packages/dive-hanifaru.jpg",
  "manta-madness": "/images/packages/manta-madness.jpg",
};

export function getRoomImage(heroImage: string | null, slug: string): string {
  return heroImage || ROOM_IMAGES[slug] || "/images/rooms/ocean-deluxe.jpg";
}

export function getActivityImage(heroImage: string | null, slug: string): string {
  return heroImage || ACTIVITY_IMAGES[slug] || "/images/activities/scuba.jpg";
}

export function getPackageImage(heroImage: string | null, slug: string): string {
  return heroImage || PACKAGE_IMAGES[slug] || "/images/packages/dive-dive-dive.jpg";
}

export function getGalleryImageUrl(imagePath: string): string {
  return imagePath || "/images/gallery/manta-1.jpg";
}

export function getUploadUrl(path: string | null): string {
  if (!path) return "";
  if (path.startsWith("/")) return path;
  return `/api/uploads/${path}`;
}
