/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Space Grotesk'", "var(--font-space-grotesk)", "sans-serif"],
        mono: ["'JetBrains Mono'", "var(--font-jetbrains-mono)", "monospace"],
      },
      colors: {
        /* ── Legacy tokens ── */
        "accent-blue":   "var(--accent-blue)",
        "accent-indigo": "var(--accent-indigo)",
        "accent-green":  "var(--accent-green)",
        "accent-cyan":   "var(--accent-cyan)",
        "accent-purple": "var(--accent-purple)",
        "bg-primary":    "var(--bg-primary)",
        "bg-secondary":  "var(--bg-secondary)",
        "bg-card":       "var(--bg-card)",
        "bg-code":       "var(--bg-code)",
        "text-sec":      "var(--text-secondary)",
        "text-muted":    "var(--text-muted)",
        /* ── Semantic tokens (theme-aware) ── */
        background:      "var(--background)",
        foreground:      "var(--foreground)",
        card:            "var(--card)",
        border:          "var(--border)",
        input:           "var(--input)",
        muted: {
          DEFAULT:       "var(--muted)",
          foreground:    "var(--muted-foreground)",
        },
        primary: {
          DEFAULT:       "var(--primary)",
          foreground:    "var(--primary-foreground)",
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      boxShadow: {
        glow: "0 0 40px rgba(59,130,246,0.15), 0 0 80px rgba(59,130,246,0.05)",
        "glow-green": "0 0 40px rgba(16,185,129,0.12)",
        card: "0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
