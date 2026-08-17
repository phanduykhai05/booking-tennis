export type VenueStatus = "active" | "inactive";
export type CourtStatus = "available" | "inactive" | "maintenance";
export type CourtSurface = "clay" | "hard" | "synthetic";
export type CustomerStatus = "active" | "inactive";
export type BookingStatus = "cancelled" | "checked-in" | "completed" | "confirmed" | "pending";
export type BookingSource = "counter" | "online";
export type PaymentStatus = "failed" | "paid" | "partial" | "refunded" | "unpaid";
export type PaymentMethod = "bank-transfer" | "card" | "cash" | "e-wallet";
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
  bookingId: string;
  createdAt: string;
  customerId: string;
  id: string;
  method: PaymentMethod;
  paidAt?: string;
  status: PaymentStatus;
  transactionCode: string;
};

export type ActivityEvent = {
  createdAt: string;
  entityId: string;
  id: string;
  message: string;
  type: ActivityType;
};

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
  errorMessage: string;
  isLoading: boolean;
  refresh: () => Promise<void>;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => Promise<void>;
  updateCourt: (courtId: string, payload: CourtPayload) => Promise<void>;
  updateCustomerStatus: (customerId: string, status: CustomerStatus) => Promise<void>;
  updatePaymentStatus: (paymentId: string, status: PaymentStatus) => Promise<void>;
};
