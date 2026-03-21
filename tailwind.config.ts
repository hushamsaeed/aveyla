import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-ocean": "#0A1628",
        "ocean-blue": "#0D4F6E",
        "reef-teal": "#0E7490",
        "sand-gold": "#C8A96E",
        "lagoon-light": "#E8F4F8",
        "coral-white": "#FDFAF6",
        "pure-white": "#FFFFFF",
        slate: "#4A5568",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.25rem, 5vw + 1rem, 7.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 4vw + 1rem, 5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2rem, 2.5vw + 0.5rem, 3rem)", { lineHeight: "1.15" }],
        "heading-xl": ["clamp(1.75rem, 1.5vw + 0.5rem, 2.25rem)", { lineHeight: "1.2" }],
        "heading-lg": ["clamp(1.375rem, 1vw + 0.5rem, 1.75rem)", { lineHeight: "1.25" }],
        "heading-md": ["clamp(1.125rem, 0.75vw + 0.5rem, 1.375rem)", { lineHeight: "1.3" }],
        "body-lg": ["clamp(1.0625rem, 0.25vw + 0.9rem, 1.125rem)", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["clamp(0.8125rem, 0.15vw + 0.7rem, 0.875rem)", { lineHeight: "1.5" }],
        label: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.05em" }],
      },
      spacing: {
        "section-desktop": "120px",
        "section-tablet": "80px",
        "section-mobile": "60px",
      },
      maxWidth: {
        content: "1200px",
        editorial: "720px",
      },
      screens: {
        mobile: "375px",
        tablet: "768px",
        "desktop-sm": "1024px",
        desktop: "1280px",
        "desktop-xl": "1440px",
      },
      transitionDuration: {
        "scroll-animation": "400ms",
        nav: "200ms",
        cta: "180ms",
      },
      transitionTimingFunction: {
        "scroll-ease": "ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
