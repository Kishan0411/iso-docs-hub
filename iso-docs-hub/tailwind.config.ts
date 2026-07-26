import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B1E3D",
          light: "#13294B",
        },
        signal: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          400: "#4C8DFF",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1E40AF",
        },
        certify: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          400: "#34D399",
          500: "#059669",
          600: "#047857",
        },
        paper: "#FBFCFE",
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          900: "#0F172A",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(11,30,61,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,30,61,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,30,61,0.06), 0 8px 24px -8px rgba(11,30,61,0.12)",
        "card-hover": "0 4px 12px rgba(11,30,61,0.08), 0 24px 48px -12px rgba(11,30,61,0.18)",
        stamp: "0 0 0 3px rgba(5,150,105,0.15)",
      },
      keyframes: {
        stamp: {
          "0%": { transform: "scale(2.2) rotate(-18deg)", opacity: "0" },
          "60%": { transform: "scale(0.9) rotate(-12deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(-12deg)", opacity: "1" },
        },
      },
      animation: {
        stamp: "stamp 0.5s cubic-bezier(0.2,0.8,0.2,1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
