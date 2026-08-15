import type { Booking, Court, Venue } from "@/components/admin/AdminData/types";
import { getCourtUtilization } from "@/components/admin/AdminData/selectors";

type CourtUtilizationPanelProps = {
  bookings: Booking[];
  courts: Court[];
  date: string;
  venue: Venue;
};

export default function CourtUtilizationPanel({ bookings, courts, date, venue }: CourtUtilizationPanelProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_28px_-24px_rgba(15,23,42,0.55)] sm:p-5">
      <h2 className="text-base font-bold text-slate-900">Công suất theo sân</h2>
      <p className="mt-0.5 text-xs text-slate-500">Tỷ lệ thời gian được đặt trong ngày 15/08/2026</p>
      <div className="mt-5 space-y-4">
        {courts.map((court) => {
          const utilization = getCourtUtilization(court, bookings, date, venue.openingMinute, venue.closingMinute);
          return (
            <div key={court.id}>
              <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-slate-700">{court.name}</span>
                <span className="font-bold text-slate-500">{utilization}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${utilization}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
