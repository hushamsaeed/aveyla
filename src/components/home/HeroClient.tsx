"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Slide {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
}

interface HeroClientProps {
  title: string;
  subtitle: string;
  cta1Label: string;
  cta2Label: string;
  slides: Slide[];
}

const INTERVAL = 7000; // 7 seconds per slide

export default function HeroClient({ title, subtitle, cta1Label, cta2Label, slides }: HeroClientProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slide = slides[current] || slides[0];
  const hasMultiple = slides.length > 1;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Auto-advance for images (videos advance when they end or after interval)
  useEffect(() => {
    if (paused || !hasMultiple) return;

    // For images, use interval. For videos, let onEnded handle it but also set a max timeout.
    timerRef.current = setInterval(nextSlide, INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, paused, hasMultiple, nextSlide]);

  // Auto-play video when slide changes to a video
  useEffect(() => {
    if (slide?.type === "video" && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [current, slide?.type, slide?.src]);

  const togglePause = () => {
    setPaused((p) => {
      const next = !p;
      if (slide?.type === "video" && videoRef.current) {
        if (next) videoRef.current.pause();
        else videoRef.current.play().catch(() => {});
      }
      return next;
    });
  };

  const scrollToActivities = () => {
    document.getElementById("activities")?.scrollIntoView({ behavior: "smooth" });
  };

  const goToSlide = (idx: number) => {
    setCurrent(idx);
    setPaused(false);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-dark-driftwood">
      {/* Media slides with crossfade */}
      {slides.map((s, i) => (
        <div
          key={`${s.src}-${i}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
          aria-hidden={i !== current}
        >
          {s.type === "video" ? (
            <video
              ref={i === current ? videoRef : undefined}
              className="h-full w-full object-cover motion-reduce:hidden"
              autoPlay={i === current}
              muted
              loop={!hasMultiple}
              playsInline
              poster={s.poster}
              onEnded={hasMultiple ? nextSlide : undefined}
            >
              <source src={s.src} type={s.src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
            </video>
          ) : (
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${s.src})` }}
              role="img"
              aria-label={s.alt}
            />
          )}
        </div>
      ))}

      {/* Static poster for prefers-reduced-motion */}
      <div
        className="absolute inset-0 hidden motion-reduce:block bg-cover bg-center"
        style={{ backgroundImage: `url(${slide?.poster || slide?.src || "/images/hero-poster.jpg"})` }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-driftwood/80" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 tablet:px-14">
        <div className="max-w-[800px] space-y-6">
          <h1 className="font-display text-[clamp(3rem,5vw+1rem,6rem)] font-light leading-[1.05] tracking-[-0.03em] text-pure-white">
            {title}
          </h1>
          <p className="max-w-[600px] font-body text-body-lg text-white/80">
            {subtitle}
          </p>
          <div className="flex gap-4">
            <button
              onClick={scrollToActivities}
              className="bg-coral-clay px-8 py-4 font-body text-[14px] font-semibold text-dark-driftwood transition-transform duration-cta hover:scale-[1.02]"
            >
              {cta1Label}
            </button>
            <Link
              href={process.env.NEXT_PUBLIC_IPMS247_URL || "/contact"}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white px-8 py-4 font-body text-[14px] font-medium text-pure-white transition-colors duration-cta hover:bg-white/10"
            >
              {cta2Label}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      {hasMultiple && (
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-coral-clay" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Pause/Play button */}
      <button
        onClick={togglePause}
        className="absolute right-6 top-24 z-20 rounded-full bg-dark-driftwood/50 p-2 text-pure-white backdrop-blur-sm transition-opacity hover:bg-dark-driftwood/70 motion-reduce:hidden"
        aria-label={paused ? "Play slideshow" : "Pause slideshow"}
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          {paused ? (
            <path d="M8 5v14l11-7z" />
          ) : (
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          )}
        </svg>
      </button>
    </section>
  );
}
