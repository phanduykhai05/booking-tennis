import { ChevronRight } from "lucide-react";
import Image from "next/image";

import images from "@/components/assets/images";
import type { DashboardItem } from "@/components/account/AccountDashboard/types";

const icons: Record<DashboardItem["icon"], typeof images.alobo.icons.home> = { calendar: images.alobo.icons.calendar, graduation: images.alobo.icons.profileClass, group: images.alobo.icons.profileGroup, member: images.alobo.icons.profileMembership, settings: images.alobo.icons.profileSetting, version: images.alobo.icons.profileInfo };
type DashboardListProps = { items: DashboardItem[] };

export default function DashboardList({ items }: DashboardListProps) {
  return <div className="overflow-hidden rounded-xl bg-white">{items.map((item, index) => { const icon = icons[item.icon]; return <button className={`flex h-[45px] w-full items-center gap-3 px-3 text-left transition hover:bg-[#f3fbf7] ${index + 1 < items.length ? "border-b border-[#edf0ee]" : ""}`} key={item.id} type="button"><Image alt="" className="size-5 object-contain" src={icon} /><span className="flex-1 text-sm text-[#4e5154]">{item.label}</span><ChevronRight aria-hidden="true" className="text-[#373c3a]" size={18} /></button>; })}</div>;
}
