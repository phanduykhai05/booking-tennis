import { Calendar, List } from "lucide-react-native";
import { Text, View } from "react-native";

import type { BookingViewMode } from "@/components/booking/BookingSchedule/types";
import Touch from "@/components/ui/Pressable";

type BookingViewSwitcherProps = {
  onChange: (view: BookingViewMode) => void;
  value: BookingViewMode;
};

const options = [
  { icon: Calendar, label: "Dòng thời gian", value: "timeline" as const },
  { icon: List, label: "Danh sách", value: "list" as const },
];

export default function BookingViewSwitcher({ onChange, value }: BookingViewSwitcherProps) {
  return (
    <View accessibilityLabel="Kiểu hiển thị lịch đặt sân" className="flex-row rounded-lg bg-slate-100 p-1">
      {options.map((option) => {
        const isActive = value === option.value;
        const Icon = option.icon;

        return (
          <Touch
            accessibilityState={{ selected: isActive }}
            className={`h-10 flex-row items-center gap-2 rounded-md px-3 ${isActive ? "bg-white" : ""}`}
            key={option.value}
            onPress={() => onChange(option.value)}
          >
            <Icon color={isActive ? "#0f9b58" : "#64748b"} size={16} />
            <Text className={`text-[14px] ${isActive ? "font-semibold text-slate-900" : "text-slate-600"}`}>{option.label}</Text>
          </Touch>
        );
      })}
    </View>
  );
}
