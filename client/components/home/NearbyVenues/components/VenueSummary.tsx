import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Clock } from "lucide-react-native";
import { Text, View } from "react-native";
import type { ImageSourcePropType } from "react-native";

import images from "@/components/assets/images";
import type { NearbyVenuesContent, Venue, VenueLogoKey } from "@/components/home/NearbyVenues/types";
import Touch from "@/components/ui/Pressable";

type VenueSummaryProps = {
  content: NearbyVenuesContent;
  onOpen: () => void;
  venue: Venue;
};

const logoImages: Record<VenueLogoKey, ImageSourcePropType> = {
  badminton: images.sports.badminton,
  football: images.sports.football,
  pickleball: images.sports.pickleball,
  tennis: images.sports.tennis,
};

export default function VenueSummary({ content, onOpen, venue }: VenueSummaryProps) {
  const router = useRouter();

  return (
    <View className="flex-row flex-wrap items-center gap-x-3 gap-y-2.5 px-3 py-3">
      <View className="h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-50">
        <Image contentFit="contain" source={logoImages[venue.logo]} style={{ height: 32, width: 32 }} />
      </View>

      <View className="min-w-[132px] flex-1">
        <Touch onPress={onOpen}>
          <Text className="text-[16px] font-bold text-[#12324f]" numberOfLines={1}>
            {venue.name}
          </Text>
        </Touch>
        <Text className="mt-0.5 text-[12px]" numberOfLines={1}>
          <Text className="font-semibold text-[#16a34a]">({venue.distanceLabel})</Text>{" "}
          <Text className="text-slate-500">{venue.address}</Text>
        </Text>
        <View className="mt-1 flex-row items-center gap-1">
          <Clock color="#64748b" size={14} strokeWidth={1.8} />
          <Text className="text-[12px] text-slate-500">{venue.openingLabel}</Text>
        </View>
      </View>

      <Touch
        accessibilityRole="link"
        className="h-8 shrink-0 items-center justify-center rounded-md bg-[#f0a01e] px-3.5"
        onPress={() => router.push(venue.productHref)}
      >
        <Text className="text-[12px] font-bold uppercase tracking-wide text-white">{content.bookLabel}</Text>
      </Touch>
    </View>
  );
}
