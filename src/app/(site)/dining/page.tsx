import type { Metadata } from "next";
import { getPageContent } from "@/lib/data/pages";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Dining | Aveyla Manta Village | Maldives",
  description: "Fresh-caught seafood, coconut curries, and tropical fruit. Open-air restaurant overlooking the lagoon on Dharavandhoo Island.",
};

export default async function DiningPage() {
  const c = await getPageContent("dining");
  const heroImage = c.hero?.imagePath || "/images/activities/dining.jpg";
  const heroTitle = c.hero?.title || "Dining";
  const heroBody = c.hero?.body || "";
  const contentTitle = c.content?.title || "Our Restaurant";
  const contentBody = c.content?.body || "Meals at Aveyla are built around what arrives that day. The kitchen works with local fishermen and island produce \u2014 reef fish grilled whole, coconut curries, tropical fruit that has never seen a cargo hold. No pretension, no buffet theatre. Just food that belongs here.\n\nBreakfast, lunch, and dinner are served in the open-air restaurant overlooking the lagoon. Dietary requirements are accommodated with advance notice. Half-board and full-board options are available with all packages.";
  const heroParagraphs = heroBody ? heroBody.split("\n\n") : [];
  const contentParagraphs = contentBody.split("\n\n");

  return (
    <>
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-driftwood/80" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 tablet:px-14">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">{heroTitle}</h1>
        </div>
      </section>

      {heroParagraphs.length > 0 && (
        <section className="bg-linen px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
          <div className="mx-auto max-w-editorial space-y-8">
            {heroParagraphs.map((para, i) => (
              <p key={i} className="font-body text-body-lg leading-[1.7] text-driftwood">
                {para}
              </p>
            ))}
          </div>
        </section>
      )}

      <section className="bg-salt-white px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-editorial space-y-8">
          <h2 className="font-display text-display-md font-semibold tracking-[-0.02em] text-dark-driftwood">
            {contentTitle}
          </h2>
          {contentParagraphs.map((para, i) => (
            <p key={i} className="font-body text-body-lg leading-[1.7] text-driftwood">
              {para}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
