import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    // Import "x.svg?react" thành React component (icon bộ alobo nhận color/width/height).
    svgr(),
    VitePWA({
      includeAssets: ["apple-touch-icon.png"],
      manifest: {
        background_color: "#f5f6f5",
        description: "Nền tảng quản lý và đặt sân tennis TennisHub",
        display: "standalone",
        icons: [
          { sizes: "192x192", src: "/icon-192.png", type: "image/png" },
          { sizes: "512x512", src: "/icon-512.png", type: "image/png" },
          { purpose: "maskable", sizes: "512x512", src: "/icon-512.png", type: "image/png" },
        ],
        lang: "vi",
        name: "TennisHub - Đặt sân tennis",
        short_name: "TennisHub",
        start_url: "/",
        theme_color: "#0f9b58",
      },
      registerType: "autoUpdate",
      workbox: {
        // SPA: mọi đường dẫn trang đều trả index.html, trừ API phải luôn đi thẳng tới server.
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  server: { port: 8081 },
});
