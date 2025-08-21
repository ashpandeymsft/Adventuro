// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./styles/**/*.{css}",
        "./*.{ts,tsx}" // pick up App.tsx and any other root TSX files
    ],
    theme: {
        extend: {}
    },
    plugins: []
};