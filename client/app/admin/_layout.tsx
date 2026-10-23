import { Outlet } from "react-router";

import AdminDataProvider from "@/components/admin/AdminData";
import AdminRouteGuard from "@/components/auth/AdminRouteGuard";
import AdminShell from "@/components/layouts/AdminShell";

export default function AdminLayout() {
  return (
    <AdminRouteGuard>
      <AdminDataProvider>
        <AdminShell>
          <Outlet />
        </AdminShell>
      </AdminDataProvider>
    </AdminRouteGuard>
  );
}
