import { Image } from "expo-image";
import { useState } from "react";
import { View } from "react-native";

import images from "@/components/assets/images";
import NearbyFilters from "@/components/home/NearbyFilters";
import NearbyVenues from "@/components/home/NearbyVenues";
import type { Venue } from "@/components/home/NearbyVenues/types";
import SportCategories from "@/components/home/SportCategories";
import type { SportCategory, SportCategoryId } from "@/components/home/SportCategories/types";

type VenueFilterContentProps = {
  showPromotion?: boolean;
  sports: SportCategory[];
  venues: Venue[];
};

export default function VenueFilterContent({ showPromotion = false, sports, venues }: VenueFilterContentProps) {
  const [activeNearbyFilter, setActiveNearbyFilter] = useState<string | null>(null);
  const [activeSport, setActiveSport] = useState<SportCategoryId | null>(null);
  const isFiltering = activeNearbyFilter !== null || activeSport !== null;

  const selectNearbyFilter = (filterId: string, sport?: SportCategoryId) => {
    if (activeNearbyFilter === filterId) {
      setActiveNearbyFilter(null);
      setActiveSport(null);
      return;
    }

    setActiveNearbyFilter(filterId);
    setActiveSport(sport ?? null);
  };

  const selectSport = (sportId: SportCategoryId) => {
    setActiveNearbyFilter(null);
    setActiveSport((currentSport) => (currentSport === sportId ? null : sportId));
  };

  return (
    <View>
      <NearbyFilters activeId={activeNearbyFilter} onChange={selectNearbyFilter} />
      <SportCategories activeId={activeSport} categories={sports} onSelect={selectSport} />

      {showPromotion && !isFiltering ? (
        <View className="px-4 pb-2">
          <Image
            contentFit="cover"
            source={images.alobo.acaCover}
            style={{ aspectRatio: 2.2, borderRadius: 12, width: "100%" }}
          />
        </View>
      ) : null}

      <NearbyVenues sport={activeSport} venues={venues} />
    </View>
  );
}
