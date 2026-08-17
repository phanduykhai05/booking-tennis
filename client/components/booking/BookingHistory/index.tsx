import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import DateFilter from "@/components/booking/BookingHistory/components/DateFilter";
import { bookingHistoryContent } from "@/components/booking/BookingHistory/mockData";

export default function BookingHistory() {
  return (
    <main className="flex min-h-[100dvh] flex-col bg-white">
      <header className="relative flex h-[59px] shrink-0 items-center justify-center bg-[linear-gradient(100deg,#007346,#00ae58)] text-white shadow-sm">
        <Link aria-label="Quay lại trang tài khoản" className="absolute left-5 rounded p-1 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" href="/account">
          <ArrowLeft aria-hidden="true" size={21} strokeWidth={2.6} />
        </Link>
        <h1 className="text-[17px] font-bold">{bookingHistoryContent.title}</h1>
      </header>
      <div className="flex justify-end px-[10px] pt-[9px]">
        <DateFilter allDatesLabel={bookingHistoryContent.allDates} />
      </div>
      <section aria-label={bookingHistoryContent.title} className="flex flex-1 items-center justify-center pb-24">
        <p className="text-[14px] text-[#064b30]">{bookingHistoryContent.emptyMessage}</p>
      </section>
    </main>
  );
}
