/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ["Sora", '"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        // semua warna netral mengikuti tema (terang/gelap) lewat CSS variable
        fg: v("fg"),
        accent: v("accent"),
        ink: { 950: v("ink-950"), 900: v("ink-900"), 800: v("ink-800"), 700: v("ink-700") },
        brand: { DEFAULT: "#ff7a1a", deep: "#ea580c", amber: "#ffb020", coral: "#ff5a36" },
      },
      keyframes: {
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        drift: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(40px,-30px) scale(1.1)" },
          "66%": { transform: "translate(-30px,30px) scale(.95)" },
        },
        shine: { to: { backgroundPosition: "200% center" } },
        marquee: { to: { transform: "translateX(-50%)" } },
        spin360: { to: { transform: "rotate(360deg)" } },
        pop: {
          "0%": { opacity: 0, transform: "translateY(14px) scale(.97)" },
          "100%": { opacity: 1, transform: "none" },
        },
        sweep: {
          "0%": { transform: "translateX(-120%) skewX(-20deg)" },
          "60%,100%": { transform: "translateX(220%) skewX(-20deg)" },
        },
        blink: { "50%": { opacity: 0 } },
        pageIn: {
          "0%": { opacity: 0, transform: "translateY(18px) scale(.995)", filter: "blur(6px)" },
          "100%": { opacity: 1, transform: "none", filter: "blur(0)" },
        },
        ripple: { "0%": { transform: "scale(0)", opacity: 0.55 }, "100%": { transform: "scale(1)", opacity: 0 } },
        wiggle: { "0%,100%": { transform: "rotate(-8deg)" }, "50%": { transform: "rotate(8deg)" } },
        slideX: { to: { transform: "translateX(-50%)" } },
        loadbar: { "0%": { width: "0%" }, "100%": { width: "100%" } },
        rise: { "0%": { transform: "translateY(0) scale(1)", opacity: 0 }, "20%": { opacity: 1 }, "100%": { transform: "translateY(-110vh) scale(.6)", opacity: 0 } },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
        shine: "shine 6s linear infinite",
        marquee: "marquee 40s linear infinite",
        spin360: "spin360 8s linear infinite",
        pop: "pop .5s cubic-bezier(.2,.8,.2,1) both",
        sweep: "sweep 3.2s ease-in-out infinite",
        blink: "blink 1s steps(2) infinite",
        pageIn: "pageIn .6s cubic-bezier(.2,.8,.2,1) backwards",
        ripple: "ripple .7s ease-out forwards",
        wiggle: "wiggle 1.2s ease-in-out infinite",
        slideX: "slideX 60s linear infinite",
        loadbar: "loadbar 1.4s cubic-bezier(.65,0,.35,1) forwards",
      },
    },
  },
  plugins: [],
};
