import type {
  Booking as AdminBooking,
  BookingStatus as AdminBookingStatus,
  Court as AdminCourt,
  CourtStatus as AdminCourtStatus,
  CourtSurface as AdminCourtSurface,
  Customer as AdminCustomer,
  PaymentStatus as AdminPaymentStatus,
} from "@/components/admin/AdminData/types";

export type BookingStatus = AdminBookingStatus;
export type PaymentStatus = AdminPaymentStatus;
export type CourtStatus = AdminCourtStatus;
export type CourtSurface = AdminCourtSurface;
export type BookingCourt = AdminCourt;
export type BookingCustomer = AdminCustomer;
export type CourtBooking = AdminBooking;

export type BookingScheduleConfig = {
  initialDate: string;
  slotMinutes: number;
  startMinute: number;
  endMinute: number;
};

export type BookingFilterState = {
  courtId: string;
  query: string;
  status: "all" | BookingStatus;
};

export type BookingSelection =
  | { bookingId: string; kind: "booking" }
  | { courtId: string; date: string; endMinute: number; kind: "slot"; startMinute: number };

export type CreateBookingInput = {
  customerName: string;
  customerPhone: string;
  note: string;
};

export type BookingViewMode = "list" | "timeline";

export type BookingScheduleContent = {
  addBookingLabel: string;
  allCourtsLabel: string;
  allStatusesLabel: string;
  bookingCodeLabel: string;
  bookingCreatedMessage: string;
  bookingDetailLabel: string;
  bookingStatusLabels: Record<BookingStatus, string>;
  cancelBookingLabel: string;
  closeLabel: string;
  confirmBookingLabel: string;
  courtFilterLabel: string;
  courtStatusLabels: Record<CourtStatus, string>;
  createBookingDescription: string;
  createBookingLabel: string;
  customerLabel: string;
  customerNameLabel: string;
  customerNamePlaceholder: string;
  customerPhoneLabel: string;
  customerPhonePlaceholder: string;
  dateLabel: string;
  emptyBookingsLabel: string;
  filterLabel: string;
  indoorLabel: string;
  locationLabel: string;
  nextDateLabel: string;
  noteLabel: string;
  notePlaceholder: string;
  paymentLabel: string;
  paymentStatusLabels: Record<PaymentStatus, string>;
  previousDateLabel: string;
  priceLabel: string;
  scheduleLabel: string;
  searchLabel: string;
  searchPlaceholder: string;
  selectedDateLabel: string;
  slotLabel: string;
  statusFilterLabel: string;
  statusLabel: string;
  surfaceLabels: Record<CourtSurface, string>;
  timeLabel: string;
  title: string;
  totalBookingsLabel: string;
  totalCourtsLabel: string;
  venueName: string;
};
