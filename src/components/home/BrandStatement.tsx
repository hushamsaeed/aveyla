import { getPageContent } from "@/lib/data/pages";

export default async function BrandStatement() {
  const content = await getPageContent("home");
  const title = content.brand?.title || "Affordable luxury.\nUntamed ocean.\nNo compromises.";
  const body =
    content.brand?.body ||
    "Aveyla Manta Village sits on Dharavandhoo Island in the Baa Atoll — the Maldives' only UNESCO Marine Biosphere Reserve. Sixteen rooms. One hundred percent solar powered. A PADI dive centre with direct access to Hanifaru Bay, the single most significant manta ray aggregation site on earth. This is not a resort. This is a base camp for the ocean.";

  const titleLines = title.split("\n");

  return (
    <section className="bg-dark-driftwood px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet desktop:py-section-desktop">
      <div className="mx-auto max-w-content text-center">
        <h2 className="font-display text-display-lg font-semibold leading-[1.2] tracking-[-0.02em] text-pure-white">
          {titleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p className="mx-auto mt-8 max-w-editorial font-body text-body-lg leading-[1.7] text-white/60">
          {body}
        </p>
      </div>
    </section>
  );
}
