import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-dark-driftwood px-6 text-center">
      <h1 className="font-display text-display-xl font-light text-pure-white">404</h1>
      <p className="mt-4 font-body text-body-lg text-white/60">
        This page has drifted beyond the reef.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="bg-coral-clay px-8 py-4 font-body text-[14px] font-semibold text-dark-driftwood">
          Return Home
        </Link>
        <Link href="/contact" className="border border-white px-8 py-4 font-body text-[14px] font-medium text-pure-white">
          Contact Us
        </Link>
      </div>
    </section>
  );
}
