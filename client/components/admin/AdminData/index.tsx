"use client";

import { createContext, useContext, useState } from "react";

import { adminMockData, bookingActivityStatusLabels } from "@/components/admin/AdminData/mockData";
import type {
  AdminDataContextValue,
  Booking,
  BookingStatus,
  CourtPayload,
  CreateBookingPayload,
  Customer,
  CustomerStatus,
  Payment,
  PaymentStatus,
} from "@/components/admin/AdminData/types";

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

type AdminDataProviderProps = {
  children: React.ReactNode;
};

export default function AdminDataProvider({ children }: AdminDataProviderProps) {
  const [venues] = useState(adminMockData.venues);
  const [courts, setCourts] = useState(adminMockData.courts);
  const [customers, setCustomers] = useState(adminMockData.customers);
  const [bookings, setBookings] = useState(adminMockData.bookings);
  const [payments, setPayments] = useState(adminMockData.payments);
  const [activityEvents, setActivityEvents] = useState(adminMockData.activityEvents);

  function createBooking(payload: CreateBookingPayload) {
    const uniqueSuffix = `${Date.now()}`;
    const existingCustomer = customers.find((customer) => customer.phone === payload.customerPhone);
    const customerId = existingCustomer?.id ?? `customer-local-${uniqueSuffix}`;
    const bookingId = `booking-local-${uniqueSuffix}`;
    const paymentId = `payment-local-${uniqueSuffix}`;
    const court = courts.find((item) => item.id === payload.courtId);
    const venueId = court?.venueId ?? venues[0]?.id ?? "venue-01";
    const durationHours = (payload.endMinute - payload.startMinute) / 60;
    const totalPrice = durationHours * (court?.hourlyRate ?? 180000);
    const compactDate = payload.bookingDate.replaceAll("-", "").slice(2);
    const code = `TH${compactDate}${`${bookings.length + 1}`.padStart(2, "0")}`;
    const newBooking: Booking = {
      bookingDate: payload.bookingDate,
      code,
      courtId: payload.courtId,
      customerId,
      endMinute: payload.endMinute,
      id: bookingId,
      note: payload.note || undefined,
      paymentStatus: "unpaid",
      source: "counter",
      startMinute: payload.startMinute,
      status: "pending",
      totalPrice,
      venueId,
    };
    const newPayment: Payment = {
      amount: 0,
      bookingId,
      createdAt: `${payload.bookingDate}T00:00:00+07:00`,
      customerId,
      id: paymentId,
      method: "cash",
      status: "unpaid",
      transactionCode: `PAY${compactDate}${`${payments.length + 1}`.padStart(2, "0")}`,
    };

    if (!existingCustomer) {
      const newCustomer: Customer = {
        email: "",
        id: customerId,
        joinedAt: payload.bookingDate,
        name: payload.customerName,
        phone: payload.customerPhone,
        status: "active",
      };
      setCustomers((current) => [...current, newCustomer]);
    }

    setBookings((current) => [...current, newBooking]);
    setPayments((current) => [...current, newPayment]);
    setActivityEvents((current) => [{ createdAt: newPayment.createdAt, entityId: bookingId, id: `activity-${uniqueSuffix}`, message: `Lịch ${code} vừa được tạo.`, type: "booking-created" }, ...current]);
    return bookingId;
  }

  function updateBookingStatus(bookingId: string, status: BookingStatus) {
    const booking = bookings.find((item) => item.id === bookingId);
    setBookings((current) => current.map((item) => item.id === bookingId ? { ...item, status } : item));
    if (booking) {
      setActivityEvents((current) => [{ createdAt: `${booking.bookingDate}T00:00:00+07:00`, entityId: bookingId, id: `activity-${Date.now()}`, message: `Lịch ${booking.code} chuyển sang trạng thái ${bookingActivityStatusLabels[status]}.`, type: "booking-updated" }, ...current]);
    }
  }

  function createCourt(payload: CourtPayload) {
    setCourts((current) => [...current, { ...payload, id: `court-local-${Date.now()}` }]);
  }

  function updateCourt(courtId: string, payload: CourtPayload) {
    setCourts((current) => current.map((court) => court.id === courtId ? { ...court, ...payload } : court));
  }

  function updateCustomerStatus(customerId: string, status: CustomerStatus) {
    setCustomers((current) => current.map((customer) => customer.id === customerId ? { ...customer, status } : customer));
  }

  function updatePaymentStatus(paymentId: string, status: PaymentStatus) {
    const payment = payments.find((item) => item.id === paymentId);
    const booking = payment ? bookings.find((item) => item.id === payment.bookingId) : undefined;
    setPayments((current) => current.map((item) => {
      if (item.id !== paymentId) return item;
      if (status === "paid") return { ...item, amount: booking?.totalPrice ?? item.amount, paidAt: new Date().toISOString(), status };
      if (status === "unpaid" || status === "failed") return { ...item, amount: 0, paidAt: undefined, status };
      return { ...item, status };
    }));
    if (payment) {
      setBookings((current) => current.map((booking) => booking.id === payment.bookingId ? { ...booking, paymentStatus: status } : booking));
    }
  }

  const value: AdminDataContextValue = {
    activityEvents,
    bookings,
    courts,
    createBooking,
    createCourt,
    customers,
    payments,
    updateBookingStatus,
    updateCourt,
    updateCustomerStatus,
    updatePaymentStatus,
    venues,
  };

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const value = useContext(AdminDataContext);
  if (!value) throw new Error("useAdminData phải được sử dụng bên trong AdminDataProvider.");
  return value;
}
