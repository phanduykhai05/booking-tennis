import { Flame, House, MapPinned, Newspaper, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import type { BottomNavigationIcon, BottomNavigationItem } from "@/components/layouts/PublicFooter/types";

type BottomNavigationProps = {
  ariaLabel: string;
  items: BottomNavigationItem[];
};

// Khớp đúng bộ icon alobo dùng (đối chiếu path trong assets/icons/*.svg của họ).
const icons: Record<BottomNavigationIcon, LucideIcon> = {
  account: User,
  discover: Newspaper,
  home: House,
  map: MapPinned,
  popular: Flame,
};

type BottomNavigationEntryProps = {
  item: BottomNavigationItem;
};

function PrimaryEntry({ item }: BottomNavigationEntryProps) {
  const Icon = icons[item.icon];

  return (
    <Link
      className="group flex min-w-0 flex-1 flex-col items-center gap-1 whitespace-nowrap text-xs font-medium text-[#616161] transition-colors duration-200 hover:text-[#22c55e] focus-visible:outline-none"
      href={item.href}
    >
      <span className="relative -mt-9 flex size-[58px] items-center justify-center">
        {/* Đĩa trắng đồng tâm, cùng màu đặc với thanh nav nên hoà vào nhau thành vòm. */}
        <span aria-hidden="true" className="absolute -inset-[10px] rounded-full bg-white" />
        <span className="relative flex size-full items-center justify-center rounded-full border-2 border-[#22c55e] bg-white text-[#22c55e] shadow-[0_4px_14px_-5px_rgba(34,197,94,0.6)] transition-transform duration-200 group-hover:-translate-y-0.5 group-active:scale-95">
          <Icon className="size-7" strokeWidth={1.5} />
        </span>
      </span>
      <span>{item.label}</span>
    </Link>
  );
}

function StandardEntry({ item }: BottomNavigationEntryProps) {
  const Icon = icons[item.icon];

  return (
    <Link
      className={`group flex min-w-0 flex-1 flex-col items-center gap-1 whitespace-nowrap text-xs transition-colors duration-200 focus-visible:outline-none ${item.isActive ? "font-semibold text-[#16a34a]" : "font-medium text-[#616161] hover:text-slate-900"}`}
      href={item.href}
    >
      <span className="flex h-7 items-center justify-center">
        <Icon
          className="size-6 transition-transform duration-200 group-hover:-translate-y-0.5"
          fill={item.isActive ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      </span>
      <span>{item.label}</span>
    </Link>
  );
}

export default function BottomNavigation({ ariaLabel, items }: BottomNavigationProps) {
  return (
    // bg-white đặc (không dùng /95 hay blur): đĩa vòm chồng lên nền nav sẽ lộ vệt tròn nếu nền trong suốt.
    <nav aria-label={ariaLabel} className="h-[70px] w-full rounded-t-[22px] bg-white shadow-[0_-8px_24px_-12px_rgba(3,52,32,0.3)]">
      {/* Giới hạn bề ngang cụm mục để trên desktop chúng không dạt ra hai mép màn hình. */}
      <div className="mx-auto flex h-full w-full max-w-[480px] items-center px-2 sm:px-4">
        {items.map((item) => (item.isPrimary ? <PrimaryEntry item={item} key={item.id} /> : <StandardEntry item={item} key={item.id} />))}
      </div>
    </nav>
  );
}
