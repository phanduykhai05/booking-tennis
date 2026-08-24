import { Text, View } from "react-native";

import { bookingStatusStyles, paymentDotColor } from "@/components/booking/BookingSchedule/components/bookingStatusStyles";
import type { BookingCustomer, BookingScheduleContent, CourtBooking } from "@/components/booking/BookingSchedule/types";
import { formatMinutes } from "@/components/booking/BookingSchedule/utils";
import Touch from "@/components/ui/Pressable";

type BookingCardProps = {
  booking: CourtBooking;
  content: BookingScheduleContent;
  customer: BookingCustomer;
  onSelect: () => void;
  position: { left: number; width: number };
};

export default function BookingCard({ booking, content, customer, onSelect, position }: BookingCardProps) {
  const isCancelled = booking.status === "cancelled";
  const style = bookingStatusStyles[booking.status];
  const timeRange = `${formatMinutes(booking.startMinute)} – ${formatMinutes(booking.endMinute)}`;

  return (
    <Touch
      accessibilityLabel={`${booking.code}, ${customer.name}, ${timeRange}, ${content.bookingStatusLabels[booking.status]}`}
      accessibilityRole="button"
      className="absolute inset-y-2 overflow-hidden rounded-lg border py-2 pl-3 pr-2.5"
      disabled={isCancelled}
      onPress={onSelect}
      style={{
        backgroundColor: style.background,
        borderColor: style.border,
        left: position.left,
        opacity: isCancelled ? 0.55 : 1,
        width: position.width,
      }}
    >
      {/* Dải màu mép trái cho biết trạng thái ngay cả khi thẻ hẹp không đọc được chữ. */}
      <View className="absolute inset-y-0 left-0 w-1" style={{ backgroundColor: style.accent }} />

      <View className="flex-row items-center gap-1.5">
        <View className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: paymentDotColor[booking.paymentStatus] }} />
        <Text className="flex-1 text-[11px] font-bold uppercase tracking-wide" numberOfLines={1} style={{ color: style.text, opacity: 0.7 }}>
          {booking.code}
        </Text>
      </View>
      <Text className="mt-0.5 text-[12px] font-bold" numberOfLines={1} style={{ color: style.text }}>
        {customer.name}
      </Text>
      <Text className="mt-0.5 text-[11px] font-semibold" numberOfLines={1} style={{ color: style.text, opacity: 0.75 }}>
        {timeRange}
      </Text>
    </Touch>
  );
}
