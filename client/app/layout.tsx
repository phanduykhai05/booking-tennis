import type { Metadata, Viewport } from "next";

import InstallPrompt from "@/components/pwa/InstallPrompt";

import "./globals.css";

export const metadata: Metadata = {
  applicationName: "TennisHub",
  appleWebApp: {
    statusBarStyle: "black-translucent",
    title: "TennisHub",
  },
  title: "TennisHub",
  description: "Nền tảng quản lý và đặt sân tennis TennisHub",
  icons: {
    apple: "/favicon.ico",
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f9b58",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        {children}
        <InstallPrompt />
      </body>
    </html>
  );
}
