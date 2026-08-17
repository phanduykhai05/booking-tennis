import { CalendarDays } from "lucide-react";

type DateFilterProps = {
  allDatesLabel: string;
};

export default function DateFilter({ allDatesLabel }: DateFilterProps) {
  return (
    <label className="relative block w-[178px]">
      <span className="sr-only">Lọc lịch đặt theo ngày</span>
      <select className="h-[39px] w-full appearance-none rounded border border-[#008447] bg-white pl-4 pr-11 text-[14px] text-[#064b30] outline-none transition focus:ring-2 focus:ring-[#008447]/20" defaultValue="all">
        <option value="all">{allDatesLabel}</option>
      </select>
      <CalendarDays aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#006d3d]" size={17} strokeWidth={2} />
    </label>
  );
}
