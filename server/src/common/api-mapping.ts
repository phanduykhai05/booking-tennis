/**
 * Bảng quy đổi enum của Prisma sang đúng chuỗi mà client đang dùng trong
 * `components/**\/types.ts`. Mọi response đi ra ngoài đều phải đi qua đây để
 * client không cần viết thêm lớp chuyển đổi nào.
 */
import {
  ActivityType,
  BookingSource,
  BookingStatus,
  CourtBlockKind,
  CourtStatus,
  CourtSurface,
  DiscoverPostType,
  NotificationKind,
  PaymentMethod,
  PaymentStatus,
  UserStatus,
  VenueBadgeTone,
  VenueStatus,
} from '../generated/prisma/enums';

const invert = <T extends Record<string, string>>(map: T) =>
  Object.fromEntries(
    Object.entries(map).map(([key, value]) => [value, key]),
  ) as {
    [K in keyof T as T[K]]: K;
  };

export const bookingStatusToApi = {
  CANCELLED: 'cancelled',
  CHECKED_IN: 'checked-in',
  COMPLETED: 'completed',
  CONFIRMED: 'confirmed',
  PENDING: 'pending',
} as const satisfies Record<BookingStatus, string>;

export const bookingSourceToApi = {
  COUNTER: 'counter',
  ONLINE: 'online',
} as const satisfies Record<BookingSource, string>;

export const paymentStatusToApi = {
  FAILED: 'failed',
  PAID: 'paid',
  PARTIAL: 'partial',
  REFUNDED: 'refunded',
  UNPAID: 'unpaid',
} as const satisfies Record<PaymentStatus, string>;

export const paymentMethodToApi = {
  BANK_TRANSFER: 'bank-transfer',
  CARD: 'card',
  CASH: 'cash',
  E_WALLET: 'e-wallet',
} as const satisfies Record<PaymentMethod, string>;

export const courtStatusToApi = {
  AVAILABLE: 'available',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
} as const satisfies Record<CourtStatus, string>;

export const courtSurfaceToApi = {
  CLAY: 'clay',
  HARD: 'hard',
  SYNTHETIC: 'synthetic',
} as const satisfies Record<CourtSurface, string>;

export const courtBlockKindToApi = {
  EVENT: 'event',
  LOCKED: 'locked',
} as const satisfies Record<CourtBlockKind, string>;

export const userStatusToApi = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const satisfies Record<UserStatus, string>;

export const venueStatusToApi = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const satisfies Record<VenueStatus, string>;

export const venueBadgeToneToApi = {
  EVENT: 'event',
  SINGLE: 'single',
} as const satisfies Record<VenueBadgeTone, string>;

export const notificationKindToApi = {
  BOOKING: 'booking',
  PROMOTION: 'promotion',
  SYSTEM: 'system',
} as const satisfies Record<NotificationKind, string>;

export const discoverPostTypeToApi = {
  COURSE: 'course',
  EMPTY_COURT: 'empty-court',
  EVENT: 'event',
  MEMBER: 'member',
  OFFER: 'offer',
} as const satisfies Record<DiscoverPostType, string>;

export const activityTypeToApi = {
  BOOKING_CREATED: 'booking-created',
  BOOKING_UPDATED: 'booking-updated',
  COURT_UPDATED: 'court-updated',
  PAYMENT_UPDATED: 'payment-updated',
} as const satisfies Record<ActivityType, string>;

export const bookingStatusFromApi = invert(bookingStatusToApi);
export const paymentStatusFromApi = invert(paymentStatusToApi);
export const paymentMethodFromApi = invert(paymentMethodToApi);
export const courtStatusFromApi = invert(courtStatusToApi);
export const courtSurfaceFromApi = invert(courtSurfaceToApi);
export const userStatusFromApi = invert(userStatusToApi);
export const bookingSourceFromApi = invert(bookingSourceToApi);

export type ApiBookingStatus = (typeof bookingStatusToApi)[BookingStatus];
export type ApiPaymentStatus = (typeof paymentStatusToApi)[PaymentStatus];
export type ApiCourtStatus = (typeof courtStatusToApi)[CourtStatus];
export type ApiCourtSurface = (typeof courtSurfaceToApi)[CourtSurface];
export type ApiSlotStatus = 'available' | 'booked' | 'event' | 'locked';
