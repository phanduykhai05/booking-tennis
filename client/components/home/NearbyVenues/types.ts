export type VenueBadgeTone = "event" | "single";

export type VenueBadge = {
  id: string;
  label: string;
  tone: VenueBadgeTone;
};

export type VenueCoverKey = "football" | "pickleball" | "tennis";

export type VenueLogoKey = "badminton" | "football" | "pickleball" | "tennis";

export type Venue = {
  address: string;
  badges: VenueBadge[];
  cover: VenueCoverKey;
  distanceLabel: string;
  id: string;
  logo: VenueLogoKey;
  name: string;
  offerCount?: number;
  openingLabel: string;
  rating: number | null;
  productHref: string;
  sport: SportCategoryId;
};

export type VenuePreviewTab = {
  id: "images" | "information" | "membership" | "services";
  label: string;
};

export type VenuePreviewItem = {
  description: string;
  id: string;
  title: string;
};

export type NearbyVenuesContent = {
  bookLabel: string;
  favoriteLabel: string;
  matchLabel: string;
  offerLabel: string;
  previewBookLabel: string;
  previewCategories: string[];
  previewOpenLabel: string;
  previewPhone: string;
  previewRatingLabel: string;
  previewImages: string[];
  previewMemberships: VenuePreviewItem[];
  previewServices: VenuePreviewItem[];
  previewTabs: VenuePreviewTab[];
  previewVenueMark: string;
  sectionLabel: string;
};
import type { SportCategoryId } from "@/components/home/SportCategories/types";
