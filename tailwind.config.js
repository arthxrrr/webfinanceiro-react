/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ghoul: {
                    black: '#050505', // Fundo principal
                    dark: '#121212',  // Cards/Surfaces
                    gray: '#27272a',  // Bordas/Inputs
                    red: '#dc2626',   // Sangue/Accent
                    blood: '#991b1b', // Dark Red
                    white: '#f4f4f5', // Texto principal
                    muted: '#a1a1aa', // Texto secundário
                }
            },
        },
    },
    plugins: [],
}
