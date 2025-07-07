import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssTypography from "@tailwindcss/typography";
import tailwindcssDebugScreens from "tailwindcss-debug-screens";

export default {
  darkMode: ["class"],
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "300px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        text: {
          primary: "#1A1A1A",
          secondary: "#888888",
          tertiary: "#B0BFC9",
        },
        background: {
          primary: "#F9FAFB",
          secondary: "#ECEFF2",
        },
        border: {
          primary: "#ECEFF2",
          focus: "#004653",
          main: "#EDEDED",
        },
        primary: {
          surface: "#E9FFFE",
          border: "#55B2C3",
          primary: "#008BA5",
          hover: "#005D6E",
          pressed: "#002E37",
          focus: "#FFFFFF",
        },
        secondary: {
          surface: "#FEFEE8",
          border: "#FFF79A",
          primary: "#FFEE34",
          hover: "#AA9F23",
          pressed: "#554F11",
        },
        info: {
          surface: "#EFF6FF",
          border: "#93C1FD",
          primary: "#3B8DF6",
          hover: "#1D6FD8",
          pressed: "#1E4D8A",
        },
        success: {
          surface: "#F0FDF4",
          border: "#86EFA6",
          primary: "#43936C",
          hover: "#158036",
          pressed: "#145327",
        },
        warning: {
          surface: "#FFF7ED",
          border: "#FDC074",
          primary: "#F99416",
          hover: "#C2710C",
          pressed: "#7C4D12",
        },
        danger: {
          surface: "#FEF2F2",
          border: "#FCA5A5",
          primary: "#EF4444",
          hover: "#B91C1C",
          pressed: "#7F1D1D",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(to right, #7fc8db, #007a9c)",
      },
    },
  },

  plugins: [tailwindcssAnimate, tailwindcssDebugScreens, tailwindcssTypography, heroui()],
} satisfies Config;
