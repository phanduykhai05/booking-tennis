import { useNavigate } from "react-router";
import { Calendar, CreditCard, LayoutDashboard, MapPin, Ticket, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import HeaderLogo from "@/components/layouts/PublicHeader/components/HeaderLogo";
import { adminHomeHref } from "@/components/layouts/AdminShell/mockData";
import type { AdminNavigationIcon, AdminNavigationItem, AdminShellContent } from "@/components/layouts/AdminShell/types";
import Touch from "@/components/ui/Pressable";

type AdminSidebarProps = {
  content: AdminShellContent;
  items: AdminNavigationItem[];
  onNavigate?: () => void;
  pathname: string;
};

const icons: Record<AdminNavigationIcon, LucideIcon> = {
  bookings: Calendar,
  courts: MapPin,
  customers: Users,
  dashboard: LayoutDashboard,
  events: Ticket,
  payments: CreditCard,
};

export default function AdminSidebar({ content, items, onNavigate, pathname }: AdminSidebarProps) {
  const navigate = useNavigate();

  return (
    <div className="h-full flex-1 bg-white">
      <div className="h-16 flex-row items-center gap-3 border-b border-slate-200 px-4">
        <HeaderLogo brandName={content.brandName} href={adminHomeHref} size={40} />
        <div className="min-w-0">
          <span className="text-[15px] font-bold text-slate-900">TennisHub</span>
          <span className="text-[11px] uppercase tracking-[1.5px] text-emerald-600">Admin Portal</span>
        </div>
      </div>

      <div aria-label={content.navigationLabel} className="flex-1 gap-1 px-2 py-3">
        {items.map((item) => {
          const Icon = icons[item.icon];
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Touch
              accessibilityRole="link"
              aria-current={isActive ? "page" : undefined}
              className={`h-[42px] flex-row items-center gap-3 rounded-[10px] px-3 ${isActive ? "bg-[#e8f6ee]" : ""}`}
              key={item.href}
              onPress={() => {
                onNavigate?.();
                navigate(item.href);
              }}
            >
              <Icon color={isActive ? "#0b7a4a" : "#64748b"} size={18} />
              <span className={`text-[15px] ${isActive ? "font-semibold text-[#0b7a4a]" : "text-slate-600"}`}>{item.label}</span>
            </Touch>
          );
        })}
      </div>

      <div className="border-t border-slate-200 p-4">
        <div className="rounded-xl bg-slate-50 p-3">
          <span className="text-[12px] font-bold text-slate-900">TennisHub Cầu Giấy</span>
          <span className="mt-1 text-[12px] text-slate-500">Dữ liệu lấy trực tiếp từ API quản trị.</span>
        </div>
      </div>
    </div>
  );
}
