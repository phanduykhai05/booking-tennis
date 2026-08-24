import { useState } from "react";
import { Text, View } from "react-native";

import VenueCard from "@/components/home/NearbyVenues/components/VenueCard";
import VenuePreviewSheet from "@/components/home/NearbyVenues/components/VenuePreviewSheet";
import { nearbyVenuesContent } from "@/components/home/NearbyVenues/content";
import type { Venue } from "@/components/home/NearbyVenues/types";
import type { SportCategoryId } from "@/components/home/SportCategories/types";

type NearbyVenuesProps = {
  sport?: SportCategoryId | null;
  venues: Venue[];
};

export default function NearbyVenues({ sport = null, venues }: NearbyVenuesProps) {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const visibleVenues = sport ? venues.filter((venue) => venue.sport === sport) : venues;

  return (
    <View accessibilityLabel={nearbyVenuesContent.sectionLabel} className="gap-3 px-3 pb-6">
      {visibleVenues.map((venue) => (
        <VenueCard content={nearbyVenuesContent} key={venue.id} onOpen={() => setSelectedVenue(venue)} venue={venue} />
      ))}

      {visibleVenues.length === 0 ? (
        <Text className="py-12 text-center text-[15px] text-[#637169]">Chưa có sân phù hợp với bộ môn này.</Text>
      ) : null}

      {selectedVenue ? (
        <VenuePreviewSheet content={nearbyVenuesContent} onClose={() => setSelectedVenue(null)} venue={selectedVenue} />
      ) : null}
    </View>
  );
}
