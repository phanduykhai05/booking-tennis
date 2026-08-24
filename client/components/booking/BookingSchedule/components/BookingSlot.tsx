import { Plus } from "lucide-react-native";

import { formatMinutes } from "@/components/booking/BookingSchedule/utils";
import Touch from "@/components/ui/Pressable";

type BookingSlotProps = {
  endMinute: number;
  isDisabled: boolean;
  isShaded?: boolean;
  label: string;
  onSelect: () => void;
  slotWidth: number;
  startMinute: number;
};

export default function BookingSlot({ endMinute, isDisabled, isShaded = false, label, onSelect, slotWidth, startMinute }: BookingSlotProps) {
  return (
    <Touch
      // Sọc mờ xen kẽ giúp mắt lần theo đúng cột giờ khi bảng kéo dài.
      accessibilityLabel={`${label} ${formatMinutes(startMinute)} - ${formatMinutes(endMinute)}`}
      accessibilityRole="button"
      className={`h-full shrink-0 items-center justify-center border-r border-slate-100 ${isShaded ? "bg-slate-50/40" : ""} ${isDisabled ? "bg-slate-50" : ""}`}
      disabled={isDisabled}
      onPress={onSelect}
      style={{ width: slotWidth }}
    >
      {isDisabled ? null : <Plus color="#e2e8f0" size={14} />}
    </Touch>
  );
}
