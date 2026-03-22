"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPaused(false);
    } else {
      videoRef.current.pause();
      setPaused(true);
    }
  };

  const scrollToActivities = () => {
    document.getElementById("activities")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-dark-driftwood">
      {/* Video / Poster fallback */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Static poster for prefers-reduced-motion */}
      <div
        className="absolute inset-0 hidden motion-reduce:block bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero-poster.jpg)" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-driftwood/80" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 tablet:px-14">
        <div className="max-w-[800px] space-y-6">
          <h1 className="font-display text-[clamp(3rem,5vw+1rem,6rem)] font-light leading-[1.05] tracking-[-0.03em] text-pure-white">
            Where the Manta Rays Are.
          </h1>
          <p className="max-w-[600px] font-body text-body-lg text-white/80">
            Hanifaru Bay. Baa Atoll UNESCO Biosphere Reserve. Dharavandhoo
            Island, Maldives.
          </p>
          <div className="flex gap-4">
            <button
              onClick={scrollToActivities}
              className="bg-coral-clay px-8 py-4 font-body text-[14px] font-semibold text-dark-driftwood transition-transform duration-cta hover:scale-[1.02]"
            >
              Explore the Reef
            </button>
            <Link
              href={process.env.NEXT_PUBLIC_IPMS247_URL || "/contact"}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white px-8 py-4 font-body text-[14px] font-medium text-pure-white transition-colors duration-cta hover:bg-white/10"
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      </div>

      {/* Pause button */}
      <button
        onClick={toggleVideo}
        className="absolute right-6 top-24 z-20 rounded-full bg-dark-driftwood/50 p-2 text-pure-white backdrop-blur-sm transition-opacity hover:bg-dark-driftwood/70 motion-reduce:hidden"
        aria-label={paused ? "Play video" : "Pause video"}
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          {paused ? (
            <path d="M8 5v14l11-7z" />
          ) : (
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          )}
        </svg>
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce motion-reduce:hidden">
        <svg className="h-6 w-6 text-white/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
