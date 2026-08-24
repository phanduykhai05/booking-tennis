import { Redirect } from "expo-router";
import type { ReactNode } from "react";

import AppLoading from "@/components/layouts/AppLoading";
import { useSession } from "@/lib/api/session";

type AdminRouteGuardProps = {
  children: ReactNode;
};

/**
 * Chỉ tài khoản quản trị mới vào được khu /admin. Phiên đọc từ AsyncStorage nên
 * bất đồng bộ: trong lúc chờ hiện màn hình tải thay vì chớp trắng rồi đá ra 404.
 * "/404" không khớp route nào nên expo-router hiển thị màn hình +not-found.
 */
export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { isReady, session } = useSession();
  const isAdmin = session?.user.role === "admin";

  if (!isReady) return <AppLoading />;
  if (!isAdmin) return <Redirect href="/404" />;

  return <>{children}</>;
}
