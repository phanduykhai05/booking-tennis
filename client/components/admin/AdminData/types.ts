export type VenueStatus = "active" | "inactive";
export type CourtStatus = "available" | "inactive" | "maintenance";
export type CourtSurface = "clay" | "hard" | "synthetic";
export type CustomerStatus = "active" | "inactive";
export type BookingStatus = "cancelled" | "checked-in" | "completed" | "confirmed" | "pending";
export type BookingSource = "counter" | "online";
export type PaymentStatus = "failed" | "paid" | "partial" | "refunded" | "unpaid";
export type PaymentMethod = "bank-transfer" | "card" | "cash" | "e-wallet" | "sepay";
export type TicketStatus = "cancelled" | "paid" | "pending";
export type ActivityType = "booking-created" | "booking-updated" | "court-updated" | "payment-updated";

export type Venue = {
  address: string;
  closingMinute: number;
  id: string;
  name: string;
  openingMinute: number;
  status: VenueStatus;
  timezone: string;
};

export type Court = {
  hourlyRate: number;
  id: string;
  isIndoor: boolean;
  name: string;
  status: CourtStatus;
  surface: CourtSurface;
  venueId: string;
};

export type Customer = {
  email: string;
  id: string;
  joinedAt: string;
  name: string;
  phone: string;
  status: CustomerStatus;
};

export type Booking = {
  bookingDate: string;
  code: string;
  courtId: string;
  customerId: string;
  endMinute: number;
  id: string;
  note?: string;
  paymentStatus: PaymentStatus;
  source: BookingSource;
  startMinute: number;
  status: BookingStatus;
  totalPrice: number;
  venueId: string;
};

export type Payment = {
  amount: number;
  /** null khi giao dịch trả cho vé sự kiện thay vì lịch đặt sân. */
  bookingId: string | null;
  createdAt: string;
  customerId: string;
  id: string;
  method: PaymentMethod;
  paidAt?: string;
  status: PaymentStatus;
  ticketId: string | null;
  transactionCode: string;
};

export type VenueEvent = {
  capacity: number;
  /** Sân thật bị sự kiện chiếm chỗ; null thì sự kiện không khoá khung giờ nào. */
  courtId: string | null;
  courtLabel: string;
  endMinute: number;
  eventDate: string;
  id: string;
  price: number;
  soldCount: number;
  startMinute: number;
  /** Số lượt mua, kể cả vé đang chờ thanh toán. */
  ticketCount: number;
  title: string;
  venueId: string;
};

export type EventTicket = {
  createdAt: string;
  customerId: string;
  customerName: string;
  id: string;
  phone: string;
  quantity: number;
  status: TicketStatus;
  totalPrice: number;
};

export type EventPayload = {
  capacity: number;
  courtId?: string;
  courtLabel: string;
  endMinute: number;
  eventDate: string;
  price: number;
  startMinute: number;
  title: string;
  venueId: string;
};

export type ActivityEvent = {
  createdAt: string;
  entityId: string;
  id: string;
  message: string;
  type: ActivityType;
};

/**
 * Dữ liệu vận hành dùng chung cho mọi màn admin.
 *
 * Cố ý KHÔNG chứa danh sách sự kiện: chỉ màn Sự kiện cần tới nó, mà seed đang có hơn
 * 400 sự kiện — gửi kèm mọi lần tải sẽ phình payload chung lên gấp mấy lần vô ích.
 * Màn Sự kiện tự gọi `adminEventList`.
 */
export type AdminDataState = {
  activityEvents: ActivityEvent[];
  bookings: Booking[];
  courts: Court[];
  customers: Customer[];
  payments: Payment[];
  venues: Venue[];
};

export type CreateBookingPayload = {
  bookingDate: string;
  courtId: string;
  customerName: string;
  customerPhone: string;
  endMinute: number;
  note: string;
  startMinute: number;
};

export type CourtPayload = {
  hourlyRate: number;
  isIndoor: boolean;
  name: string;
  status: CourtStatus;
  surface: CourtSurface;
  venueId: string;
};

export type AdminDataContextValue = AdminDataState & {
  createBooking: (payload: CreateBookingPayload) => Promise<string>;
  createCourt: (payload: CourtPayload) => Promise<void>;
  createEvent: (payload: EventPayload) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  errorMessage: string;
  isLoading: boolean;
  refresh: () => Promise<void>;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => Promise<void>;
  updateCourt: (courtId: string, payload: CourtPayload) => Promise<void>;
  updateEvent: (eventId: string, payload: EventPayload) => Promise<void>;
  updateCustomerStatus: (customerId: string, status: CustomerStatus) => Promise<void>;
  updatePaymentStatus: (paymentId: string, status: PaymentStatus) => Promise<void>;
};
