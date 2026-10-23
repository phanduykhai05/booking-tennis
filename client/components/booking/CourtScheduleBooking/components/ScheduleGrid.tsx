import { forwardRef, useImperativeHandle, useRef } from "react";

import { leadColumnWidth, scheduleLayout } from "@/components/booking/CourtScheduleBooking/components/scheduleLayout";
import ScheduleSlotCell from "@/components/booking/CourtScheduleBooking/components/ScheduleSlotCell";
import type {
  CourtScheduleContent,
  ScheduleCourtGroup,
  ScheduleEntry,
} from "@/components/booking/CourtScheduleBooking/types";
import { findEntry, formatMinutes, getSlotStatus, slotKey } from "@/components/booking/CourtScheduleBooking/utils";

export type ScheduleGridHandle = {
  /** Nhảy tới vị trí cuộn theo tỉ lệ 0–1 của phần cuộn được. */
  seek: (ratio: number) => void;
};

type ScheduleGridProps = {
  content: CourtScheduleContent;
  entries: ScheduleEntry[];
  groups: ScheduleCourtGroup[];
  onScrollRatioChange: (ratio: number) => void;
  onSlotToggle: (courtId: string, startMinute: number) => void;
  selectedKeys: string[];
  slotMinutes: number;
  timeSlots: number[];
};

/**
 * Cột nhóm và cột sân nằm ngoài vùng cuộn ngang (không dùng `position: sticky`),
 * nên tên sân luôn thấy được khi kéo phần giờ sang phải. Hai bên dùng chung
 * `scheduleLayout.rowHeight` để các dòng luôn khớp nhau.
 */
const ScheduleGrid = forwardRef<ScheduleGridHandle, ScheduleGridProps>(function ScheduleGrid(
  { content, entries, groups, onScrollRatioChange, onSlotToggle, selectedKeys, slotMinutes, timeSlots },
  ref,
) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const courts = groups.flatMap((group) => group.courts);

  // Phần cuộn được = bề rộng nội dung trừ bề rộng khung nhìn; DOM đo sẵn nên đọc thẳng lúc cần.
  useImperativeHandle(ref, () => ({
    seek: (ratio: number) => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollTo({ behavior: "auto", left: Math.max(el.scrollWidth - el.clientWidth, 0) * ratio });
    },
  }));

  return (
    <div className="flex-row border-y border-[#cfe6d8] bg-white">
      <div style={{ width: leadColumnWidth }}>
        <div
          className="items-center justify-center border-r border-[#9fd2e8] bg-[#c9e9f6]"
          style={{ height: scheduleLayout.timeHeaderHeight }}
        >
          <span className="text-[12px] font-semibold text-[#0e4a63]">{content.timeColumnLabel}</span>
        </div>

        {groups.map((group) => (
          <div className="flex-row" key={group.id}>
            <div
              className="items-center justify-center border-r border-[#cfe6d8] bg-[#e2f4e9] px-1"
              style={{ width: scheduleLayout.groupColumnWidth }}
            >
              <span className="text-center text-[12px] font-semibold text-[#0b5133] [overflow-wrap:anywhere]">{group.name}</span>
            </div>
            <div style={{ width: scheduleLayout.courtColumnWidth }}>
              {group.courts.map((court) => (
                <div
                  className="items-center justify-center border-b border-[#dbe7e0] bg-[#eefaf3] px-1"
                  key={court.id}
                  style={{ height: scheduleLayout.rowHeight }}
                >
                  <span className="text-center text-[12px] font-medium text-[#123f2c]">{court.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="grow shrink flex-row overflow-x-auto overflow-y-hidden [scrollbar-width:none]"
        onScroll={(event) => {
          const { clientWidth, scrollLeft, scrollWidth } = event.currentTarget;
          const maxScroll = Math.max(scrollWidth - clientWidth, 0);
          onScrollRatioChange(maxScroll === 0 ? 0 : scrollLeft / maxScroll);
        }}
        ref={scrollRef}
      >
        <div style={{ width: timeSlots.length * scheduleLayout.slotWidth }}>
          <div className="flex-row bg-[#c9e9f6]" style={{ height: scheduleLayout.timeHeaderHeight }}>
            {timeSlots.map((startMinute) => (
              <div
                className="shrink-0 items-center justify-center border-l border-[#e9a71f]"
                key={startMinute}
                style={{ width: scheduleLayout.slotWidth }}
              >
                <span className="text-[11px] font-medium text-[#123028]">{formatMinutes(startMinute)}</span>
              </div>
            ))}
          </div>

          {courts.map((court) => (
            <div
              className="flex-row border-b border-[#dbe7e0]"
              key={court.id}
              style={{ height: scheduleLayout.rowHeight }}
            >
              {timeSlots.map((startMinute) => {
                const endMinute = startMinute + slotMinutes;
                const entry = findEntry(entries, court.id, startMinute, endMinute);
                const status = getSlotStatus(entry);
                const timeRange = `${formatMinutes(startMinute)} - ${formatMinutes(endMinute)}`;

                return (
                  <ScheduleSlotCell
                    isSelected={selectedKeys.includes(slotKey(court.id, startMinute))}
                    key={startMinute}
                    label={`${court.name} ${timeRange}, ${content.slotStatusLabels[status]}`}
                    onSelect={() => onSlotToggle(court.id, startMinute)}
                    status={status}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ScheduleGrid;
