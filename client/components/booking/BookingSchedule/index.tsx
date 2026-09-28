import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { View, useWindowDimensions } from "react-native";

import { useAdminData } from "@/components/admin/AdminData";
import AdminPageHeader from "@/components/admin/shared/AdminPageHeader";
import BookingDateSelector from "@/components/booking/BookingSchedule/components/BookingDateSelector";
import BookingDaySummary from "@/components/booking/BookingSchedule/components/BookingDaySummary";
import BookingDetailPanel from "@/components/booking/BookingSchedule/components/BookingDetailPanel";
import BookingFilters from "@/components/booking/BookingSchedule/components/BookingFilters";
import BookingList from "@/components/booking/BookingSchedule/components/BookingList";
import BookingTimeline from "@/components/booking/BookingSchedule/components/BookingTimeline";
import BookingViewSwitcher from "@/components/booking/BookingSchedule/components/BookingViewSwitcher";
import {
  bookingScheduleConfig,
  bookingScheduleContent,
  bookingStatusOptions,
} from "@/components/booking/BookingSchedule/mockData";
import type {
  BookingFilterState,
  BookingSelection,
  BookingStatus,
  BookingViewMode,
  CreateBookingInput,
} from "@/components/booking/BookingSchedule/types";
import { shiftDate } from "@/components/booking/BookingSchedule/utils";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { todayInAppTimezone } from "@/lib/date";
import { matchesQuery } from "@/lib/format";

const initialFilters: BookingFilterState = {
  courtId: "all",
  query: "",
  status: "all",
};

export default function BookingSchedule() {
  const { success } = useToast();
  const { width } = useWindowDimensions();
  const { bookings, courts, createBooking, customers, updateBookingStatus, venues } = useAdminData();

  /**
   * Mở từ ô tìm nhanh: `code` là mã lịch cần xem, `venue` là cơ sở muốn xem trước.
   * Với `code` thì nhảy thẳng tới đúng ngày và đúng cơ sở của lịch đó, nếu không người
   * dùng bấm vào kết quả xong vẫn phải tự dò ngày.
   */
  const { code, venue: venueParam } = useLocalSearchParams<{ code?: string; venue?: string }>();
  const target = code ? bookings.find((booking) => booking.code === code) : undefined;

  // Trước đây mở cố định một ngày trong quá khứ nên lịch mới đặt không bao giờ hiện ra.
  const [date, setDate] = useState(() => target?.bookingDate ?? todayInAppTimezone());
  const [pickedVenueId, setPickedVenueId] = useState(() => target?.venueId ?? venueParam ?? "");
  const [filters, setFilters] = useState(() => (code ? { ...initialFilters, query: code } : initialFilters));
  const [selection, setSelection] = useState<BookingSelection | null>(null);
  const [viewMode, setViewMode] = useState<BookingViewMode>("timeline");

  const customerMap = useMemo(() => new Map(customers.map((customer) => [customer.id, customer])), [customers]);

  /**
   * Lưới lịch vẽ mỗi sân một hàng. Không lọc theo cơ sở thì toàn bộ 147 sân của 30 cơ sở
   * đổ vào một màn (hơn 10.000 phần tử DOM) khiến trang giật và bấm không ăn, đồng thời
   * tỷ lệ lấp đầy bị chia cho cả sân của cơ sở khác nên luôn hiển thị sai.
   */
  const venueId = pickedVenueId || venues[0]?.id || "";
  const venue = venues.find((item) => item.id === venueId);

  const venueCourts = useMemo(() => courts.filter((court) => court.venueId === venueId), [courts, venueId]);

  /**
   * Lưới phải bám giờ mở/đóng thật của cơ sở. Dùng khung cứng 06:00-22:00 thì lịch nằm
   * ngoài khoảng đó (ví dụ cơ sở mở 05:30) bị đẩy ra khỏi vùng nhìn thấy và coi như mất.
   */
  const scheduleConfig = useMemo(
    () => ({
      endMinute: venue?.closingMinute ?? bookingScheduleConfig.endMinute,
      initialDate: date,
      slotMinutes: bookingScheduleConfig.slotMinutes,
      startMinute: venue?.openingMinute ?? bookingScheduleConfig.startMinute,
    }),
    [date, venue?.closingMinute, venue?.openingMinute],
  );

  const dateBookings = useMemo(
    () => bookings.filter((booking) => booking.bookingDate === date && booking.venueId === venueId),
    [bookings, date, venueId],
  );

  const visibleCourts = useMemo(
    () => venueCourts.filter((court) => filters.courtId === "all" || court.id === filters.courtId),
    [filters.courtId, venueCourts],
  );

  const filteredBookings = useMemo(() => {
    const query = filters.query.trim();

    return dateBookings.filter((booking) => {
      const customer = customerMap.get(booking.customerId);
      const matchesCourt = filters.courtId === "all" || booking.courtId === filters.courtId;
      const matchesStatus = filters.status === "all" || booking.status === filters.status;
      const matchesText =
        !query || matchesQuery(booking.code, query) || Boolean(customer && matchesQuery(customer.name, query));

      return matchesCourt && matchesStatus && matchesText;
    });
  }, [customerMap, dateBookings, filters]);

  const selectedBooking =
    selection?.kind === "booking" ? bookings.find((booking) => booking.id === selection.bookingId) : undefined;
  const selectedCourtId = selection?.kind === "slot" ? selection.courtId : selectedBooking?.courtId;
  const selectedCourt = courts.find((court) => court.id === selectedCourtId);
  const selectedCustomer = selectedBooking ? customerMap.get(selectedBooking.customerId) : undefined;

  const handleCreateBooking = async (input: CreateBookingInput) => {
    if (!selection || selection.kind !== "slot") return;

    const bookingId = await createBooking({
      bookingDate: selection.date,
      courtId: selection.courtId,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      endMinute: selection.endMinute,
      note: input.note,
      startMinute: selection.startMinute,
    });

    setSelection({ bookingId, kind: "booking" });
    success(bookingScheduleContent.bookingCreatedMessage);
  };

  const handleStatusChange = (status: BookingStatus) => {
    if (!selectedBooking) return;
    void updateBookingStatus(selectedBooking.id, status);
  };

  return (
    <View className="gap-5">
      <AdminPageHeader
        actions={<BookingViewSwitcher onChange={setViewMode} value={viewMode} />}
        description={`Theo dõi công suất sân, khách hàng và trạng thái thanh toán tại ${venue?.name ?? bookingScheduleContent.venueName}.`}
        eyebrow="Vận hành sân"
        title={bookingScheduleContent.title}
      />

      <Card>
        <View className={width >= 1100 ? "flex-row items-center gap-3" : "gap-3"}>
          <BookingDateSelector
            content={bookingScheduleContent}
            date={date}
            onChange={setDate}
            onNext={() => setDate((current) => shiftDate(current, 1))}
            onPrevious={() => setDate((current) => shiftDate(current, -1))}
          />
          <Select
            accessibilityLabel={bookingScheduleContent.venueFilterLabel}
            onChange={(value) => {
              setPickedVenueId(value);
              setFilters((current) => ({ ...current, courtId: "all" }));
            }}
            options={venues.map((item) => ({ label: item.name, value: item.id }))}
            value={venueId}
            width={220}
          />
          <View className="min-w-0 flex-1">
            <BookingFilters
              content={bookingScheduleContent}
              courts={venueCourts}
              filters={filters}
              onChange={setFilters}
              statusOptions={bookingStatusOptions}
            />
          </View>
        </View>
      </Card>

      <BookingDaySummary
        bookings={dateBookings}
        closingMinute={scheduleConfig.endMinute}
        courts={venueCourts}
        openingMinute={scheduleConfig.startMinute}
      />

      {viewMode === "timeline" ? (
        <BookingTimeline
          bookings={filteredBookings}
          config={scheduleConfig}
          content={bookingScheduleContent}
          courts={visibleCourts}
          customers={customers}
          date={date}
          onBookingSelect={(bookingId) => setSelection({ bookingId, kind: "booking" })}
          onSlotSelect={(courtId, startMinute, endMinute) => setSelection({ courtId, date, endMinute, kind: "slot", startMinute })}
          occupancyBookings={dateBookings}
          statusOptions={bookingStatusOptions}
        />
      ) : (
        <BookingList
          bookings={filteredBookings}
          content={bookingScheduleContent}
          courts={venueCourts}
          customers={customers}
          onSelect={(bookingId) => setSelection({ bookingId, kind: "booking" })}
        />
      )}

      <BookingDetailPanel
        booking={selectedBooking}
        content={bookingScheduleContent}
        court={selectedCourt}
        customer={selectedCustomer}
        isOpen={Boolean(selection)}
        key={selection?.kind === "slot" ? `${selection.courtId}-${selection.startMinute}` : (selectedBooking?.id ?? "empty")}
        onClose={() => setSelection(null)}
        onCreate={(input) => void handleCreateBooking(input)}
        onStatusChange={handleStatusChange}
        selection={selection}
      />
    </View>
  );
}
