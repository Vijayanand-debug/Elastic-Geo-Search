import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#1E40AF",
                    light: "#3B82F6",
                    dark: "#1E3A8A",
                },
                secondary: {
                    DEFAULT: "#F59E0B",
                    light: "#FBBF24",
                    dark: "#B45309",
                }
            }
        }
    },
    plugins: [],
};

export default config;