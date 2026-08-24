import { View } from "react-native";

import VenueCover from "@/components/home/NearbyVenues/components/VenueCover";
import VenueSummary from "@/components/home/NearbyVenues/components/VenueSummary";
import type { NearbyVenuesContent, Venue } from "@/components/home/NearbyVenues/types";
import { shadow } from "@/components/ui/theme";

type VenueCardProps = {
  content: NearbyVenuesContent;
  onOpen: () => void;
  venue: Venue;
};

export default function VenueCard({ content, onOpen, venue }: VenueCardProps) {
  return (
    <View className="overflow-hidden rounded-xl bg-white" style={shadow.card}>
      <VenueCover content={content} onOpen={onOpen} venue={venue} />
      <VenueSummary content={content} onOpen={onOpen} venue={venue} />
    </View>
  );
}
