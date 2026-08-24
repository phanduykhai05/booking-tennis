import { Slot } from "expo-router";

import AdminDataProvider from "@/components/admin/AdminData";
import AdminRouteGuard from "@/components/auth/AdminRouteGuard";
import AdminShell from "@/components/layouts/AdminShell";

export default function AdminLayout() {
  return (
    <AdminRouteGuard>
      <AdminDataProvider>
        <AdminShell>
          <Slot />
        </AdminShell>
      </AdminDataProvider>
    </AdminRouteGuard>
  );
}
