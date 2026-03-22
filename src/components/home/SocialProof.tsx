import { client } from "@/sanity/client";
import { activeReviewsQuery } from "@/sanity/queries";

const FALLBACK_REVIEWS = [
  { _id: "1", quote: "The manta encounter was life-changing. Aveyla's dive team made it feel safe, personal, and utterly unforgettable.", guestName: "Sarah K.", guestCountry: "United Kingdom" },
  { _id: "2", quote: "We've dived all over Southeast Asia. Nothing compares to Hanifaru Bay, and nowhere gets you closer than Aveyla.", guestName: "Marco & Lena", guestCountry: "Germany" },
  { _id: "3", quote: "Solar-powered, small, and right on the reef. This is what responsible travel should look like.", guestName: "James T.", guestCountry: "Australia" },
];

export default async function SocialProof() {
  let reviews = FALLBACK_REVIEWS;
  try {
    const sanityReviews = await client.fetch(activeReviewsQuery);
    if (sanityReviews?.length) reviews = sanityReviews;
  } catch { /* use fallback */ }

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
              key={review._id}
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
