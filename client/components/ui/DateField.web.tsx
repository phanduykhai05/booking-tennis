import { CalendarDays } from "lucide-react-native";
import { Text, View } from "react-native";

import type { DateFieldProps } from "@/components/ui/DateField";

/**
 * Bản web dùng input date của trình duyệt, phủ trong suốt lên pill để giữ nguyên
 * giao diện mà vẫn mở được lịch hệ thống — cách bản Next đã làm.
 */
export default function DateField({ accessibilityLabel, displayValue, onChange, tone = "solid", value }: DateFieldProps) {
  return (
    <View
      className={`relative h-9 flex-row items-center gap-2 rounded-md px-3 ${tone === "solid" ? "bg-[#4a9d7f]" : "border border-slate-200 bg-white"}`}
    >
      <Text className={`text-[14px] font-semibold ${tone === "solid" ? "text-white" : "text-slate-700"}`}>{displayValue}</Text>
      <CalendarDays color={tone === "solid" ? "#ffffff" : "#0f9b58"} size={17} />
      <input
        aria-label={accessibilityLabel}
        onChange={(event) => event.target.value && onChange(event.target.value)}
        style={{ cursor: "pointer", inset: 0, opacity: 0, position: "absolute" }}
        type="date"
        value={value}
      />
    </View>
  );
}
