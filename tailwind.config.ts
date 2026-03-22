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
        "dark-driftwood": "#2A2018",
        "muted-ocean": "#3D6B72",
        terracotta: "#C4724A",
        "coral-clay": "#E8A87C",
        "salt-white": "#FFFDF9",
        linen: "#FAF6F0",
        "pure-white": "#FFFFFF",
        driftwood: "#8B7355",
        "warm-sand": "#D4B896",
      },
      fontFamily: {
        display: ["var(--font-young-serif)", "YoungSerif", "serif"],
        editorial: ["var(--font-lora)", "Lora", "serif"],
        body: ["var(--font-instrument-sans)", "Instrument Sans", "sans-serif"],
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
