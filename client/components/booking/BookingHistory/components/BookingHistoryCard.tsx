import { CalendarDays, Clock, MapPin } from "lucide-react-native";
import { Text, View } from "react-native";

import {
  bookingHistoryContent,
  bookingStatusLabels,
  bookingStatusTones,
  paymentStatusLabels,
} from "@/components/booking/BookingHistory/content";
import Touch from "@/components/ui/Pressable";
import Tag from "@/components/ui/Tag";
import { shadow } from "@/components/ui/theme";
import { formatDayMonthYear } from "@/lib/date";
import type { ApiBooking } from "@/lib/api/types";

type BookingHistoryCardProps = {
  booking: ApiBooking;
  isCancelling: boolean;
  onCancel: (bookingId: string) => void;
};

export default function BookingHistoryCard({ booking, isCancelling, onCancel }: BookingHistoryCardProps) {
  const canCancel = booking.status !== "cancelled" && booking.status !== "completed";

  return (
    <View className="rounded-xl border border-[#dcebe3] bg-white p-3" style={shadow.card}>
      <View className="flex-row items-start gap-2">
        <View className="min-w-0 flex-1">
          <Text className="text-[15px] font-bold text-[#0b5133]" numberOfLines={1}>
            {booking.venueName}
          </Text>
          <View className="mt-1 flex-row items-center gap-1">
            <MapPin color="#49544f" size={13} />
            <Text className="text-[13px] text-[#49544f]">{booking.courtName}</Text>
          </View>
        </View>
        <Tag label={bookingStatusLabels[booking.status]} tone={bookingStatusTones[booking.status]} />
      </View>

      <View className="mt-2 flex-row flex-wrap gap-y-1">
        <View className="w-1/2 flex-row items-center gap-1">
          <CalendarDays color="#49544f" size={13} />
          <Text className="text-[13px] text-[#49544f]">{formatDayMonthYear(booking.date)}</Text>
        </View>
        <View className="w-1/2 flex-row items-center gap-1">
          <Clock color="#49544f" size={13} />
          <Text className="text-[13px] text-[#49544f]">
            {booking.timeStart} - {booking.timeEnd}
          </Text>
        </View>
        <View className="w-full flex-row items-center gap-1">
          <Text className="text-[13px] text-[#8a918e]">{bookingHistoryContent.codeLabel}</Text>
          <Text className="text-[13px] font-medium text-[#49544f]">{booking.code}</Text>
        </View>
      </View>

      <View className="mt-2 flex-row items-center justify-between border-t border-[#eef3f0] pt-2">
        <View>
          <Text className="text-[15px] font-bold text-[#007b45]">{booking.priceLabel}</Text>
          <Text className="text-[12px] text-[#8a918e]">{paymentStatusLabels[booking.paymentStatus]}</Text>
        </View>
        {canCancel ? (
          <Touch
            className="h-8 justify-center rounded-md border border-[#e0574f] px-3"
            disabled={isCancelling}
            onPress={() => onCancel(booking.id)}
          >
            <Text className="text-[13px] font-semibold text-[#e0574f]">{bookingHistoryContent.cancelLabel}</Text>
          </Touch>
        ) : null}
      </View>
    </View>
  );
}
