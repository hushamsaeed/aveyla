export function hotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Aveyla Manta Village",
    description: "Boutique beachfront hotel on Dharavandhoo Island, Baa Atoll UNESCO Biosphere Reserve, Maldives. PADI dive centre with direct access to Hanifaru Bay.",
    url: "https://www.aveyla.com",
    telephone: "+960-777-3998",
    email: "info@aveyla.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dharavandhoo Island",
      addressLocality: "Baa Atoll",
      addressCountry: "MV",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 5.1579,
      longitude: 73.0243,
    },
    numberOfRooms: 16,
    starRating: { "@type": "Rating", ratingValue: "4.8" },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "PADI Dive Centre" },
      { "@type": "LocationFeatureSpecification", name: "100% Solar Powered" },
      { "@type": "LocationFeatureSpecification", name: "UNESCO Biosphere Reserve" },
    ],
    image: "https://www.aveyla.com/images/hero-poster.jpg",
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
