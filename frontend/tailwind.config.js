/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                darkBg: "#0B0F1A",
                glass: "rgba(17, 24, 39, 0.8)",
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'premium-gradient': 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)',
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
