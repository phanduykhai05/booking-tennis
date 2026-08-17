"use client";

import { EnvironmentOutlined, ToolOutlined } from "@ant-design/icons";
import { Progress, Typography } from "antd";

import BookingCard from "@/components/booking/BookingSchedule/components/BookingCard";
import BookingSlot from "@/components/booking/BookingSchedule/components/BookingSlot";
import type {
  BookingCourt,
  BookingCustomer,
  BookingScheduleConfig,
  BookingScheduleContent,
  CourtBooking,
} from "@/components/booking/BookingSchedule/types";
import { getBookingPosition, isSlotOccupied } from "@/components/booking/BookingSchedule/utils";

type BookingCourtRowProps = {
  bookings: CourtBooking[];
  config: BookingScheduleConfig;
  content: BookingScheduleContent;
  court: BookingCourt;
  courtColumnWidth: number;
  customers: Map<string, BookingCustomer>;
  date: string;
  onBookingSelect: (bookingId: string) => void;
  onSlotSelect: (courtId: string, startMinute: number, endMinute: number) => void;
  occupancyBookings: CourtBooking[];
  slotWidth: number;
  timeSlots: number[];
};

export default function BookingCourtRow({
  bookings,
  config,
  content,
  court,
  courtColumnWidth,
  customers,
  date,
  onBookingSelect,
  onSlotSelect,
  occupancyBookings,
  slotWidth,
  timeSlots,
}: BookingCourtRowProps) {
  const isUnavailable = court.status !== "available";
  const bookedMinutes = occupancyBookings
    .filter((booking) => booking.status !== "cancelled")
    .reduce((total, booking) => total + booking.endMinute - booking.startMinute, 0);
  const utilization = Math.min(Math.round((bookedMinutes / Math.max(config.endMinute - config.startMinute, 1)) * 100), 100);

  return (
    <div className="flex border-b border-slate-200 bg-white last:border-b-0">
      <div
        className="sticky left-0 z-20 flex shrink-0 flex-col justify-center gap-1.5 border-r border-slate-200 bg-white px-4 py-3 shadow-[5px_0_14px_-12px_rgba(15,23,42,0.45)]"
        style={{ width: courtColumnWidth }}
      >
        <div className="flex items-center gap-2">
          <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${isUnavailable ? "bg-slate-100 text-slate-500" : "bg-emerald-50 text-emerald-700"}`}>
            {isUnavailable ? <ToolOutlined aria-hidden="true" /> : <EnvironmentOutlined aria-hidden="true" />}
          </span>
          <div className="min-w-0">
            <Typography.Paragraph className="!mb-0 !text-sm" ellipsis strong>{court.name}</Typography.Paragraph>
            <Typography.Text className="!text-[12px]" type="secondary">{content.surfaceLabels[court.surface]}</Typography.Text>
          </div>
        </div>

        {isUnavailable ? (
          <Typography.Text className="!text-[11px]" type="secondary">{content.courtStatusLabels[court.status]}</Typography.Text>
        ) : (
          <Progress
            format={(percent) => <span className="text-[11px] text-slate-500">{percent}%</span>}
            percent={utilization}
            size={{ height: 6 }}
            strokeColor={utilization >= 75 ? "#f43f5e" : "#0f9b58"}
          />
        )}
      </div>

      <div className="relative flex h-24 shrink-0" style={{ width: timeSlots.length * slotWidth }}>
        {timeSlots.map((startMinute, index) => {
          const endMinute = startMinute + config.slotMinutes;
          return (
            <BookingSlot
              endMinute={endMinute}
              isDisabled={isUnavailable || isSlotOccupied(occupancyBookings, startMinute, endMinute)}
              isShaded={index % 2 === 1}
              key={startMinute}
              label={`${content.slotLabel} ${court.name}, ${date}`}
              onSelect={() => onSlotSelect(court.id, startMinute, endMinute)}
              slotWidth={slotWidth}
              startMinute={startMinute}
            />
          );
        })}

        {bookings.map((booking) => {
          const customer = customers.get(booking.customerId);
          if (!customer) return null;

          return (
            <BookingCard
              booking={booking}
              content={content}
              customer={customer}
              key={booking.id}
              onSelect={() => onBookingSelect(booking.id)}
              position={getBookingPosition(booking, config, slotWidth)}
            />
          );
        })}
      </div>
    </div>
  );
}
