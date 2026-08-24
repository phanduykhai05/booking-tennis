import { Check } from "lucide-react-native";

import { scheduleLayout } from "@/components/booking/CourtScheduleBooking/components/scheduleLayout";
import { selectedSlotColor, slotStatusColor } from "@/components/booking/CourtScheduleBooking/components/slotStatusStyles";
import type { SlotStatus } from "@/components/booking/CourtScheduleBooking/types";
import Touch from "@/components/ui/Pressable";

type ScheduleSlotCellProps = {
  isSelected: boolean;
  label: string;
  onSelect: () => void;
  status: SlotStatus;
};

export default function ScheduleSlotCell({ isSelected, label, onSelect, status }: ScheduleSlotCellProps) {
  return (
    <Touch
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      className="h-full shrink-0 items-center justify-center border-r border-[#e2ebe6]"
      disabled={status !== "available"}
      onPress={onSelect}
      style={{
        backgroundColor: isSelected ? selectedSlotColor : slotStatusColor[status],
        width: scheduleLayout.slotWidth,
      }}
    >
      {isSelected ? <Check color="#ffffff" size={16} strokeWidth={3} /> : null}
    </Touch>
  );
}
