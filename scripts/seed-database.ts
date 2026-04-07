// Use direct better-sqlite3 since this is a standalone script, not a Next.js page
import Database from "better-sqlite3";
import { hash } from "bcryptjs";

const DB_PATH = process.env.DATABASE_PATH || "./data/aveyla.db";

async function seed() {
  const sqlite = new Database(DB_PATH);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");

  // Create tables (snake_case column names match Drizzle's mapped SQL columns)
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      room_type TEXT,
      description TEXT,
      hero_image TEXT,
      amenities TEXT,
      price_from REAL,
      notice_active INTEGER DEFAULT 0,
      notice_text TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      category TEXT,
      short_description TEXT,
      description TEXT,
      hero_image TEXT,
      safety_requirements TEXT,
      seasonal_notes TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      tagline TEXT,
      description TEXT,
      hero_image TEXT,
      season TEXT,
      inclusions TEXT,
      price_from REAL,
      active INTEGER DEFAULT 1,
      season_notes TEXT,
      booking_link TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS pricing_tiers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      package_id INTEGER NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
      nights INTEGER NOT NULL,
      label TEXT,
      dives INTEGER,
      snorkel_trips INTEGER,
      village_twin REAL NOT NULL,
      village_single REAL NOT NULL,
      beach_twin REAL NOT NULL,
      beach_single REAL NOT NULL,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS gallery_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_path TEXT NOT NULL,
      alt TEXT NOT NULL,
      category TEXT NOT NULL,
      caption TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quote TEXT NOT NULL,
      guest_name TEXT NOT NULL,
      guest_country TEXT,
      star_rating INTEGER,
      date TEXT,
      active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS faq_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS site_notices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT,
      target_pages TEXT,
      severity TEXT DEFAULT 'info',
      active INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS seo_metadata (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page TEXT NOT NULL UNIQUE,
      meta_title TEXT,
      meta_description TEXT,
      og_image TEXT,
      canonical_url TEXT
    );

    CREATE TABLE IF NOT EXISTS content_gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_type TEXT NOT NULL,
      content_id INTEGER NOT NULL,
      image_path TEXT NOT NULL,
      alt TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT,
      role TEXT DEFAULT 'admin',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      last_login_at TEXT
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      value TEXT,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS nav_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT NOT NULL,
      label TEXT NOT NULL,
      href TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS page_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_slug TEXT NOT NULL,
      section_key TEXT NOT NULL,
      title TEXT,
      body TEXT,
      image_path TEXT,
      sort_order INTEGER DEFAULT 0,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS hero_media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      media_type TEXT NOT NULL,
      media_path TEXT NOT NULL,
      poster_path TEXT,
      alt TEXT,
      sort_order INTEGER DEFAULT 0,
      active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Check if already seeded
  const roomCount = sqlite.prepare("SELECT COUNT(*) as count FROM rooms").get() as { count: number };
  if (roomCount.count > 0) {
    console.log("Database already seeded. Skipping.");
    sqlite.close();
    return;
  }

  console.log("Seeding database...");

  // ── ROOMS ──────────────────────────────────────────────────────────────────
  const insertRoom = sqlite.prepare(
    "INSERT INTO rooms (name, slug, room_type, description, hero_image, amenities, price_from, notice_active, notice_text, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );

  insertRoom.run(
    "Ocean Deluxe", "ocean-deluxe", "Ocean Deluxe",
    "The Ocean Deluxe rooms face directly onto the lagoon, with unobstructed views from a private balcony. King bed, air conditioning, boutique bath amenities, and the sound of the reef at night.",
    "/images/rooms/ocean-deluxe.jpg",
    JSON.stringify(["King Bed", "Air Conditioning", "In-Room Safe", "LCD TV 32\"", "Tea & Coffee", "Boutique Bath Amenities", "Private Balcony", "Ocean View"]),
    null, 0, null, 0
  );

  insertRoom.run(
    "Beach Deluxe", "beach-deluxe", "Beach Deluxe",
    "Steps from the beach, the Beach Deluxe rooms open onto a private terrace where the lagoon fills the frame. Morning light arrives unfiltered.",
    "/images/rooms/beach-deluxe.jpg",
    JSON.stringify(["King Bed", "Air Conditioning", "In-Room Safe", "LCD TV 32\"", "Tea & Coffee", "Boutique Bath Amenities", "Private Terrace", "Beach Access"]),
    null, 0, null, 1
  );

  insertRoom.run(
    "Village Deluxe", "village-deluxe", "Village Deluxe",
    "Set among the garden, the Village Deluxe rooms offer quiet retreat after a day on the reef. Eight rooms, each with private bathroom.",
    "/images/rooms/village-deluxe.jpg",
    JSON.stringify(["King Bed", "Air Conditioning", "In-Room Safe", "LCD TV 32\"", "Tea & Coffee", "Boutique Bath Amenities", "Private Bathroom", "Garden View"]),
    null, 1, "Temporary discount — nearby construction", 2
  );

  // ── ACTIVITIES ─────────────────────────────────────────────────────────────
  const insertActivity = sqlite.prepare(
    "INSERT INTO activities (name, slug, category, short_description, description, hero_image, safety_requirements, seasonal_notes, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );

  insertActivity.run(
    "Scuba Diving", "scuba-diving", "diving",
    "PADI-certified encounters at 30+ dive sites",
    "Aveyla's PADI dive centre operates daily guided dives across more than thirty sites in the Baa Atoll. From the shallow house reef — accessible from the beach — to the deep channels where pelagics patrol, every dive is led by instructors who have logged thousands of hours in these waters.",
    "/images/activities/scuba.jpg",
    JSON.stringify(["PADI Open Water certification or equivalent (minimum)", "Medical fitness declaration required", "Minimum age: 12 years (with guardian)", "Equipment provided: BCD, regulator, wetsuit, mask, fins", "All dives include certified dive guide"]),
    null, 0
  );

  insertActivity.run(
    "Snorkelling", "snorkelling", "snorkelling",
    "Reef access directly from the shore",
    "The house reef begins ten metres from the beach. Mask, snorkel, and fins are all that's needed to enter a world of reef sharks, eagle rays, and schooling fusiliers. Guided excursions reach outer reefs and Hanifaru Bay during manta season.",
    "/images/activities/snorkelling.jpg", null, null, 1
  );

  insertActivity.run(
    "Night Snorkelling", "night-snorkelling", "snorkelling",
    "Bioluminescent plankton under the stars",
    "After dark, the reef transforms. Torch-lit excursions reveal bioluminescent plankton, hunting octopuses, and sleeping parrotfish. The experience is guided and begins from the beach.",
    "/images/activities/night-snorkelling.jpg", null, null, 2
  );

  insertActivity.run(
    "Freediving", "freediving", "diving",
    "Single-breath descents into the blue",
    "Single-breath descents into the blue channels of the Baa Atoll. Guided sessions for certified freedivers, with safety divers on every excursion. The clarity here makes depth feel effortless.",
    "/images/activities/freediving.jpg",
    JSON.stringify(["AIDA or equivalent freediving certification recommended", "Medical fitness declaration required", "Minimum age: 16 years", "Safety diver accompanies every session", "Equipment provided on request"]),
    null, 3
  );

  insertActivity.run(
    "Sandbank Trips", "sandbank-trips", "excursion",
    "Private sandbars rising from the lagoon",
    "Private sandbars emerge from the lagoon at low tide — islands that exist for hours before the ocean reclaims them. Picnic lunch, snorkelling gear, and nothing else for miles.",
    "/images/activities/sandbank.jpg", null, null, 4
  );

  insertActivity.run(
    "Big Game Fishing", "big-game-fishing", "excursion",
    "Open-water pursuits beyond the atoll",
    "Beyond the atoll edge, the Indian Ocean drops away. Sailfish, tuna, wahoo, and mahi-mahi run these waters. Half-day and full-day charters depart from Dharavandhoo harbour.",
    "/images/activities/fishing.jpg", null, null, 5
  );

  insertActivity.run(
    "Local Island Visits", "local-island-visits", "excursion",
    "Dharavandhoo culture beyond the resort",
    "Dharavandhoo is a living island — not a resort island. Walk the village, visit the school, meet the people who share this atoll with the mantas. Cultural excursions to neighbouring islands available.",
    "/images/activities/local-island.jpg", null, null, 6
  );

  // ── PACKAGES ───────────────────────────────────────────────────────────────
  const insertPackage = sqlite.prepare(
    "INSERT INTO packages (name, slug, tagline, description, hero_image, season, inclusions, price_from, active, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)"
  );
  const insertTier = sqlite.prepare(
    "INSERT INTO pricing_tiers (package_id, nights, label, dives, snorkel_trips, village_twin, village_single, beach_twin, beach_single, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );

  // Dive Dive Dive
  const pkg1 = insertPackage.run(
    "Dive Dive Dive", "dive-dive-dive",
    "For those who want nothing but reef time",
    "Full-board accommodation with daily guided dives across the Baa Atoll UNESCO Biosphere Reserve. Tanks and weights included.",
    "/images/packages/dive-dive-dive.jpg", null,
    JSON.stringify(["Accommodation in preferred room category", "Full board meals (Breakfast, Lunch & Dinner)", "Local area dives (Tanks & Weights included)", "Return domestic flights Malé–Dharavandhoo–Malé", "10% Service Charge & 17% TGST included", "Green tax $6 per day per person"]),
    1020, 0
  );
  const pkg1Id = pkg1.lastInsertRowid;
  insertTier.run(pkg1Id, 3, "3 Nights", 6,    null, 1020, 1259, 1110, 1439, 0);
  insertTier.run(pkg1Id, 4, "4 Nights", 8,    null, 1249, 1576, 1369, 1818, 1);
  insertTier.run(pkg1Id, 5, "5 Nights", 10,   null, 1459, 1865, 1610, 2159, 2);
  insertTier.run(pkg1Id, 6, "6 Nights", 12,   null, 1688, 2177, 1865, 2529, 3);
  insertTier.run(pkg1Id, 7, "7 Nights", 14,   null, 1919, 2488, 2125, 2899, 4);

  // Dive Hanifaru
  const pkg2 = insertPackage.run(
    "Dive Hanifaru", "dive-hanifaru",
    "Diving and manta encounters, combined",
    "Combines scuba diving across the Baa Atoll with manta snorkelling excursions to Hanifaru Bay.",
    "/images/packages/dive-hanifaru.jpg", "June – November",
    JSON.stringify(["Accommodation in preferred room category", "Full board meals (Breakfast, Lunch & Dinner)", "Guided dives (Tanks & Weights included)", "Manta snorkelling trips to Hanifaru Bay", "Return domestic flights Malé–Dharavandhoo–Malé", "10% Service Charge & 17% TGST included", "Green tax $6 per day per person"]),
    1020, 1
  );
  const pkg2Id = pkg2.lastInsertRowid;
  insertTier.run(pkg2Id, 3, "3 Nights", 4,  2, 1020, 1255, 1110, 1434, 0);
  insertTier.run(pkg2Id, 4, "4 Nights", 6,  2, 1249, 1579, 1366, 1810, 1);
  insertTier.run(pkg2Id, 5, "5 Nights", 9,  3, 1626, 2030, 1777, 2329, 2);
  insertTier.run(pkg2Id, 6, "6 Nights", 12, 4, 1977, 2510, 2155, 2818, 3);
  insertTier.run(pkg2Id, 7, "7 Nights", 14, 4, 2210, 2777, 2410, 3189, 4);

  // Manta Madness
  const pkg3 = insertPackage.run(
    "Manta Madness", "manta-madness",
    "The ultimate Hanifaru Bay snorkelling experience",
    "A snorkelling-focused package built around manta encounters at Hanifaru Bay. No certification needed.",
    "/images/packages/manta-madness.jpg", "June – November",
    JSON.stringify(["Accommodation in preferred room category", "Full board meals (Breakfast, Lunch & Dinner)", "Manta snorkelling trips to Hanifaru Bay", "Return domestic flights Malé–Dharavandhoo–Malé", "10% Service Charge & 17% TGST included", "Green tax $6 per day per person"]),
    720, 2
  );
  const pkg3Id = pkg3.lastInsertRowid;
  insertTier.run(pkg3Id, 3, "3 Nights", null, 2, 720,  969,  818,  1144, 0);
  insertTier.run(pkg3Id, 4, "4 Nights", null, 2, 810,  1135, 929,  1375, 1);
  insertTier.run(pkg3Id, 5, "5 Nights", null, 3, 970,  1377, 1119, 1677, 2);
  insertTier.run(pkg3Id, 6, "6 Nights", null, 4, 1130, 1620, 1310, 1977, 3);
  insertTier.run(pkg3Id, 7, "7 Nights", null, 4, 1220, 1789, 1429, 2200, 4);

  // ── GALLERY IMAGES ─────────────────────────────────────────────────────────
  const insertGallery = sqlite.prepare(
    "INSERT INTO gallery_images (image_path, alt, category, sort_order) VALUES (?, ?, ?, ?)"
  );
  insertGallery.run("/images/gallery/manta-1.jpg",   "Manta ray in Hanifaru Bay",      "Underwater",  0);
  insertGallery.run("/images/gallery/reef-1.jpg",    "Coral reef Baa Atoll",           "Underwater",  1);
  insertGallery.run("/images/gallery/room-1.jpg",    "Ocean Deluxe room interior",     "Rooms",       2);
  insertGallery.run("/images/gallery/beach-1.jpg",   "Dharavandhoo beach sunset",      "Beach",       3);
  insertGallery.run("/images/gallery/dining-1.jpg",  "Beachside dinner setting",       "Dining",      4);
  insertGallery.run("/images/gallery/dive-1.jpg",    "Guided dive excursion",          "Activities",  5);
  insertGallery.run("/images/gallery/aerial-1.jpg",  "Aerial view of island",          "Beach",       6);
  insertGallery.run("/images/gallery/night-1.jpg",   "Night snorkelling torchlight",   "Activities",  7);
  insertGallery.run("/images/gallery/room-2.jpg",    "Beach Deluxe terrace",           "Rooms",       8);

  // ── REVIEWS ────────────────────────────────────────────────────────────────
  const insertReview = sqlite.prepare(
    "INSERT INTO reviews (quote, guest_name, guest_country, star_rating, active) VALUES (?, ?, ?, ?, 1)"
  );
  insertReview.run("The manta encounter was life-changing. Aveyla's dive team made it feel safe, personal, and utterly unforgettable.", "Sarah K.", "United Kingdom", 5);
  insertReview.run("We've dived all over Southeast Asia. Nothing compares to Hanifaru Bay, and nowhere gets you closer than Aveyla.", "Marco & Lena", "Germany", 5);
  insertReview.run("Solar-powered, small, and right on the reef. This is what responsible travel should look like.", "James T.", "Australia", 5);

  // ── FAQ ITEMS ──────────────────────────────────────────────────────────────
  const insertFaq = sqlite.prepare(
    "INSERT INTO faq_items (question, answer, category, sort_order, active) VALUES (?, ?, ?, ?, 1)"
  );
  insertFaq.run("How do I get to Dharavandhoo Island?", "Domestic flight from Velana International Airport (Malé) to Dharavandhoo Airport (approximately 20 minutes), followed by a short transfer to Aveyla.", "Transfer & Getting Here", 0);
  insertFaq.run("How long is the transfer from Malé?", "The domestic flight is approximately 20 minutes. From Dharavandhoo Airport to Aveyla is a 5-minute drive.", "Transfer & Getting Here", 1);
  insertFaq.run("Do I need a diving certification?", "For scuba diving, a PADI Open Water certification or equivalent is required. Snorkelling requires no certification.", "Diving & Activities", 2);
  insertFaq.run("When is the best time to see manta rays?", "Manta season runs from June to November, with peak aggregations in August, September, and October.", "Diving & Activities", 3);
  insertFaq.run("Is Aveyla really 100% solar powered?", "Yes. The entire property runs on solar electricity.", "Rooms & Facilities", 4);
  insertFaq.run("What dietary requirements can you accommodate?", "We accommodate vegetarian, vegan, gluten-free, and halal dietary requirements with advance notice.", "Rooms & Facilities", 5);
  insertFaq.run("What payment methods do you accept?", "We accept Visa, Mastercard, and American Express.", "Booking & Payment", 6);
  insertFaq.run("What is your cancellation policy?", "Please refer to the booking confirmation or contact us at info@aveyla.com.", "Booking & Payment", 7);

  // ── NAV ITEMS ──────────────────────────────────────────────────────────────
  const insertNav = sqlite.prepare(
    "INSERT INTO nav_items (location, label, href, sort_order, active) VALUES (?, ?, ?, ?, 1)"
  );
  // Header
  insertNav.run("header", "Rooms",        "/rooms",        0);
  insertNav.run("header", "Activities",   "/activities",   1);
  insertNav.run("header", "Packages",     "/packages",     2);
  insertNav.run("header", "Hanifaru Bay", "/hanifaru-bay", 3);
  insertNav.run("header", "Gallery",      "/gallery",      4);
  insertNav.run("header", "Contact",      "/contact",      5);
  // Footer Explore
  insertNav.run("footer_explore", "Rooms",       "/rooms",       0);
  insertNav.run("footer_explore", "Activities",  "/activities",  1);
  insertNav.run("footer_explore", "Packages",    "/packages",    2);
  insertNav.run("footer_explore", "Gallery",     "/gallery",     3);
  // Footer Info
  insertNav.run("footer_info", "About Us",       "/about",       0);
  insertNav.run("footer_info", "FAQ",            "/faq",         1);
  insertNav.run("footer_info", "Contact",        "/contact",     2);
  insertNav.run("footer_info", "Privacy Policy", "/privacy",     3);

  // ── SITE SETTINGS ──────────────────────────────────────────────────────────
  const insertSetting = sqlite.prepare("INSERT INTO site_settings (key, value) VALUES (?, ?)");
  insertSetting.run("phone",            "+960 668-0068");
  insertSetting.run("email",            "info@aveyla.com");
  insertSetting.run("whatsapp",         "9606680068");
  insertSetting.run("whatsapp_display", "+960 668-0068");
  insertSetting.run("booking_url",      "");
  insertSetting.run("site_name",        "Aveyla Manta Village");
  insertSetting.run("tagline",          "Manta Village · Maldives");

  // ── PAGE CONTENT ───────────────────────────────────────────────────────────
  const insertPage = sqlite.prepare("INSERT INTO page_content (page_slug, section_key, title, body, image_path, sort_order) VALUES (?, ?, ?, ?, ?, ?)");

  // Homepage - Hero
  insertPage.run("home", "hero", "Where the Manta Rays Are.", "Hanifaru Bay. Baa Atoll UNESCO Biosphere Reserve. Dharavandhoo Island, Maldives.", "/images/hero-poster.jpg", 0);
  insertPage.run("home", "hero_cta1", "Explore the Reef", "/activities", null, 1);
  insertPage.run("home", "hero_cta2", "Book Your Stay", "", null, 2);

  // Homepage - Brand Statement
  insertPage.run("home", "brand", "Affordable luxury.\nUntamed ocean.\nNo compromises.", "Aveyla Manta Village sits on Dharavandhoo Island in the Baa Atoll — the Maldives' only UNESCO Marine Biosphere Reserve. Sixteen rooms. One hundred percent solar powered. A PADI dive centre with direct access to Hanifaru Bay, the single most significant manta ray aggregation site on earth. This is not a resort. This is a base camp for the ocean.", null, 3);

  // Homepage - Hanifaru Feature
  insertPage.run("home", "hanifaru_feature", "Hanifaru Bay. The single greatest congregation of manta rays on earth.", "Every year between June and November, the currents of the Baa Atoll funnel plankton into Hanifaru Bay's shallow lagoon, drawing hundreds of manta rays and whale sharks into a feeding congregation found nowhere else on earth. UNESCO designated the Baa Atoll a World Biosphere Reserve in 2011. Aveyla is the closest accommodation to Hanifaru Bay — a fifteen-minute boat ride from your room to the encounter.", "/images/hanifaru-manta.jpg", 4);

  // Homepage - About Teaser
  insertPage.run("home", "about_teaser", "Built on the Reef. Powered by the Sun.", "Aveyla Manta Village was established in 2014 on Dharavandhoo Island. Sixteen rooms. One hundred percent solar electricity. Licensed by the Maldives Ministry of Tourism, operated with the conviction that proximity to one of the world's great marine ecosystems demands responsibility, not luxury theatre.", "/images/about-aerial.jpg", 5);

  // About Page
  insertPage.run("about", "hero", "About Aveyla", null, null, 0);
  insertPage.run("about", "image", null, null, "/images/about-aerial.jpg", 1);
  insertPage.run("about", "intro", null, "Aveyla Manta Village was established in 2014 on Dharavandhoo Island in the Baa Atoll — the Maldives' only UNESCO Marine Biosphere Reserve. Sixteen rooms in three categories. A PADI dive centre with direct access to Hanifaru Bay. One hundred percent solar electricity.", null, 2);
  insertPage.run("about", "legal", null, "We are operated by SEARCH MALDIVES Private Limited (Company Registration C-295/2007, Ministry of Economic Development) under Tourism Licence No. 88-QARS/GH/2015/35, issued by the Ministry of Tourism, Arts & Culture.", null, 3);
  insertPage.run("about", "philosophy", null, "The property is built on the principle that proximity to one of the world's most significant marine ecosystems demands responsibility. Solar power is not a feature — it is how we operate. Small group dives are not a luxury offering — they are how we protect the reef. Hanifaru Bay is not a marketing asset — it is the reason this place exists, and the reason we take its stewardship seriously.", null, 4);
  insertPage.run("about", "stat_1", "16", "Rooms", null, 5);
  insertPage.run("about", "stat_2", "100%", "Solar Powered", null, 6);
  insertPage.run("about", "stat_3", "2014", "Established", null, 7);

  // Dining Page
  insertPage.run("dining", "hero", "Dining", null, "/images/activities/dining.jpg", 0);
  insertPage.run("dining", "content", null, "Meals at Aveyla are built around what arrives that day. The kitchen works with local fishermen and island produce — reef fish grilled whole, coconut curries, tropical fruit that has never seen a cargo hold. No pretension, no buffet theatre. Just food that belongs here.\n\nBreakfast, lunch, and dinner are served in the open-air restaurant overlooking the lagoon. Dietary requirements are accommodated with advance notice. Half-board and full-board options are available with all packages.", null, 1);

  // Hanifaru Bay Page
  insertPage.run("hanifaru", "hero", "Hanifaru Bay", null, "/images/hanifaru-hero.jpg", 0);
  insertPage.run("hanifaru", "intro", null, "Hanifaru Bay sits within the Baa Atoll, a UNESCO World Biosphere Reserve since 2011. It is a shallow, funnel-shaped bay approximately 350 metres long, and it produces what marine biologists describe as the largest known feeding aggregation of manta rays on earth.\n\nBetween June and November, the southwest monsoon drives nutrient-rich currents into the bay. Plankton concentrates in the shallows. And with it come the mantas — sometimes dozens, sometimes hundreds, spiralling in coordinated feeding chains that have been documented by the BBC, National Geographic, and the Manta Trust.\n\nAveyla Manta Village is the closest accommodation to Hanifaru Bay. A fifteen-minute boat ride from the dive centre jetty. No other property in the Maldives offers this proximity with this level of operational intimacy — small groups, personal dive guides, and a commitment to the ethical guidelines that protect this site.", null, 1);
  insertPage.run("hanifaru", "calendar_note", null, "August–October: highest probability of large manta aggregations.", null, 2);
  insertPage.run("hanifaru", "cta1", "Manta Madness Package", "/packages/manta-madness", null, 3);
  insertPage.run("hanifaru", "cta2", "Dive Hanifaru Package", "/packages/dive-hanifaru", null, 4);

  // Privacy Policy Page
  insertPage.run("privacy", "hero", "Privacy Policy", null, null, 0);
  insertPage.run("privacy", "updated", null, "March 2026", null, 1);
  insertPage.run("privacy", "controller", "Data Controller", "SEARCH MALDIVES Private Limited (Company Registration C-295/2007), operating as Aveyla Manta Village, Dharavandhoo Island, Baa Atoll, Maldives.", null, 2);
  insertPage.run("privacy", "collection", "Information We Collect", "When you use our contact form or make a booking enquiry, we collect your name, email address, travel dates, number of guests, and any message you provide. We do not store payment information — all payments are processed securely by our booking engine provider (IPMS247).", null, 3);
  insertPage.run("privacy", "usage", "How We Use Your Information", "We use your information solely to respond to your enquiry, process your booking, and improve our services. We do not sell, rent, or share your personal data with third parties for marketing purposes.", null, 4);
  insertPage.run("privacy", "cookies", "Cookies", "This website uses cookies for analytics (Google Analytics 4) and session management. You can control cookie preferences through the consent banner displayed on your first visit. Analytics cookies are not loaded until you provide consent.", null, 5);
  insertPage.run("privacy", "rights", "Your Rights", "You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at info@aveyla.com.", null, 6);
  insertPage.run("privacy", "contact", "Contact", "For privacy-related enquiries: info@aveyla.com", null, 7);

  // ── HERO MEDIA ─────────────────────────────────────────────────────────────
  const insertHeroMedia = sqlite.prepare("INSERT INTO hero_media (media_type, media_path, poster_path, alt, sort_order, active) VALUES (?, ?, ?, ?, ?, 1)");
  insertHeroMedia.run("video", "/videos/hero.mp4", "/images/hero-poster.jpg", "Underwater dive footage at Hanifaru Bay", 0);
  insertHeroMedia.run("image", "/images/hanifaru-hero.jpg", null, "Hanifaru Bay aerial view", 1);
  insertHeroMedia.run("image", "/images/about-aerial.jpg", null, "Dharavandhoo Island aerial", 2);

  // ── ADMIN USER ─────────────────────────────────────────────────────────────
  const email = process.env.ADMIN_EMAIL || "admin@aveyla.com";
  const password = process.env.ADMIN_PASSWORD || "aveyla2024";
  const passwordHash = await hash(password, 12);
  sqlite
    .prepare("INSERT INTO admin_users (email, password_hash, name, role) VALUES (?, ?, ?, ?)")
    .run(email, passwordHash, "Admin", "admin");

  console.log(`Seeded database at ${DB_PATH}`);
  console.log(`Admin user: ${email}`);
  sqlite.close();
}

seed().catch(console.error);
