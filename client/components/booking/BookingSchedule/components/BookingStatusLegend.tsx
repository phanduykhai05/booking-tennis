import { Text, View } from "react-native";

import { bookingStatusStyles } from "@/components/booking/BookingSchedule/components/bookingStatusStyles";
import type { BookingScheduleContent, BookingStatus } from "@/components/booking/BookingSchedule/types";

type BookingStatusLegendProps = {
  content: BookingScheduleContent;
  statuses: BookingStatus[];
};

export default function BookingStatusLegend({ content, statuses }: BookingStatusLegendProps) {
  return (
    <View className="flex-row flex-wrap items-center gap-x-4 gap-y-1.5">
      {statuses.map((status) => (
        <View className="flex-row items-center gap-1.5" key={status}>
          <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: bookingStatusStyles[status].accent }} />
          <Text className="text-[12px] text-slate-500">{content.bookingStatusLabels[status]}</Text>
        </View>
      ))}
    </View>
  );
}
