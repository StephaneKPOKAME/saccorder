import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0C0E0F",
        "surface-1": "#111415",
        "surface-2": "#141718",
        "surface-3": "#1B1F20",
        border: "rgba(255,255,255,.08)",
        "border-strong": "rgba(255,255,255,.12)",
        text: "#F1F3F2",
        "text-2": "#A3ABA8",
        "text-3": "#7D8784",
        mint: "#58E8A8",
        bluet: "#8FA9E8",
        abricot: "#F5A97F",
        lilas: "#C0B0E8",
        ble: "#E8D67A",
      },
      borderRadius: {
        xs: "14px",
        sm: "18px",
        md: "24px",
        lg: "28px",
        xl: "36px",
        "2xl": "40px",
        pill: "999px",
      },
      boxShadow: {
        halo: "0 0 0 4px rgba(88,232,168,.2)",
        "halo-lg": "0 0 0 5px rgba(88,232,168,.2)",
      },
      fontFamily: {
        sans: ["var(--font-onest)", "system-ui", "sans-serif"],
        display: ["var(--font-unbounded)", "system-ui", "sans-serif"],
        logo: ["var(--font-outfit)", "system-ui", "sans-serif"],
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
        DEFAULT: "160ms",
      },
    },
  },
};

export default config;
