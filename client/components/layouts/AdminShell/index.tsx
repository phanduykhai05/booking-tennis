import { useCallback, useState } from "react";
import { useLocation } from "react-router";
import type { ReactNode } from "react";

import AdminBreadcrumbs from "@/components/layouts/AdminShell/components/AdminBreadcrumbs";
import AdminSidebar from "@/components/layouts/AdminShell/components/AdminSidebar";
import AdminTopbar from "@/components/layouts/AdminShell/components/AdminTopbar";
import { adminNavigationItems, adminShellContent } from "@/components/layouts/AdminShell/mockData";
import Touch from "@/components/ui/Pressable";
import Screen from "@/components/ui/Screen";
import { getNotifications } from "@/lib/api/endpoints";
import { useSession } from "@/lib/api/session";
import { useAsync } from "@/lib/useAsync";
import { useEscapeKey } from "@/lib/useEscapeKey";
import { useWindowDimensions } from "@/lib/useWindowDimensions";

type AdminShellProps = {
  children: ReactNode;
};

/** Dưới ngưỡng này (chủ yếu là điện thoại) menu chuyển thành ngăn kéo trượt từ trái. */
const SIDEBAR_BREAKPOINT = 1024;
const SIDEBAR_WIDTH = 258;

export default function AdminShell({ children }: AdminShellProps) {
  const { pathname } = useLocation();
  const { width } = useWindowDimensions();
  const { token } = useSession();
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const isCompact = width < SIDEBAR_BREAKPOINT;
  const closeMobileNavigation = useCallback(() => setIsMobileNavigationOpen(false), []);
  useEscapeKey(isCompact && isMobileNavigationOpen, closeMobileNavigation);

  // Chấm đỏ trên chuông phải phản ánh số chưa đọc thật, không bật cứng.
  const { data: notifications } = useAsync(
    () => (token ? getNotifications(token) : Promise.resolve([])),
    [token],
    "",
  );

  const unreadCount = (notifications ?? []).filter((item) => !item.isRead).length;

  return (
    <Screen backgroundColor="#ffffff" edges={["bottom", "left", "right", "top"]}>
      <div className="flex-1 flex-row bg-[#f5f7f9]">
        {isCompact ? null : (
          <div className="border-r border-slate-200 bg-white" style={{ width: SIDEBAR_WIDTH }}>
            <AdminSidebar content={adminShellContent} items={adminNavigationItems} pathname={pathname} />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <AdminTopbar
            content={adminShellContent}
            isCompact={isCompact}
            onMenuOpen={() => setIsMobileNavigationOpen(true)}
            unreadCount={unreadCount}
          />

          <div className="grow shrink overflow-y-auto overflow-x-hidden flex-1">
            <div className="p-4 pb-10">
              <AdminBreadcrumbs items={adminNavigationItems} pathname={pathname} />
              {children}
            </div>
          </div>
        </div>
      </div>

      {isCompact && isMobileNavigationOpen ? (
        <div aria-modal="true" className="fixed inset-0 z-[2000] flex-row bg-[#0f172a]/45" role="dialog">
          <div className="bg-white" style={{ width: SIDEBAR_WIDTH }}>
            <AdminSidebar
              content={adminShellContent}
              items={adminNavigationItems}
              onNavigate={() => setIsMobileNavigationOpen(false)}
              pathname={pathname}
            />
          </div>
          <Touch accessibilityLabel="Đóng menu" className="flex-1" onPress={() => setIsMobileNavigationOpen(false)} />
        </div>
      ) : null}
    </Screen>
  );
}
