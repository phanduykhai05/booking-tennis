import "@/global.css";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import InstallPrompt from "@/components/pwa/InstallPrompt";
import { ToastProvider } from "@/components/ui/Toast";
import { SessionProvider } from "@/lib/api/session";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SessionProvider>
        <ToastProvider>
          {/* Mỗi màn hình tự dựng header riêng nên tắt header mặc định của Stack. */}
          <Stack screenOptions={{ animation: "slide_from_right", headerShown: false }} />
          <InstallPrompt />
        </ToastProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
}
