"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Rooms", href: "/rooms" },
  { label: "Activities", href: "/activities" },
  { label: "Packages", href: "/packages" },
  { label: "Hanifaru Bay", href: "/hanifaru-bay" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close on ESC
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  // Lock body scroll when mobile nav open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-4 tablet:px-16 transition-colors duration-nav ${
          scrolled
            ? "bg-dark-driftwood"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Aveyla Manta Village — Home"
        >
          <Image
            src="/images/logo/aveyla-nav.png"
            alt="Aveyla Manta Village"
            width={152}
            height={82}
            className="h-10 w-auto tablet:h-12"
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden tablet:flex items-center gap-8" role="menubar">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-[14px] font-medium text-pure-white hover:text-coral-clay transition-colors duration-nav"
              role="menuitem"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Book Now CTA — desktop */}
        <Link
          href="/contact"
          className="hidden tablet:inline-flex items-center rounded-sm bg-coral-clay px-6 py-3 font-body text-[13px] font-semibold text-dark-driftwood hover:bg-coral-clay/90 transition-colors duration-cta"
        >
          Book Now
        </Link>

        {/* Mobile hamburger */}
        <button
          className="tablet:hidden flex items-center gap-2 text-pure-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span className="font-body text-[14px] font-medium">
            {mobileOpen ? "Close" : "Menu"}
          </span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-dark-driftwood"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className="font-display text-display-md font-light text-pure-white hover:text-coral-clay transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={closeMobile}
            className="mt-4 rounded-sm bg-coral-clay px-8 py-4 font-body text-[14px] font-semibold text-dark-driftwood hover:bg-coral-clay/90 transition-colors"
          >
            Book Now
          </Link>
        </div>
      )}
    </>
  );
}
