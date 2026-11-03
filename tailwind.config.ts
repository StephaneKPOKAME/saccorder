import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "deep-green": "#004038",
        green: "#106048",
        mint: "#58E8A8",
        "mint-100": "#D8F8E8",
        "mint-50": "#E0F8F0",
        border: "#DFE7E3",
        "cold-gray": "#D8E0E0",
        "text-2": "#4A6A60",
        muted: "#5D7F74",
        bg: "#F5F7F6",
      },
      borderRadius: {
        pill: "999px",
        panel: "28px",
        card: "22px",
        control: "14px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,64,56,.06)",
        halo: "0 0 0 4px rgba(88,232,168,.2)",
        "halo-lg": "0 0 0 5px rgba(88,232,168,.2)",
      },
      fontFamily: {
        sans: ["var(--font-schibsted)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: [
          "56px",
          { lineHeight: "0.98", letterSpacing: "-0.045em", fontWeight: "600" },
        ],
        "display-lg": [
          "76px",
          { lineHeight: "0.98", letterSpacing: "-0.045em", fontWeight: "600" },
        ],
        title: ["28px", { lineHeight: "1.2", letterSpacing: "-0.03em", fontWeight: "600" }],
        body: ["17px", { lineHeight: "1.6" }],
        label: [
          "12px",
          { lineHeight: "1.4", letterSpacing: "0.16em", fontWeight: "600" },
        ],
      },
      transitionDuration: {
        DEFAULT: "140ms",
      },
    },
  },
};

export default config;
