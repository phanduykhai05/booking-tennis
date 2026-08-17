import type { SlotStatus } from "@/components/booking/CourtScheduleBooking/types";
import type { SportCategory } from "@/components/home/SportCategories/types";
import type { Venue } from "@/components/home/NearbyVenues/types";

export type ApiSportCategory = SportCategory;

export type ApiVenueListItem = Venue;

export type ApiVenueEvent = {
  available: string;
  court: string;
  date: string;
  endsAt: string;
  id: string;
  isLive: boolean;
  price: string;
  priceValue: number;
  startsAt: string;
  status: string;
  timeEnd: string;
  timeStart: string;
  title: string;
};

export type ApiVenuePreviewItem = { description: string; id: string; title: string };

export type ApiVenuePreview = {
  amenities: string[];
  categories: string[];
  description: string;
  gallery: string[];
  memberships: ApiVenuePreviewItem[];
  openingLabel: string;
  phone: string;
  services: ApiVenuePreviewItem[];
};

export type ApiVenueDetail = {
  address: string;
  badges: { id: string; label: string; tone: "event" | "single" }[];
  cover: string;
  directionsHref: string;
  events: ApiVenueEvent[];
  logo: string;
  mark: string;
  openingLabel: string;
  phone: string;
  preview: ApiVenuePreview;
  rating: number | null;
  slug: string;
  sport: string;
  venue: string;
};

export type ApiScheduleCourt = {
  id: string;
  isIndoor: boolean;
  name: string;
  status: "available" | "inactive" | "maintenance";
  surface: "clay" | "hard" | "synthetic";
};

export type ApiSchedule = {
  config: { endMinute: number; initialDate: string; slotMinutes: number; startMinute: number };
  entries: { courtId: string; endMinute: number; startMinute: number; status: Exclude<SlotStatus, "available">; title: string }[];
  groups: { courts: ApiScheduleCourt[]; id: string; name: string }[];
  priceRules: { endMinute: number; id: string; label: string; pricePerHour: number; startMinute: number }[];
  venue: { id: string; name: string; phone: string };
};

export type ApiBooking = {
  code: string;
  courtName: string;
  createdAt: string;
  date: string;
  endMinute: number;
  id: string;
  note: string | null;
  paymentStatus: "failed" | "paid" | "partial" | "refunded" | "unpaid";
  priceLabel: string;
  source: "counter" | "online";
  startMinute: number;
  status: "cancelled" | "checked-in" | "completed" | "confirmed" | "pending";
  timeEnd: string;
  timeStart: string;
  totalPrice: number;
  venueId: string;
  venueName: string;
};

export type ApiProfile = {
  avatarInitial: string;
  birthYear: number | null;
  email: string | null;
  fullName: string;
  gender: string | null;
  heightCm: number | null;
  id: string;
  joinedAt: string;
  note: string | null;
  phone: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  weightKg: number | null;
};

export type ApiSession = { token: string; user: ApiProfile };

export type ApiNotification = {
  createdAt: string;
  id: string;
  isRead: boolean;
  kind: "booking" | "promotion" | "system";
  message: string;
  time: string;
  title: string;
};

export type ApiDiscoverPost = {
  date: string;
  id: string;
  labels: string[];
  publishedAt: string;
  type: "course" | "empty-court" | "event" | "member" | "offer";
  venue: string;
};

export type ApiMapMarker = {
  id: string;
  isFeatured?: boolean;
  latitude: number;
  longitude: number;
  name: string;
  sport: string;
};
