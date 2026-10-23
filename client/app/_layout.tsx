import { Suspense } from "react";
import { Outlet } from "react-router";

import InstallPrompt from "@/components/pwa/InstallPrompt";
import { LoadingState } from "@/components/ui/Feedback";
import { ToastProvider } from "@/components/ui/Toast";
import { SessionProvider } from "@/lib/api/session";

export default function RootLayout() {
  return (
    <SessionProvider>
      <ToastProvider>
        {/* Trang tải lười theo route nên cần khung chờ trong lúc tải chunk JS. */}
        <Suspense fallback={<LoadingState label="Đang tải…" />}>
          <Outlet />
        </Suspense>
        <InstallPrompt />
      </ToastProvider>
    </SessionProvider>
  );
}
