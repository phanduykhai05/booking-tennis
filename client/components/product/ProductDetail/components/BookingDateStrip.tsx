"use client";

import { useState } from "react";

type BookingDate = { date: string; day: string; id: string };

type BookingDateStripProps = { dates: BookingDate[] };

export default function BookingDateStrip({ dates }: BookingDateStripProps) {
  const [selectedDate, setSelectedDate] = useState("today");
  return (
    <nav aria-label="Chọn ngày đặt" className="flex gap-1 overflow-x-auto border-b border-[#e3e3e3] bg-white px-2 py-1.5 [scrollbar-width:none]">
      {dates.map((item) => {
        const active = item.id === selectedDate;
        return <button aria-pressed={active} className={`flex h-[31px] min-w-[51px] flex-1 flex-col items-center justify-center rounded-md border text-[11px] leading-3 ${active ? "border-[#008248] bg-[#007d45] font-bold text-white" : "border-[#e2e2e2] bg-white text-[#202124]"}`} key={item.id} onClick={() => setSelectedDate(item.id)} type="button"><span>{item.date}</span>{item.day && <span>{item.day}</span>}</button>;
      })}
    </nav>
  );
}
