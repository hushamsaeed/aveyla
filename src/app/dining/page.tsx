export default function DiningPage() {
  return (
    <>
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/images/activities/dining.jpg)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-ocean/80" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 tablet:px-14">
          <h1 className="font-display text-display-lg font-light tracking-[-0.02em] text-pure-white">Dining</h1>
        </div>
      </section>

      <section className="bg-coral-white px-6 py-section-mobile tablet:px-14 tablet:py-section-tablet">
        <div className="mx-auto max-w-editorial space-y-6">
          <p className="font-body text-body-lg leading-[1.7] text-slate">
            Meals at Aveyla are built around what arrives that day. The kitchen works with local fishermen and island produce — reef fish grilled whole, coconut curries, tropical fruit that has never seen a cargo hold. No pretension, no buffet theatre. Just food that belongs here.
          </p>
          <p className="font-body text-body-lg leading-[1.7] text-slate">
            Breakfast, lunch, and dinner are served in the open-air restaurant overlooking the lagoon. Dietary requirements are accommodated with advance notice. Half-board and full-board options are available with all packages.
          </p>
        </div>
      </section>
    </>
  );
}
