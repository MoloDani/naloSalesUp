/** @type {import('tailwindcss').Config} */
module.exports = {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        first: ['firstFont', 'sans-serif'], // for "firstFont"
        second: ['secondFont', 'sans-serif'], // for "secondFont"
      },
      screens: {
        '3xl': '2000px',
        "sm2": "720px",
        "xs": "520px",
        "xxs": "300px",
      },
      colors: {
        custom: "rgba(3, 172, 19, 1)",
        darkGreen: "rgba(16, 124, 26, 1)",
      },
      height: {
        15: "3.75rem",
      },
      width: {
        15: "3.75rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        slide_right: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-2926px)' }, 
        },
        slide_left: {
          '0%': { transform: 'translateX(-580px)' },
          '100%': { transform: 'translateX(-0%)' },
        },
        wiggle_animation: {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)'},
          '50%': { transform: 'translateY(-40px) translateX(-100px) scale(0.8)'}, 
          '100%': { transform: 'translateY(0) translateX(0) scale(1)'},
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slide_right: "slide_right 35s linear infinite",
        slide_left: "slide_left 35s linear infinite",
        wiggle_animation: "wiggle_animation 10s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Inject custom fonts using @layer
    function ({ addBase }) {
      addBase([
        {
          '@font-face': {
            fontFamily: 'firstFont',
            src: 'url("/fonts/EuropaGroteskSH-Med.otf") format("opentype")',
            fontWeight: 'normal',
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'secondFont',
            src: 'url("/fonts/HelveticaNeueMedium.otf") format("opentype")',
            fontWeight: 'normal',
            fontStyle: 'normal',
          },
        },
      ]);
    },
  ],
};
