import { ChevronRight, House } from "lucide-react";
import Link from "next/link";

import type { AdminNavigationItem } from "@/components/layouts/AdminShell/types";

type AdminBreadcrumbsProps = {
  items: AdminNavigationItem[];
  pathname: string;
};

export default function AdminBreadcrumbs({ items, pathname }: AdminBreadcrumbsProps) {
  const currentItem = items.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));

  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs font-medium text-slate-400">
      <Link aria-label="Tổng quan" className="transition-colors hover:text-emerald-600" href="/dashboard">
        <House aria-hidden="true" className="size-3.5" />
      </Link>
      <ChevronRight aria-hidden="true" className="size-3.5" />
      <span className="text-slate-600">{currentItem?.label ?? "Quản trị"}</span>
    </nav>
  );
}
