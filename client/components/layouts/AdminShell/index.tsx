"use client";

import { Drawer, Layout } from "antd";
import { usePathname } from "next/navigation";
import { useState } from "react";

import AdminBreadcrumbs from "@/components/layouts/AdminShell/components/AdminBreadcrumbs";
import AdminSidebar from "@/components/layouts/AdminShell/components/AdminSidebar";
import AdminTopbar from "@/components/layouts/AdminShell/components/AdminTopbar";
import { adminNavigationItems, adminShellContent } from "@/components/layouts/AdminShell/mockData";

type AdminShellProps = {
  children: React.ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);

  return (
    <Layout hasSider style={{ minHeight: "100dvh" }}>
      {/* Ẩn/hiện bằng class Tailwind thay vì breakpoint JS của Sider: tránh lệch giữa SSR và client. */}
      <Layout.Sider className="hidden lg:block" style={{ borderInlineEnd: "1px solid #e2e8f0", height: "100dvh", insetBlockStart: 0, position: "sticky" }} theme="light" width={258}>
        <AdminSidebar content={adminShellContent} items={adminNavigationItems} pathname={pathname} />
      </Layout.Sider>

      <Drawer
        classNames={{ body: "!p-0" }}
        onClose={() => setIsMobileNavigationOpen(false)}
        open={isMobileNavigationOpen}
        placement="left"
        title={null}
        width={258}
      >
        <AdminSidebar
          content={adminShellContent}
          items={adminNavigationItems}
          onNavigate={() => setIsMobileNavigationOpen(false)}
          pathname={pathname}
        />
      </Drawer>

      <Layout>
        <Layout.Header style={{ borderBlockEnd: "1px solid #e2e8f0", insetBlockStart: 0, position: "sticky", zIndex: 40 }}>
          <AdminTopbar content={adminShellContent} onMenuOpen={() => setIsMobileNavigationOpen(true)} />
        </Layout.Header>

        <Layout.Content className="!p-4 sm:!p-5 lg:!p-6">
          <AdminBreadcrumbs items={adminNavigationItems} pathname={pathname} />
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
