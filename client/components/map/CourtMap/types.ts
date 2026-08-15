import type { SportCategoryIcon } from "@/components/home/SportCategories/types";

export type CourtMapMarker = {
  id: string;
  isFeatured?: boolean;
  latitude: number;
  longitude: number;
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
