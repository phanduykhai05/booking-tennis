"use client";

import { App, Card } from "antd";
import { useMemo, useState } from "react";

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

const initialFilters: BookingFilterState = {
  courtId: "all",
  query: "",
  status: "all",
};

export default function BookingSchedule() {
  const { message } = App.useApp();
  const { bookings, courts, createBooking, customers, updateBookingStatus, venues } = useAdminData();
  const [date, setDate] = useState(bookingScheduleConfig.initialDate);
  const [filters, setFilters] = useState(initialFilters);
  const [selection, setSelection] = useState<BookingSelection | null>(null);
  const [viewMode, setViewMode] = useState<BookingViewMode>("timeline");

  const customerMap = useMemo(() => new Map(customers.map((customer) => [customer.id, customer])), [customers]);

  const dateBookings = useMemo(
    () => bookings.filter((booking) => booking.bookingDate === date),
    [bookings, date],
  );

  const visibleCourts = useMemo(
    () => courts.filter((court) => filters.courtId === "all" || court.id === filters.courtId),
    [courts, filters.courtId],
  );

  const filteredBookings = useMemo(() => {
    const query = filters.query.trim().toLocaleLowerCase("vi");

    return dateBookings.filter((booking) => {
      const customer = customerMap.get(booking.customerId);
      const matchesCourt = filters.courtId === "all" || booking.courtId === filters.courtId;
      const matchesStatus = filters.status === "all" || booking.status === filters.status;
      const matchesQuery = !query
        || booking.code.toLocaleLowerCase("vi").includes(query)
        || customer?.name.toLocaleLowerCase("vi").includes(query);

      return matchesCourt && matchesStatus && Boolean(matchesQuery);
    });
  }, [customerMap, dateBookings, filters]);

  const selectedBooking = selection?.kind === "booking"
    ? bookings.find((booking) => booking.id === selection.bookingId)
    : undefined;
  const selectedCourtId = selection?.kind === "slot" ? selection.courtId : selectedBooking?.courtId;
  const selectedCourt = courts.find((court) => court.id === selectedCourtId);
  const selectedCustomer = selectedBooking ? customerMap.get(selectedBooking.customerId) : undefined;

  function handleSlotSelect(courtId: string, startMinute: number, endMinute: number) {
    setSelection({ courtId, date, endMinute, kind: "slot", startMinute });
  }

  function handleCreateBooking(input: CreateBookingInput) {
    if (!selection || selection.kind !== "slot") return;

    const bookingId = createBooking({
      bookingDate: selection.date,
      courtId: selection.courtId,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      endMinute: selection.endMinute,
      note: input.note,
      startMinute: selection.startMinute,
    });
    setSelection({ bookingId, kind: "booking" });
    message.success(bookingScheduleContent.bookingCreatedMessage);
  }

  function handleStatusChange(status: BookingStatus) {
    if (!selectedBooking) return;

    updateBookingStatus(selectedBooking.id, status);
  }

  return (
    <div className="space-y-5">
      <AdminPageHeader
        actions={<BookingViewSwitcher onChange={setViewMode} value={viewMode} />}
        description={`Theo dõi công suất sân, khách hàng và trạng thái thanh toán tại ${venues[0]?.name ?? bookingScheduleContent.venueName}.`}
        eyebrow="Vận hành sân"
        title={bookingScheduleContent.title}
      />

      <Card>
        <div className="grid gap-3 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
          <BookingDateSelector
            content={bookingScheduleContent}
            date={date}
            onChange={setDate}
            onNext={() => setDate((current) => shiftDate(current, 1))}
            onPrevious={() => setDate((current) => shiftDate(current, -1))}
          />
          <BookingFilters
            content={bookingScheduleContent}
            courts={courts}
            filters={filters}
            onChange={setFilters}
            statusOptions={bookingStatusOptions}
          />
        </div>
      </Card>

      <BookingDaySummary
        bookings={dateBookings}
        closingMinute={venues[0]?.closingMinute ?? bookingScheduleConfig.endMinute}
        courts={courts}
        openingMinute={venues[0]?.openingMinute ?? bookingScheduleConfig.startMinute}
      />

      {viewMode === "timeline" ? (
        <BookingTimeline
          bookings={filteredBookings}
          config={bookingScheduleConfig}
          content={bookingScheduleContent}
          courts={visibleCourts}
          customers={customers}
          date={date}
          onBookingSelect={(bookingId) => setSelection({ bookingId, kind: "booking" })}
          onSlotSelect={handleSlotSelect}
          occupancyBookings={dateBookings}
          statusOptions={bookingStatusOptions}
        />
      ) : (
        <BookingList
          bookings={filteredBookings}
          content={bookingScheduleContent}
          courts={courts}
          customers={customers}
          onSelect={(bookingId) => setSelection({ bookingId, kind: "booking" })}
        />
      )}

      <BookingDetailPanel
        booking={selectedBooking}
        content={bookingScheduleContent}
        court={selectedCourt}
        customer={selectedCustomer}
        onClose={() => setSelection(null)}
        onCreate={handleCreateBooking}
        onStatusChange={handleStatusChange}
        open={Boolean(selection)}
        selection={selection}
      />
    </div>
  );
}
