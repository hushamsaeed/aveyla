import { getActiveReviews } from "@/lib/data/reviews";

export default async function SocialProof() {
  const reviews = await getActiveReviews();

  return (
    <section className="bg-gradient-to-b from-dark-driftwood via-muted-ocean to-salt-white px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet desktop:py-section-desktop">
      <div className="mx-auto max-w-content">
        {/* TripAdvisor badge */}
        <div className="mb-12 flex items-center gap-4">
          <span className="font-display text-display-md font-semibold text-pure-white">
            4.8 / 5
          </span>
          <div>
            <div className="text-coral-clay" aria-label="5 stars">★★★★★</div>
            <p className="font-body text-body-sm text-white/60">
              210+ reviews on TripAdvisor
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div className="grid gap-8 tablet:grid-cols-3">
          {reviews.slice(0, 3).map((review) => (
            <blockquote
              key={review.id}
              className="flex flex-col gap-4 bg-white/10 p-8 backdrop-blur-sm"
            >
              <p className="font-editorial text-[20px] italic leading-[1.5] text-pure-white">
                &ldquo;{review.quote}&rdquo;
              </p>
              <footer className="font-body text-body-sm text-white/60">
                — {review.guestName}, {review.guestCountry}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
