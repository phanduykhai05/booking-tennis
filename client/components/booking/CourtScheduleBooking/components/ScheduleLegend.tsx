import { Text, View } from "react-native";

import { slotStatusColor } from "@/components/booking/CourtScheduleBooking/components/slotStatusStyles";
import type { SlotStatus } from "@/components/booking/CourtScheduleBooking/types";

type ScheduleLegendProps = {
  labels: Record<SlotStatus, string>;
};

const legendOrder: SlotStatus[] = ["available", "booked", "locked", "event"];

export default function ScheduleLegend({ labels }: ScheduleLegendProps) {
  return (
    <View className="flex-row flex-wrap items-center gap-x-4 gap-y-2">
      {legendOrder.map((status) => (
        <View className="flex-row items-center gap-1.5" key={status}>
          <View
            className={`h-[18px] w-[18px] items-center justify-center rounded-[3px] ${status === "available" ? "border border-[#c8d5ce]" : ""}`}
            style={{ backgroundColor: slotStatusColor[status] }}
          >
            {status === "event" ? <Text className="text-[12px] font-bold text-white">!</Text> : null}
          </View>
          <Text className="text-[13px] text-white">{labels[status]}</Text>
        </View>
      ))}
    </View>
  );
}
