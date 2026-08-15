import { CalendarRange, CreditCard, LayoutDashboard, MapPinned, UsersRound, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import HeaderLogo from "@/components/layouts/PublicHeader/components/HeaderLogo";
import type { AdminNavigationIcon, AdminNavigationItem, AdminShellContent } from "@/components/layouts/AdminShell/types";

type AdminSidebarProps = {
  content: AdminShellContent;
  isMobile?: boolean;
  items: AdminNavigationItem[];
  onClose?: () => void;
  pathname: string;
};

const icons: Record<AdminNavigationIcon, LucideIcon> = {
  bookings: CalendarRange,
  courts: MapPinned,
  customers: UsersRound,
  dashboard: LayoutDashboard,
  payments: CreditCard,
};

export default function AdminSidebar({ content, isMobile = false, items, onClose, pathname }: AdminSidebarProps) {
  return (
    <aside className={`flex h-full w-[258px] shrink-0 flex-col border-r border-slate-200 bg-white ${isMobile ? "shadow-2xl" : ""}`}>
      <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-4">
        <div className="flex min-w-0 items-center gap-3">
          <HeaderLogo brandName={content.brandName} href="/dashboard" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">TennisHub</p>
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-600">Admin Portal</p>
          </div>
        </div>
        {isMobile && (
          <button aria-label="Đóng menu" className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100" onClick={onClose} type="button">
            <X aria-hidden="true" className="size-5" />
          </button>
        )}
      </div>

      <nav aria-label={content.navigationLabel} className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Quản lý vận hành</p>
        {items.map((item) => {
          const Icon = icons[item.icon];
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}
              href={item.href}
              key={item.id}
              onClick={onClose}
            >
              <Icon aria-hidden="true" className="size-[18px] shrink-0" strokeWidth={isActive ? 2.2 : 1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs font-bold text-slate-700">TennisHub Cầu Giấy</p>
          <p className="mt-1 text-[11px] leading-4 text-slate-500">Dữ liệu đang chạy ở chế độ mô phỏng.</p>
        </div>
      </div>
    </aside>
  );
}
