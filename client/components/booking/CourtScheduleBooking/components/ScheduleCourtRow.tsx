"use client";

import { scheduleLayout } from "@/components/booking/CourtScheduleBooking/components/scheduleLayout";
import ScheduleSlotCell from "@/components/booking/CourtScheduleBooking/components/ScheduleSlotCell";
import type {
  CourtScheduleContent,
  ScheduleCourt,
  ScheduleEntry,
  SchedulePriceRule,
} from "@/components/booking/CourtScheduleBooking/types";
import {
  findEntry,
  formatCurrency,
  formatMinutes,
  getSlotPrice,
  getSlotStatus,
  slotKey,
} from "@/components/booking/CourtScheduleBooking/utils";

type ScheduleCourtRowProps = {
  content: CourtScheduleContent;
  court: ScheduleCourt;
  entries: ScheduleEntry[];
  onSlotToggle: (courtId: string, startMinute: number) => void;
  priceRules: SchedulePriceRule[];
  selectedKeys: string[];
  slotMinutes: number;
  timeSlots: number[];
};

export default function ScheduleCourtRow({ content, court, entries, onSlotToggle, priceRules, selectedKeys, slotMinutes, timeSlots }: ScheduleCourtRowProps) {
  return (
    <div className="flex border-b border-[#dbe7e0] last:border-b-0" style={{ height: scheduleLayout.rowHeight }}>
      <div
        className="sticky z-20 flex shrink-0 items-center justify-center border-r border-[#cfe6d8] bg-[#eefaf3] px-1 text-center text-[12px] font-medium text-[#123f2c]"
        style={{ left: scheduleLayout.groupColumnWidth, width: scheduleLayout.courtColumnWidth }}
      >
        {court.name}
      </div>

      {timeSlots.map((startMinute) => {
        const endMinute = startMinute + slotMinutes;
        const entry = findEntry(entries, court.id, startMinute, endMinute);
        const status = getSlotStatus(entry);
        const statusLabel = content.slotStatusLabels[status];
        const timeRange = `${formatMinutes(startMinute)} - ${formatMinutes(endMinute)}`;

        return (
          <ScheduleSlotCell
            isSelected={selectedKeys.includes(slotKey(court.id, startMinute))}
            key={startMinute}
            label={`${court.name} ${timeRange}, ${statusLabel}`}
            onSelect={() => onSlotToggle(court.id, startMinute)}
            status={status}
            tooltip={entry ? `${statusLabel} · ${entry.title}` : `${statusLabel} · ${formatCurrency(getSlotPrice(priceRules, startMinute, slotMinutes))}`}
          />
        );
      })}
    </div>
  );
}
