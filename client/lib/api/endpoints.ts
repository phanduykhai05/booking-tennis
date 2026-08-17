import { apiFetch } from "@/lib/api/http";
import type {
  ApiBooking,
  ApiDiscoverPost,
  ApiMapMarker,
  ApiNotification,
  ApiProfile,
  ApiSchedule,
  ApiSession,
  ApiSportCategory,
  ApiVenueDetail,
  ApiVenueListItem,
} from "@/lib/api/types";

type BookingSlotInput = { courtId: string; endMinute: number; startMinute: number };

const query = (params: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }

  const value = search.toString();
  return value ? `?${value}` : "";
};

export const getSports = () => apiFetch<ApiSportCategory[]>("/sports", { revalidate: 3600 });

export const getVenues = (params: { lat?: number; lng?: number; q?: string; sport?: string } = {}) =>
  apiFetch<ApiVenueListItem[]>(`/venues${query(params)}`);

export const getVenue = (venueId: string) => apiFetch<ApiVenueDetail>(`/venues/${venueId}`);

export const getVenueSchedule = (venueId: string, date: string) =>
  apiFetch<ApiSchedule>(`/venues/${venueId}/schedule${query({ date })}`);

export const getMapMarkers = () => apiFetch<ApiMapMarker[]>("/venues/map", { revalidate: 600 });

export const getDiscoverPosts = (type?: string) =>
  apiFetch<ApiDiscoverPost[]>(`/discover/posts${query({ type })}`);

export const login = (body: { email?: string; password: string; phone?: string }) =>
  apiFetch<ApiSession>("/auth/login", { body, method: "POST" });

export const register = (body: { email?: string; fullName: string; password: string; phone: string }) =>
  apiFetch<ApiSession>("/auth/register", { body, method: "POST" });

export const forgotPassword = (body: { email?: string; phone?: string }) =>
  apiFetch<{ code: string; expiresInMinutes: number; sentTo: string }>("/auth/forgot-password", {
    body,
    method: "POST",
  });

export const resetPassword = (body: { account: string; code: string; password: string }) =>
  apiFetch<{ success: boolean }>("/auth/reset-password", { body, method: "POST" });

export const getProfile = (token: string) => apiFetch<ApiProfile>("/account/profile", { token });

export const updateProfile = (token: string, body: Partial<Omit<ApiProfile, "id" | "joinedAt" | "phone" | "role" | "status">>) =>
  apiFetch<ApiProfile>("/account/profile", { body, method: "PATCH", token });

export const getMyBookings = (token: string, date?: string) =>
  apiFetch<ApiBooking[]>(`/bookings${query({ date })}`, { token });

export const createBooking = (
  token: string,
  body: { date: string; note?: string; slots: BookingSlotInput[]; venueId: string },
) => apiFetch<{ bookings: ApiBooking[]; total: number }>("/bookings", { body, method: "POST", token });

export const cancelBooking = (token: string, bookingId: string) =>
  apiFetch<ApiBooking>(`/bookings/${bookingId}/cancel`, { method: "PATCH", token });

export const getNotifications = (token: string) =>
  apiFetch<ApiNotification[]>("/notifications", { token });

export const markNotificationsRead = (token: string) =>
  apiFetch<{ updated: number }>("/notifications/read-all", { method: "PATCH", token });

export const markNotificationRead = (token: string, notificationId: string) =>
  apiFetch<{ updated: number }>(`/notifications/${notificationId}/read`, { method: "PATCH", token });

export const buyEventTicket = (token: string, eventId: string, body: { phone: string; quantity: number }) =>
  apiFetch<{ error?: string; id?: string; quantity?: number; success: boolean; totalPrice?: number }>(
    `/events/${eventId}/tickets`,
    { body, method: "POST", token },
  );
