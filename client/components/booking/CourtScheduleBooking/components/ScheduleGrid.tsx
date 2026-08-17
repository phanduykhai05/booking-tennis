"use client";

import type { RefObject } from "react";

import { leadColumnWidth, scheduleLayout } from "@/components/booking/CourtScheduleBooking/components/scheduleLayout";
import ScheduleCourtRow from "@/components/booking/CourtScheduleBooking/components/ScheduleCourtRow";
import ScheduleTimeHeader from "@/components/booking/CourtScheduleBooking/components/ScheduleTimeHeader";
import type {
  CourtScheduleContent,
  ScheduleCourtGroup,
  ScheduleEntry,
  SchedulePriceRule,
} from "@/components/booking/CourtScheduleBooking/types";

type ScheduleGridProps = {
  content: CourtScheduleContent;
  entries: ScheduleEntry[];
  groups: ScheduleCourtGroup[];
  onSlotToggle: (courtId: string, startMinute: number) => void;
  priceRules: SchedulePriceRule[];
  scrollRef: RefObject<HTMLDivElement | null>;
  selectedKeys: string[];
  slotMinutes: number;
  timeSlots: number[];
};

export default function ScheduleGrid({ content, entries, groups, onSlotToggle, priceRules, scrollRef, selectedKeys, slotMinutes, timeSlots }: ScheduleGridProps) {
  return (
    // Chỉ khung lưới cuộn ngang; cột nhóm và cột sân dính trái nên luôn nhìn thấy tên sân khi kéo giờ.
    <div className="overflow-x-auto overscroll-x-contain border-y border-[#cfe6d8] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" ref={scrollRef}>
      <div style={{ minWidth: leadColumnWidth + timeSlots.length * scheduleLayout.slotWidth }}>
        <ScheduleTimeHeader timeLabel={content.timeColumnLabel} timeSlots={timeSlots} />

        {groups.map((group) => (
          <div className="flex border-b border-[#bcdcc9] last:border-b-0" key={group.id}>
            <div
              className="sticky left-0 z-30 flex shrink-0 items-center justify-center border-r border-[#cfe6d8] bg-[#e2f4e9] px-1 text-center text-[12px] font-semibold text-[#0b5133]"
              style={{ width: scheduleLayout.groupColumnWidth }}
            >
              {group.name}
            </div>

            <div className="flex-1">
              {group.courts.map((court) => (
                <ScheduleCourtRow
                  content={content}
                  court={court}
                  entries={entries}
                  key={court.id}
                  onSlotToggle={onSlotToggle}
                  priceRules={priceRules}
                  selectedKeys={selectedKeys}
                  slotMinutes={slotMinutes}
                  timeSlots={timeSlots}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
