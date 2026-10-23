import type { ReactNode } from "react";
import { Navigate } from "react-router";

import AppLoading from "@/components/layouts/AppLoading";
import { useSession } from "@/lib/api/session";

type AdminRouteGuardProps = {
  children: ReactNode;
};

/**
 * Chỉ tài khoản quản trị mới vào được khu /admin. Nếu phiên chưa sẵn sàng thì hiện
 * màn hình tải thay vì chớp trắng rồi đá ra 404.
 * "/404" không khớp route nào nên router hiển thị trang not-found.
 */
export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { isReady, session } = useSession();
  const isAdmin = session?.user.role === "admin";

  if (!isReady) return <AppLoading />;
  if (!isAdmin) return <Navigate replace to="/404" />;

  return <>{children}</>;
}
