import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { View } from "react-native";

import type { BookingScheduleContent } from "@/components/booking/BookingSchedule/types";
import { formatDateLabel } from "@/components/booking/BookingSchedule/utils";
import DateField from "@/components/ui/DateField";
import Touch from "@/components/ui/Pressable";

type BookingDateSelectorProps = {
  content: BookingScheduleContent;
  date: string;
  onChange: (date: string) => void;
  onNext: () => void;
  onPrevious: () => void;
};

export default function BookingDateSelector({ content, date, onChange, onNext, onPrevious }: BookingDateSelectorProps) {
  return (
    <View className="flex-row items-center gap-2">
      <Touch
        accessibilityLabel={content.previousDateLabel}
        className="h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white"
        onPress={onPrevious}
      >
        <ChevronLeft color="#334155" size={17} />
      </Touch>

      <DateField
        accessibilityLabel={content.selectedDateLabel}
        displayValue={formatDateLabel(date)}
        onChange={onChange}
        tone="light"
        value={date}
      />

      <Touch
        accessibilityLabel={content.nextDateLabel}
        className="h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white"
        onPress={onNext}
      >
        <ChevronRight color="#334155" size={17} />
      </Touch>
    </View>
  );
}
