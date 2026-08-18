import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#2a2d34",
    description: "Nền tảng quản lý và đặt sân tennis TennisHub",
    display: "standalone",
    icons: [
      {
        sizes: "any",
        src: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
    name: "TennisHub - Đặt sân tennis",
    short_name: "TennisHub",
    start_url: "/",
    theme_color: "#0f9b58",
  };
}
