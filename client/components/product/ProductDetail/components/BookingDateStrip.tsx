import Link from "next/link";

import type { BookingDateItem } from "@/components/product/ProductDetail/types";

type BookingDateStripProps = { dates: BookingDateItem[] };

export default function BookingDateStrip({ dates }: BookingDateStripProps) {
  return (
    <nav aria-label="Chọn ngày đặt" className="flex gap-1 overflow-x-auto border-b border-[#e3e3e3] bg-white px-2 py-1.5 [scrollbar-width:none]">
      {dates.map((item, index) => (
        <Link className={`flex h-[31px] min-w-[51px] flex-1 flex-col items-center justify-center rounded-md border text-[11px] leading-3 ${index === 0 ? "border-[#008248] bg-[#007d45] font-bold text-white" : "border-[#e2e2e2] bg-white text-[#202124]"}`} href={item.href} key={item.id}>
          <span>{item.date}</span>
          {item.day && <span>{item.day}</span>}
        </Link>
      ))}
    </nav>
  );
}
