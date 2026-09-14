import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

import images from "@/components/assets/images";

/** Nền header: dải xanh chéo, tranh vận động viên làm vân mờ và hai quầng sáng ở hai góc. */
export default function HeaderBackdrop() {
  return (
    <View className="absolute inset-0 overflow-hidden" pointerEvents="none">
      <LinearGradient
        colors={["#18b667", "#0f9b58", "#097a4f"]}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.46, 1]}
        start={{ x: 0, y: 0 }}
        style={{ bottom: 0, left: 0, position: "absolute", right: 0, top: 0 }}
      />
      <Image contentFit="cover" source={images.homeHeader} style={{ bottom: 0, left: 0, opacity: 0.22, position: "absolute", right: 0, top: 0 }} />
      <View className="absolute -right-24 -top-40 h-[420px] w-[420px] rounded-full bg-[#d4f78c]/15" />
      <View className="absolute -bottom-40 -left-28 h-[420px] w-[420px] rounded-full bg-[#02452f]/20" />
      <View className="absolute inset-x-0 top-0 h-px bg-white/25" />
    </View>
  );
}
