import type { SportCategoryIcon } from "@/components/home/SportCategories/types";

export type CourtMapMarker = {
  href: string;
  id: string;
  isFeatured?: boolean;
  latitude: number;
  longitude: number;
  name: string;
  sport: SportCategoryIcon;
};

export type CourtMapFilter = {
  id: SportCategoryIcon;
  label: string;
};

export type CourtMapContent = {
  currentLocationLabel: string;
  geolocationUnavailableMessage: string;
  layersLabel: string;
  mapAttribution: string;
  searchInputLabel: string;
  searchPlaceholder: string;
  searchSubmitLabel: string;
  unavailableMapMessage: string;
};
