import type { NearbyFilter } from "@/components/home/NearbyFilters/types";

export const nearbyFiltersLabel = "Gợi ý gần tôi";

export const nearbyFilters: NearbyFilter[] = [
  { id: "badminton-nearby", label: "Cầu lông gần tôi", sport: "badminton" },
  { id: "pickleball-nearby", label: "Pickleball gần tôi", sport: "pickleball" },
  { id: "resale-nearby", label: "Xé vé gần tôi" },
];
