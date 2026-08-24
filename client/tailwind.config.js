/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Giữ nguyên thang chữ đã khai báo ở @theme của bản Next để layout không đổi kích thước.
      fontSize: {
        xs: "13px",
        sm: "15px",
        base: "17px",
        lg: "19px",
        xl: "21px",
        "2xl": "25px",
        "3xl": "31px",
      },
      colors: {
        brand: {
          DEFAULT: "#0f9b58",
          dark: "#087640",
          deep: "#005b36",
          light: "#22c55e",
          soft: "#e8f6ee",
        },
        ink: {
          DEFAULT: "#18221e",
          muted: "#68716d",
        },
      },
    },
  },
  plugins: [],
};
