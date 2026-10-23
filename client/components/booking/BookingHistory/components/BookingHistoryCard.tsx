import { CalendarDays, Clock, MapPin } from "lucide-react";

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
    <div className="rounded-xl border border-[#dcebe3] bg-white p-3" style={shadow.card}>
      <div className="flex-row items-start gap-2">
        <div className="min-w-0 flex-1">
          <span className="text-[15px] font-bold text-[#0b5133] truncate">
            {booking.venueName}
          </span>
          <div className="mt-1 flex-row items-center gap-1">
            <MapPin color="#49544f" size={13} />
            <span className="text-[13px] text-[#49544f]">{booking.courtName}</span>
          </div>
        </div>
        <Tag label={bookingStatusLabels[booking.status]} tone={bookingStatusTones[booking.status]} />
      </div>

      <div className="mt-2 flex-row flex-wrap gap-y-1">
        <div className="w-1/2 flex-row items-center gap-1">
          <CalendarDays color="#49544f" size={13} />
          <span className="text-[13px] text-[#49544f]">{formatDayMonthYear(booking.date)}</span>
        </div>
        <div className="w-1/2 flex-row items-center gap-1">
          <Clock color="#49544f" size={13} />
          <span className="text-[13px] text-[#49544f]">
            {booking.timeStart} - {booking.timeEnd}
          </span>
        </div>
        <div className="w-full flex-row items-center gap-1">
          <span className="text-[13px] text-[#8a918e]">{bookingHistoryContent.codeLabel}</span>
          <span className="text-[13px] font-medium text-[#49544f]">{booking.code}</span>
        </div>
      </div>

      <div className="mt-2 flex-row items-center justify-between border-t border-[#eef3f0] pt-2">
        <div>
          <span className="text-[15px] font-bold text-[#007b45]">{booking.priceLabel}</span>
          <span className="text-[12px] text-[#8a918e]">{paymentStatusLabels[booking.paymentStatus]}</span>
        </div>
        {canCancel ? (
          <Touch
            className="h-8 justify-center rounded-md border border-[#e0574f] px-3"
            disabled={isCancelling}
            onPress={() => onCancel(booking.id)}
          >
            <span className="text-[13px] font-semibold text-[#e0574f]">{bookingHistoryContent.cancelLabel}</span>
          </Touch>
        ) : null}
      </div>
    </div>
  );
}
