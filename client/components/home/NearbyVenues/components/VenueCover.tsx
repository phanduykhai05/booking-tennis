import { Image } from "expo-image";
import { Heart, Users } from "lucide-react-native";
import { View } from "react-native";

import images from "@/components/assets/images";
import PromotionBadge from "@/components/home/NearbyVenues/components/PromotionBadge";
import { RatingBadge, VenueBadge } from "@/components/home/NearbyVenues/components/VenueBadge";
import type { NearbyVenuesContent, Venue } from "@/components/home/NearbyVenues/types";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type VenueCoverProps = {
  content: NearbyVenuesContent;
  onOpen: () => void;
  venue: Venue;
};

export default function VenueCover({ content, onOpen, venue }: VenueCoverProps) {
  return (
    <Touch accessibilityLabel={`Xem thông tin ${venue.name}`} className="aspect-[2/1] w-full overflow-hidden bg-slate-100" onPress={onOpen}>
      <Image contentFit="cover" source={images.venueCovers[venue.cover]} style={{ height: "100%", width: "100%" }} />

      <View className="absolute inset-x-2 top-2 flex-row items-start justify-between gap-2">
        {/* Các pill chồng mép lên nhau: pill trước luôn nằm trên pill sau. */}
        <View className="min-w-0 flex-row items-start">
          <View style={{ zIndex: venue.badges.length + 1 }}>
            <RatingBadge rating={venue.rating} />
          </View>
          {venue.badges.map((badge, index) => (
            <View className="-ml-2" key={badge.id} style={{ zIndex: venue.badges.length - index }}>
              <VenueBadge badge={badge} />
            </View>
          ))}
        </View>

        <View className="shrink-0 items-end gap-1.5">
          <View className="flex-row items-center gap-1.5">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white" style={shadow.card}>
              <Heart color="#475569" size={18} strokeWidth={1.8} />
            </View>
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white" style={shadow.card}>
              <Users color="#475569" size={18} strokeWidth={1.8} />
            </View>
          </View>
          {venue.offerCount ? <PromotionBadge count={venue.offerCount} label={content.offerLabel} /> : null}
        </View>
      </View>
    </Touch>
  );
}
