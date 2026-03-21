const REVIEWS = [
  {
    quote: "The manta encounter was life-changing. Aveyla's dive team made it feel safe, personal, and utterly unforgettable.",
    author: "Sarah K.",
    country: "United Kingdom",
  },
  {
    quote: "We've dived all over Southeast Asia. Nothing compares to Hanifaru Bay, and nowhere gets you closer than Aveyla.",
    author: "Marco & Lena",
    country: "Germany",
  },
  {
    quote: "Solar-powered, small, and right on the reef. This is what responsible travel should look like.",
    author: "James T.",
    country: "Australia",
  },
];

export default function SocialProof() {
  return (
    <section className="bg-gradient-to-b from-deep-ocean via-ocean-blue to-lagoon-light px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet desktop:py-section-desktop">
      <div className="mx-auto max-w-content">
        {/* TripAdvisor badge */}
        <div className="mb-12 flex items-center gap-4">
          <span className="font-display text-display-md font-semibold text-pure-white">
            4.8 / 5
          </span>
          <div>
            <div className="text-sand-gold" aria-label="5 stars">★★★★★</div>
            <p className="font-body text-body-sm text-white/60">
              210+ reviews on TripAdvisor
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div className="grid gap-8 tablet:grid-cols-3">
          {REVIEWS.map((review) => (
            <blockquote
              key={review.author}
              className="flex flex-col gap-4 bg-white/10 p-8 backdrop-blur-sm"
            >
              <p className="font-display text-[20px] italic leading-[1.5] text-pure-white">
                &ldquo;{review.quote}&rdquo;
              </p>
              <footer className="font-body text-body-sm text-white/60">
                — {review.author}, {review.country}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
