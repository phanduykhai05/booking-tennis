"use client";

import { Card, Empty, Typography } from "antd";

import BookingCourtRow from "@/components/booking/BookingSchedule/components/BookingCourtRow";
import BookingStatusLegend from "@/components/booking/BookingSchedule/components/BookingStatusLegend";
import BookingTimeHeader from "@/components/booking/BookingSchedule/components/BookingTimeHeader";
import type {
  BookingCourt,
  BookingCustomer,
  BookingScheduleConfig,
  BookingScheduleContent,
  BookingStatus,
  CourtBooking,
} from "@/components/booking/BookingSchedule/types";
import { getTimeSlots } from "@/components/booking/BookingSchedule/utils";

type BookingTimelineProps = {
  bookings: CourtBooking[];
  config: BookingScheduleConfig;
  content: BookingScheduleContent;
  courts: BookingCourt[];
  customers: BookingCustomer[];
  date: string;
  onBookingSelect: (bookingId: string) => void;
  onSlotSelect: (courtId: string, startMinute: number, endMinute: number) => void;
  occupancyBookings: CourtBooking[];
  statusOptions: BookingStatus[];
};

const courtColumnWidth = 190;
const slotWidth = 96;

// Lưới dòng thời gian vẫn tự dựng: antd không có component scheduler nào tương đương.
export default function BookingTimeline({ bookings, config, content, courts, customers, date, onBookingSelect, onSlotSelect, occupancyBookings, statusOptions }: BookingTimelineProps) {
  const timeSlots = getTimeSlots(config);
  const customerMap = new Map(customers.map((customer) => [customer.id, customer]));
  const timelineWidth = timeSlots.length * slotWidth;

  return (
    <Card
      aria-label={content.scheduleLabel}
      classNames={{ body: "!p-0" }}
      title={
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          <div>
            <Typography.Text strong>{content.scheduleLabel}</Typography.Text>
            <Typography.Paragraph className="!mb-0 !text-xs" type="secondary">
              {bookings.length} lịch · {courts.length} sân · {content.slotLabel.toLowerCase()} {config.slotMinutes} phút
            </Typography.Paragraph>
          </div>
          <BookingStatusLegend content={content} statuses={statusOptions} />
        </div>
      }
    >
      {courts.length === 0 ? (
        <Empty className="!py-16" description={content.emptyBookingsLabel} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <div className="max-h-[680px] min-h-[420px] overflow-auto overscroll-contain">
          <div style={{ minWidth: courtColumnWidth + timelineWidth }}>
            <BookingTimeHeader
              courtColumnWidth={courtColumnWidth}
              slotWidth={slotWidth}
              timeLabel={content.timeLabel}
              timeSlots={timeSlots}
            />
            {courts.map((court) => (
              <BookingCourtRow
                bookings={bookings.filter((booking) => booking.courtId === court.id)}
                config={config}
                content={content}
                court={court}
                courtColumnWidth={courtColumnWidth}
                customers={customerMap}
                date={date}
                key={court.id}
                onBookingSelect={onBookingSelect}
                onSlotSelect={onSlotSelect}
                occupancyBookings={occupancyBookings.filter((booking) => booking.courtId === court.id)}
                slotWidth={slotWidth}
                timeSlots={timeSlots}
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
