import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Apna College inspired royal blue / indigo primary
        primary: {
          DEFAULT: "#4854d9",
          50: "#eef1ff",
          100: "#e0e5ff",
          200: "#c7cfff",
          300: "#a5b0fc",
          400: "#8189f8",
          500: "#6366f1",
          600: "#4854d9",
          700: "#3d43b8",
          800: "#333894",
          900: "#2f3376",
          950: "#1d1f45",
        },
        // Yellow/gold accent
        secondary: {
          DEFAULT: "#ffd166",
          50: "#fffbea",
          100: "#fff4c6",
          200: "#ffe888",
          300: "#ffd166",
          400: "#ffb930",
          500: "#f99a07",
          600: "#dd7302",
          700: "#b75006",
          800: "#943e0c",
          900: "#7a340e",
          950: "#461902",
        },
        // Dark / neutrals
        dark: {
          DEFAULT: "#0f172a",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-dots":
          "radial-gradient(circle at 1px 1px, rgba(72,84,217,0.18) 1px, transparent 0)",
        "grid-lines":
          "linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)",
      },
      backgroundSize: {
        "dots-sm": "20px 20px",
        "dots-md": "28px 28px",
        "grid-md": "60px 60px",
      },
      boxShadow: {
        soft: "0 4px 24px -6px rgba(15, 23, 42, 0.08)",
        card: "0 8px 30px -4px rgba(72, 84, 217, 0.12)",
        "card-hover": "0 20px 50px -12px rgba(72, 84, 217, 0.25)",
        button: "0 6px 20px -4px rgba(72, 84, 217, 0.4)",
        "button-hover": "0 10px 30px -6px rgba(72, 84, 217, 0.55)",
        yellow: "0 8px 30px -6px rgba(255, 209, 102, 0.5)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "slide-in-left": "slideInLeft 0.7s ease-out forwards",
        "slide-in-right": "slideInRight 0.7s ease-out forwards",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee 40s linear infinite reverse",
        float: "float 6s ease-in-out infinite",
        blob: "blob 20s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.08)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.94)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
