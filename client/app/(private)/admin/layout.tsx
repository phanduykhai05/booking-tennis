import { AntdRegistry } from "@ant-design/nextjs-registry";

import AdminDataProvider from "@/components/admin/AdminData";
import AdminTheme from "@/components/admin/AdminTheme";
import AdminRouteGuard from "@/components/auth/AdminRouteGuard";
import AdminShell from "@/components/layouts/AdminShell";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  // layer: đẩy CSS-in-JS của antd vào @layer antd đã khai báo thứ tự trong globals.css.
  return (
    <AntdRegistry layer>
      <AdminRouteGuard>
        <AdminTheme>
          <AdminDataProvider>
            <AdminShell>{children}</AdminShell>
          </AdminDataProvider>
        </AdminTheme>
      </AdminRouteGuard>
    </AntdRegistry>
  );
}
