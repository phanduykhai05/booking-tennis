import { slotStatusStyles } from "@/components/booking/CourtScheduleBooking/components/slotStatusStyles";
import type { SlotStatus } from "@/components/booking/CourtScheduleBooking/types";

type ScheduleLegendProps = {
  labels: Record<SlotStatus, string>;
};

const legendOrder: SlotStatus[] = ["available", "booked", "locked", "event"];

export default function ScheduleLegend({ labels }: ScheduleLegendProps) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-white">
      {legendOrder.map((status) => (
        <li className="flex items-center gap-1.5" key={status}>
          <span aria-hidden="true" className={`flex size-[18px] items-center justify-center rounded-[3px] text-[12px] font-bold text-white ${slotStatusStyles[status].swatch}`}>
            {status === "event" ? "!" : ""}
          </span>
          {labels[status]}
        </li>
      ))}
    </ul>
  );
}
