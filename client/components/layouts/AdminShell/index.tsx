"use client";

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
    <div className="flex min-h-dvh bg-[#f5f7f9] text-slate-900">
      <div className="sticky top-0 hidden h-dvh lg:block">
        <AdminSidebar content={adminShellContent} items={adminNavigationItems} pathname={pathname} />
      </div>

      {isMobileNavigationOpen && (
        <div className="fixed inset-0 z-[1300] lg:hidden">
          <button aria-label="Đóng menu" className="absolute inset-0 bg-slate-950/35 backdrop-blur-[2px]" onClick={() => setIsMobileNavigationOpen(false)} type="button" />
          <div className="relative h-full w-fit">
            <AdminSidebar content={adminShellContent} isMobile items={adminNavigationItems} onClose={() => setIsMobileNavigationOpen(false)} pathname={pathname} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar content={adminShellContent} onMenuOpen={() => setIsMobileNavigationOpen(true)} />
        <main className="min-w-0 flex-1 px-3 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
          <AdminBreadcrumbs items={adminNavigationItems} pathname={pathname} />
          {children}
        </main>
      </div>
    </div>
  );
}
