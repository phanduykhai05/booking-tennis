import type {
  AdminDataState,
  BookingStatus,
  CourtPayload,
  CreateBookingPayload,
  CustomerStatus,
  PaymentStatus,
} from "@/components/admin/AdminData/types";
import { apiFetch } from "@/lib/api/http";

export const getAdminData = (token: string) => apiFetch<AdminDataState>("/admin/data", { token });

export const adminCreateCourt = (token: string, payload: CourtPayload) =>
  apiFetch<{ id: string }>("/admin/courts", { body: payload, method: "POST", token });

export const adminUpdateCourt = (token: string, courtId: string, payload: CourtPayload) =>
  apiFetch<{ id: string }>(`/admin/courts/${courtId}`, { body: payload, method: "PUT", token });

export const adminCreateBooking = (token: string, payload: CreateBookingPayload) =>
  apiFetch<{ code: string; id: string }>("/admin/bookings", {
    body: { ...payload, note: payload.note || undefined },
    method: "POST",
    token,
  });

export const adminUpdateBookingStatus = (token: string, bookingId: string, status: BookingStatus) =>
  apiFetch<{ id: string }>(`/admin/bookings/${bookingId}/status`, { body: { status }, method: "PATCH", token });

export const adminUpdatePaymentStatus = (token: string, paymentId: string, status: PaymentStatus) =>
  apiFetch<{ id: string }>(`/admin/payments/${paymentId}/status`, { body: { status }, method: "PATCH", token });

export const adminUpdateCustomerStatus = (token: string, customerId: string, status: CustomerStatus) =>
  apiFetch<{ id: string }>(`/admin/customers/${customerId}/status`, { body: { status }, method: "PATCH", token });
