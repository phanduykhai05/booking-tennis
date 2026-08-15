import { CalendarCheck2, MapPin, PanelsTopLeft } from "lucide-react";

import type { BookingScheduleContent } from "@/components/booking/BookingSchedule/types";
import HeaderLogo from "@/components/layouts/PublicHeader/components/HeaderLogo";

type BookingHeaderProps = {
  activeCourtCount: number;
  bookingCount: number;
  content: BookingScheduleContent;
  dateLabel: string;
};

export default function BookingHeader({ activeCourtCount, bookingCount, content, dateLabel }: BookingHeaderProps) {
  return (
    <header className="overflow-hidden bg-[#0f9b58] text-white shadow-[0_10px_30px_-18px_rgba(3,52,32,0.9)]">
      <div className="mx-auto flex w-full max-w-[1275px] flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-6">
        <div className="flex min-w-0 items-center gap-4">
          <HeaderLogo brandName={content.venueName} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-emerald-100">{content.venueName}</p>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight sm:text-3xl">{content.title}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-emerald-50/85 sm:text-sm">
              <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
              <span className="truncate">{content.locationLabel}</span>
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-2 sm:w-fit sm:min-w-[430px]">
          <div className="rounded-xl bg-white/12 px-3 py-2.5 ring-1 ring-white/15 backdrop-blur-sm">
            <dt className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-50/80 sm:text-xs">
              <CalendarCheck2 aria-hidden="true" className="size-3.5" />
              {content.totalBookingsLabel}
            </dt>
            <dd className="mt-1 text-xl font-bold">{bookingCount}</dd>
          </div>
          <div className="rounded-xl bg-white/12 px-3 py-2.5 ring-1 ring-white/15 backdrop-blur-sm">
            <dt className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-50/80 sm:text-xs">
              <PanelsTopLeft aria-hidden="true" className="size-3.5" />
              {content.totalCourtsLabel}
            </dt>
            <dd className="mt-1 text-xl font-bold">{activeCourtCount}</dd>
          </div>
          <div className="rounded-xl bg-white/12 px-3 py-2.5 ring-1 ring-white/15 backdrop-blur-sm">
            <dt className="text-[11px] font-medium text-emerald-50/80 sm:text-xs">{content.dateLabel}</dt>
            <dd className="mt-1 line-clamp-2 text-xs font-bold leading-4 sm:text-sm">{dateLabel}</dd>
          </div>
        </dl>
      </div>
    </header>
  );
}
