import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

/**
 * Vỏ HTML của bản web (chỉ dùng khi build web, không vào bundle native).
 * Giữ lại phần manifest và theme-color để bản web vẫn cài được như PWA.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#0f9b58" />
        <meta name="description" content="Nền tảng quản lý và đặt sân tennis TennisHub" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="TennisHub" />
        <link rel="manifest" href="/manifest.json" />

        {/* Chặn body của web tự cuộn, để ScrollView của react-native-web cuộn đúng. */}
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: bodyStyle }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const bodyStyle = `body { background-color: #f5f6f5; }`;
