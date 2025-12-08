import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // LIGNOVIA Brand Colors (direct hex values)
        brand: {
          primary: "#4A3A2C",
          secondary: "#D6C2B5",
          accent: "#C97A5A",
        },

        // Semantic Colors (CSS Variables)
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",

        // Text Colors
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",

        // Border Colors
        border: "var(--border)",
        "border-soft": "var(--border-soft)",
        "border-medium": "var(--border-medium)",

        // UI States
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",

        // Accent
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",

        // Card
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",

        // Popover
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",

        // Primary (for buttons, links)
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",

        // Secondary
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",

        // Destructive (error states)
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",

        // Ring (focus states)
        ring: "var(--ring)",

        // Input
        input: "var(--input)",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-raleway)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
