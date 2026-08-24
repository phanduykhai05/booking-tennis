import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarDays } from "lucide-react-native";
import { useState } from "react";
import { Text } from "react-native";

import Touch from "@/components/ui/Pressable";

export type DateFieldProps = {
  accessibilityLabel: string;
  displayValue: string;
  onChange: (date: string) => void;
  tone?: "light" | "solid";
  value: string;
};

const pad = (value: number) => value.toString().padStart(2, "0");

const toIsoDate = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/** Chạm vào pill mở lịch hệ thống; giá trị trao đổi luôn ở dạng "YYYY-MM-DD". */
export default function DateField({ accessibilityLabel, displayValue, onChange, tone = "solid", value }: DateFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Touch
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        className={`h-9 flex-row items-center gap-2 rounded-md px-3 ${tone === "solid" ? "bg-[#4a9d7f]" : "border border-slate-200 bg-white"}`}
        onPress={() => setIsOpen(true)}
      >
        <Text className={`text-[14px] font-semibold ${tone === "solid" ? "text-white" : "text-slate-700"}`}>{displayValue}</Text>
        <CalendarDays color={tone === "solid" ? "#ffffff" : "#0f9b58"} size={17} />
      </Touch>

      {isOpen ? (
        <DateTimePicker
          display="default"
          mode="date"
          onChange={(event, selected) => {
            setIsOpen(false);
            if (event.type === "set" && selected) onChange(toIsoDate(selected));
          }}
          value={new Date(`${value}T12:00:00`)}
        />
      ) : null}
    </>
  );
}
