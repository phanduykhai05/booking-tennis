import { Clock, MapPin, Wrench } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

import BookingCard from "@/components/booking/BookingSchedule/components/BookingCard";
import BookingSlot from "@/components/booking/BookingSchedule/components/BookingSlot";
import BookingStatusLegend from "@/components/booking/BookingSchedule/components/BookingStatusLegend";
import type {
  BookingCourt,
  BookingCustomer,
  BookingScheduleConfig,
  BookingScheduleContent,
  BookingStatus,
  CourtBooking,
} from "@/components/booking/BookingSchedule/types";
import { getBookingPosition, getTimeSlots, isSlotOccupied } from "@/components/booking/BookingSchedule/utils";
import Card from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/Feedback";
import ProgressBar from "@/components/ui/ProgressBar";
import { formatMinutes } from "@/lib/format";

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
const rowHeight = 96;
const headerHeight = 56;

/**
 * Lưới dòng thời gian tự dựng: cột sân nằm ngoài vùng cuộn ngang vì RN không có
 * `position: sticky`, nhờ vậy tên sân luôn hiện khi kéo phần giờ.
 */
export default function BookingTimeline({
  bookings,
  config,
  content,
  courts,
  customers,
  date,
  onBookingSelect,
  onSlotSelect,
  occupancyBookings,
  statusOptions,
}: BookingTimelineProps) {
  const timeSlots = getTimeSlots(config);
  const customerMap = new Map(customers.map((customer) => [customer.id, customer]));

  return (
    <Card
      description={`${bookings.length} lịch · ${courts.length} sân · khung ${config.slotMinutes} phút`}
      extra={<BookingStatusLegend content={content} statuses={statusOptions} />}
      noBodyPadding
      title={content.scheduleLabel}
    >
      {courts.length === 0 ? (
        <EmptyState description={content.emptyBookingsLabel} />
      ) : (
        <ScrollView className="max-h-[680px]" nestedScrollEnabled>
          <View className="flex-row">
            <View className="border-r border-slate-200 bg-white" style={{ width: courtColumnWidth }}>
              <View
                className="flex-row items-center gap-2 border-b border-slate-200 bg-slate-50 px-4"
                style={{ height: headerHeight }}
              >
                <Clock color="#059669" size={14} />
                <Text className="text-[12px] font-bold uppercase tracking-wider text-slate-500">{content.timeLabel}</Text>
              </View>

              {courts.map((court) => {
                const isUnavailable = court.status !== "available";
                const courtBookings = occupancyBookings.filter((booking) => booking.courtId === court.id);
                const bookedMinutes = courtBookings
                  .filter((booking) => booking.status !== "cancelled")
                  .reduce((total, booking) => total + booking.endMinute - booking.startMinute, 0);
                const utilization = Math.min(
                  Math.round((bookedMinutes / Math.max(config.endMinute - config.startMinute, 1)) * 100),
                  100,
                );

                return (
                  <View
                    className="justify-center gap-1.5 border-b border-slate-200 px-4"
                    key={court.id}
                    style={{ height: rowHeight }}
                  >
                    <View className="flex-row items-center gap-2">
                      <View
                        className={`h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isUnavailable ? "bg-slate-100" : "bg-emerald-50"}`}
                      >
                        {isUnavailable ? <Wrench color="#64748b" size={15} /> : <MapPin color="#047857" size={15} />}
                      </View>
                      <View className="min-w-0 flex-1">
                        <Text className="text-[14px] font-bold text-slate-900" numberOfLines={1}>
                          {court.name}
                        </Text>
                        <Text className="text-[12px] text-slate-500">{content.surfaceLabels[court.surface]}</Text>
                      </View>
                    </View>

                    {isUnavailable ? (
                      <Text className="text-[11px] text-slate-500">{content.courtStatusLabels[court.status]}</Text>
                    ) : (
                      <ProgressBar color={utilization >= 75 ? "#f43f5e" : "#0f9b58"} percent={utilization} />
                    )}
                  </View>
                );
              })}
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator>
              <View style={{ width: timeSlots.length * slotWidth }}>
                <View className="flex-row border-b border-slate-200 bg-slate-50" style={{ height: headerHeight }}>
                  {timeSlots.map((slot) => (
                    <View
                      className="shrink-0 justify-center border-r border-slate-200 px-3"
                      key={slot}
                      style={{ width: slotWidth }}
                    >
                      <Text className="text-[12px] font-bold text-slate-600">{formatMinutes(slot)}</Text>
                    </View>
                  ))}
                </View>

                {courts.map((court) => {
                  const isUnavailable = court.status !== "available";
                  const courtOccupancy = occupancyBookings.filter((booking) => booking.courtId === court.id);
                  const courtBookings = bookings.filter((booking) => booking.courtId === court.id);

                  return (
                    <View className="flex-row border-b border-slate-200" key={court.id} style={{ height: rowHeight }}>
                      {timeSlots.map((startMinute, index) => {
                        const endMinute = startMinute + config.slotMinutes;

                        return (
                          <BookingSlot
                            endMinute={endMinute}
                            isDisabled={isUnavailable || isSlotOccupied(courtOccupancy, startMinute, endMinute)}
                            isShaded={index % 2 === 1}
                            key={startMinute}
                            label={`${content.slotLabel} ${court.name}, ${date}`}
                            onSelect={() => onSlotSelect(court.id, startMinute, endMinute)}
                            slotWidth={slotWidth}
                            startMinute={startMinute}
                          />
                        );
                      })}

                      {courtBookings.map((booking) => {
                        const customer = customerMap.get(booking.customerId);
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
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </Card>
  );
}
