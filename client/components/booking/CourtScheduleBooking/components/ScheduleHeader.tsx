import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import ScheduleDatePicker from "@/components/booking/CourtScheduleBooking/components/ScheduleDatePicker";
import ScheduleLegend from "@/components/booking/CourtScheduleBooking/components/ScheduleLegend";
import type { CourtScheduleContent } from "@/components/booking/CourtScheduleBooking/types";

type ScheduleHeaderProps = {
  backHref: string;
  content: CourtScheduleContent;
  date: string;
  onDateChange: (date: string) => void;
  onPriceListOpen: () => void;
  venueName: string;
};

export default function ScheduleHeader({ backHref, content, date, onDateChange, onPriceListOpen, venueName }: ScheduleHeaderProps) {
  return (
    <header className="bg-[linear-gradient(160deg,#0b6b3e,#0a5c36)] pb-3 text-white">
      <div className="relative flex h-[52px] items-center justify-center px-12">
        <Link aria-label={content.backLabel} className="absolute left-3 rounded p-1 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" href={backHref}>
          <ArrowLeft aria-hidden="true" size={21} strokeWidth={2.6} />
        </Link>
        <h1 className="truncate text-[16px] font-bold uppercase">{content.title}</h1>
      </div>

      <div className="flex items-center justify-between gap-3 px-3 pb-3">
        <p className="min-w-0 truncate text-[14px] font-semibold text-white/90">{venueName}</p>
        <ScheduleDatePicker label={content.datePickerLabel} onChange={onDateChange} value={date} />
      </div>

      <div className="px-3">
        <ScheduleLegend labels={content.slotStatusLabels} />
        <button className="mt-3 text-[14px] font-semibold text-[#ffe141] underline underline-offset-2" onClick={onPriceListOpen} type="button">
          {content.priceListLabel}
        </button>
      </div>
    </header>
  );
}
