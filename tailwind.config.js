/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["SF Pro Display", "sans-serif"],
      body: ["SF Pro Display", "sans-serif"],
    },
    screens: {
      'sm': '320px',
      'md': '768px',
      'lg': '1024px',
    },
    extend: {
      colors: {
        "primary-100": "#0058E6",
        "neutral-100": "#1E293B",
        "neutral-50": "#94A3BB",
        "neutral-10": "#F8FAFC",
        "neutral-200": "#F1F5F9",
        "neutral-1": "#EBF3FF"
      },
      backgroundColor: {
        "primary-100": "#0058E6",
        "neutral-100": "#1E293B",
        "neutral-50": "#94A3BB",
        "neutral-10": "#F8FAFC",
        "neutral-200": "#F1F5F9",
        "neutral-1": "#EBF3FF"
      }
    },
  },
  plugins: [],
}

