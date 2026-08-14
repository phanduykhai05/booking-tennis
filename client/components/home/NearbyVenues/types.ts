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
};

export type NearbyVenuesContent = {
  bookLabel: string;
  favoriteLabel: string;
  matchLabel: string;
  offerLabel: string;
  sectionLabel: string;
};
