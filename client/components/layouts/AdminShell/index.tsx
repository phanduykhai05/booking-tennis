import { usePathname } from "expo-router";
import { useState } from "react";
import { Modal, ScrollView, View, useWindowDimensions } from "react-native";
import type { ReactNode } from "react";

import AdminBreadcrumbs from "@/components/layouts/AdminShell/components/AdminBreadcrumbs";
import AdminSidebar from "@/components/layouts/AdminShell/components/AdminSidebar";
import AdminTopbar from "@/components/layouts/AdminShell/components/AdminTopbar";
import { adminNavigationItems, adminShellContent } from "@/components/layouts/AdminShell/mockData";
import Touch from "@/components/ui/Pressable";
import Screen from "@/components/ui/Screen";

type AdminShellProps = {
  children: ReactNode;
};

/** Dưới ngưỡng này (chủ yếu là điện thoại) menu chuyển thành ngăn kéo trượt từ trái. */
const SIDEBAR_BREAKPOINT = 1024;
const SIDEBAR_WIDTH = 258;

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const isCompact = width < SIDEBAR_BREAKPOINT;

  return (
    <Screen backgroundColor="#ffffff" edges={["bottom", "left", "right", "top"]}>
      <View className="flex-1 flex-row bg-[#f5f7f9]">
        {isCompact ? null : (
          <View className="border-r border-slate-200 bg-white" style={{ width: SIDEBAR_WIDTH }}>
            <AdminSidebar content={adminShellContent} items={adminNavigationItems} pathname={pathname} />
          </View>
        )}

        <View className="min-w-0 flex-1">
          <AdminTopbar content={adminShellContent} isCompact={isCompact} onMenuOpen={() => setIsMobileNavigationOpen(true)} />

          <ScrollView className="flex-1" contentContainerClassName="p-4 pb-10">
            <AdminBreadcrumbs items={adminNavigationItems} pathname={pathname} />
            {children}
          </ScrollView>
        </View>
      </View>

      <Modal
        animationType="slide"
        onRequestClose={() => setIsMobileNavigationOpen(false)}
        transparent
        visible={isCompact && isMobileNavigationOpen}
      >
        <View className="flex-1 flex-row bg-[#0f172a]/45">
          <View className="bg-white" style={{ width: SIDEBAR_WIDTH }}>
            <AdminSidebar
              content={adminShellContent}
              items={adminNavigationItems}
              onNavigate={() => setIsMobileNavigationOpen(false)}
              pathname={pathname}
            />
          </View>
          <Touch accessibilityLabel="Đóng menu" className="flex-1" onPress={() => setIsMobileNavigationOpen(false)} />
        </View>
      </Modal>
    </Screen>
  );
}
