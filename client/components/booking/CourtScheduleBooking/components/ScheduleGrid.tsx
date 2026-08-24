import { forwardRef, useImperativeHandle, useRef } from "react";
import { ScrollView, Text, View } from "react-native";

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
 * Cột nhóm và cột sân nằm ngoài vùng cuộn ngang (RN không có `position: sticky`),
 * nên tên sân luôn thấy được khi kéo phần giờ sang phải. Hai bên dùng chung
 * `scheduleLayout.rowHeight` để các dòng luôn khớp nhau.
 */
const ScheduleGrid = forwardRef<ScheduleGridHandle, ScheduleGridProps>(function ScheduleGrid(
  { content, entries, groups, onScrollRatioChange, onSlotToggle, selectedKeys, slotMinutes, timeSlots },
  ref,
) {
  const scrollRef = useRef<ScrollView>(null);
  // Phần cuộn được = bề rộng nội dung trừ bề rộng khung nhìn; chỉ biết sau khi đo xong.
  const maxScrollRef = useRef(0);
  const courts = groups.flatMap((group) => group.courts);

  useImperativeHandle(ref, () => ({
    seek: (ratio: number) => {
      scrollRef.current?.scrollTo({ animated: false, x: maxScrollRef.current * ratio });
    },
  }));

  return (
    <View className="flex-row border-y border-[#cfe6d8] bg-white">
      <View style={{ width: leadColumnWidth }}>
        <View
          className="items-center justify-center border-r border-[#9fd2e8] bg-[#c9e9f6]"
          style={{ height: scheduleLayout.timeHeaderHeight }}
        >
          <Text className="text-[12px] font-semibold text-[#0e4a63]">{content.timeColumnLabel}</Text>
        </View>

        {groups.map((group) => (
          <View className="flex-row" key={group.id}>
            <View
              className="items-center justify-center border-r border-[#cfe6d8] bg-[#e2f4e9] px-1"
              style={{ width: scheduleLayout.groupColumnWidth }}
            >
              <Text className="text-center text-[12px] font-semibold text-[#0b5133]">{group.name}</Text>
            </View>
            <View style={{ width: scheduleLayout.courtColumnWidth }}>
              {group.courts.map((court) => (
                <View
                  className="items-center justify-center border-b border-[#dbe7e0] bg-[#eefaf3] px-1"
                  key={court.id}
                  style={{ height: scheduleLayout.rowHeight }}
                >
                  <Text className="text-center text-[12px] font-medium text-[#123f2c]">{court.name}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <ScrollView
        horizontal
        onLayout={(event) => {
          maxScrollRef.current = Math.max(
            timeSlots.length * scheduleLayout.slotWidth - event.nativeEvent.layout.width,
            0,
          );
        }}
        onScroll={(event) => {
          const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
          maxScrollRef.current = Math.max(contentSize.width - layoutMeasurement.width, 0);
          onScrollRatioChange(maxScrollRef.current === 0 ? 0 : contentOffset.x / maxScrollRef.current);
        }}
        ref={scrollRef}
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ width: timeSlots.length * scheduleLayout.slotWidth }}>
          <View className="flex-row bg-[#c9e9f6]" style={{ height: scheduleLayout.timeHeaderHeight }}>
            {timeSlots.map((startMinute) => (
              <View
                className="shrink-0 items-center justify-center border-l border-[#e9a71f]"
                key={startMinute}
                style={{ width: scheduleLayout.slotWidth }}
              >
                <Text className="text-[11px] font-medium text-[#123028]">{formatMinutes(startMinute)}</Text>
              </View>
            ))}
          </View>

          {courts.map((court) => (
            <View
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
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
});

export default ScheduleGrid;
