import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ArrowLeft, Heart, MapPin, Navigation, Share2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

import images from "@/components/assets/images";
import Touch from "@/components/ui/Pressable";

type ProductHeroProps = {
  address: string;
  bookLabel: string;
  onBook: () => void;
  venue: string;
};

export default function ProductHero({ address, bookLabel, onBook, venue }: ProductHeroProps) {
  const router = useRouter();

  return (
    <View className="h-[143px] overflow-hidden">
      <Image contentFit="cover" source={images.venueCovers.pickleball} style={{ height: "100%", width: "100%" }} />
      <LinearGradient
        colors={["rgba(0,18,21,0.14)", "rgba(0,24,25,0.7)"]}
        style={{ bottom: 0, left: 0, position: "absolute", right: 0, top: 0 }}
      />

      <Touch accessibilityLabel="Quay lại" className="absolute left-2 top-4 rounded-full p-1.5" onPress={() => router.navigate("/")}>
        <ArrowLeft color="#ffffff" size={20} />
      </Touch>

      <View className="absolute right-3 top-3 flex-row items-center gap-2">
        <Heart color="#ffdf1b" fill="#ffdf1b" size={23} style={{ backgroundColor: "#ed2d56", borderRadius: 999, padding: 1 }} />
        <View className="flex-row items-center gap-1">
          <Navigation color="#ffffff" size={13} />
          <Text className="text-[12px] text-white">Chỉ đường</Text>
        </View>
        <Touch accessibilityRole="link" className="rounded-full bg-[#efb91f] px-3 py-2" onPress={onBook}>
          <Text className="text-[12px] font-bold text-white">{bookLabel}</Text>
        </Touch>
      </View>

      <View className="absolute bottom-4 left-5 right-4 flex-row items-end gap-3">
        <View className="h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-white bg-[#f7f2d8]">
          <Text className="text-[12px] font-black text-[#006d37]">ĐTG</Text>
        </View>
        <View className="min-w-0 flex-1">
          <Text className="text-[17px] font-bold text-white" numberOfLines={1}>
            {venue}
          </Text>
          <View className="mt-1 flex-row items-center gap-1">
            <MapPin color="#ffffff" size={12} />
            <Text className="flex-1 text-[12px] text-white/90" numberOfLines={1}>
              {address}
            </Text>
          </View>
        </View>
        <View className="rounded-full bg-white/95 p-2">
          <Share2 color="#213b35" size={16} />
        </View>
      </View>
    </View>
  );
}
