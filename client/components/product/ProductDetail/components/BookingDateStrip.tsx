import { Link } from "react-router";

import type { BookingDateItem } from "@/components/product/ProductDetail/types";

type BookingDateStripProps = {
  dates: BookingDateItem[];
};

export default function BookingDateStrip({ dates }: BookingDateStripProps) {
  return (
    <div
      aria-label="Chọn ngày đặt"
      className="grow shrink flex-row overflow-x-auto overflow-y-hidden [scrollbar-width:none] border-b border-[#e3e3e3] bg-white"
    >
      <div className="flex-row gap-1 px-2 py-1.5">
        {dates.map((item, index) => (
          <Link
            className={`flex h-[31px] min-w-[51px] shrink-0 flex-col items-center justify-center rounded-md border px-2 active:opacity-70 ${index === 0 ? "border-[#008248] bg-[#007d45]" : "border-[#e2e2e2] bg-white"}`}
            key={item.id}
            to={item.href}
          >
            <span className={`text-[11px] leading-3 ${index === 0 ? "font-bold text-white" : "text-[#202124]"}`}>{item.date}</span>
            {item.day ? (
              <span className={`text-[11px] leading-3 ${index === 0 ? "font-bold text-white" : "text-[#202124]"}`}>{item.day}</span>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
