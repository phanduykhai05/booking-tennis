import { Search, SlidersHorizontal } from "lucide-react";

import type {
  BookingCourt,
  BookingFilterState,
  BookingScheduleContent,
  BookingStatus,
} from "@/components/booking/BookingSchedule/types";

type BookingFiltersProps = {
  content: BookingScheduleContent;
  courts: BookingCourt[];
  filters: BookingFilterState;
  onChange: (filters: BookingFilterState) => void;
  statusOptions: BookingStatus[];
};

export default function BookingFilters({ content, courts, filters, onChange, statusOptions }: BookingFiltersProps) {
  const selectClassName = "h-10 min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15";

  return (
    <div aria-label={content.filterLabel} className="grid gap-2 sm:grid-cols-[minmax(220px,1fr)_180px_180px]" role="search">
      <label className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/15">
        <Search aria-hidden="true" className="size-4 shrink-0 text-slate-400" />
        <span className="sr-only">{content.searchLabel}</span>
        <input
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          placeholder={content.searchPlaceholder}
          type="search"
          value={filters.query}
        />
      </label>

      <label className="relative min-w-0">
        <span className="sr-only">{content.statusFilterLabel}</span>
        <SlidersHorizontal aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <select
          className={`${selectClassName} w-full pl-9`}
          onChange={(event) => onChange({ ...filters, status: event.target.value as BookingFilterState["status"] })}
          value={filters.status}
        >
          <option value="all">{content.allStatusesLabel}</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>{content.bookingStatusLabels[status]}</option>
          ))}
        </select>
      </label>

      <label className="min-w-0">
        <span className="sr-only">{content.courtFilterLabel}</span>
        <select
          className={`${selectClassName} w-full`}
          onChange={(event) => onChange({ ...filters, courtId: event.target.value })}
          value={filters.courtId}
        >
          <option value="all">{content.allCourtsLabel}</option>
          {courts.map((court) => <option key={court.id} value={court.id}>{court.name}</option>)}
        </select>
      </label>
    </div>
  );
}
