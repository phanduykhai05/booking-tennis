import { CalendarDays, ChevronRight, Globe2, Info, RefreshCw, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import type { AccountMenuIcon, AccountMenuItem } from "@/components/account/AccountOverview/types";

type AccountMenuListProps = {
  items: AccountMenuItem[];
};

const icons: Record<AccountMenuIcon, LucideIcon> = {
  calendar: CalendarDays,
  info: Info,
  language: Globe2,
  refresh: RefreshCw,
  shield: ShieldCheck,
};

export default function AccountMenuList({ items }: AccountMenuListProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-white">
      {items.map((item, index) => {
        const Icon = icons[item.icon];
        const isLastItem = index === items.length - 1;

        const className = `flex h-[45px] w-full items-center gap-3 px-3 text-left transition hover:bg-[#f2fbf6] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#008447] ${isLastItem ? "" : "border-b border-[#edf0ee]"}`;
        const content = <>
            <Icon aria-hidden="true" className="shrink-0 text-[#007c43]" size={20} strokeWidth={1.7} />
            <span className="min-w-0 flex-1 text-sm text-[#4e5154]">{item.label}</span>
            <ChevronRight aria-hidden="true" className="shrink-0 text-[#303438]" size={18} strokeWidth={1.5} />
          </>;

        return item.href ? <Link className={className} href={item.href} key={item.id}>{content}</Link> : <button className={className} key={item.id} type="button">{content}</button>;
      })}
    </div>
  );
}
