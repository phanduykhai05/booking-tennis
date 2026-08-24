import { Image } from "expo-image";
import { Text, View } from "react-native";

import images from "@/components/assets/images";
import { shadow } from "@/components/ui/theme";

type PromotionBadgeProps = {
  count: number;
  label: string;
};

// Hình fire.png có phần lửa là vùng TRONG SUỐT khoét trên nền đỏ, nên icon đứng
// riêng (không nền) còn chữ "Ưu đãi" mới có nền đỏ nối tiếp ngay sau để tạo cảm
// giác một dải ribbon liền mạch. Icon cao hơn thanh và neo đáy để ngọn lửa tràn lên.
export default function PromotionBadge({ count, label }: PromotionBadgeProps) {
  return (
    <View className="w-[112px] shrink-0">
      <View className="h-[21px] w-full flex-row items-center overflow-hidden rounded-md" style={shadow.card}>
        <View className="w-[54px] shrink-0" />
        <View className="h-full flex-1 justify-center bg-[#f3090c] pl-1">
          <Text className="text-[11px] font-bold text-white">{label}</Text>
        </View>
      </View>
      <Image
        contentFit="contain"
        contentPosition="bottom"
        source={images.icons.fire}
        style={{ bottom: 0, height: 29, left: 0, position: "absolute", width: 54 }}
      />
      <View className="absolute -right-1.5 -top-1.5 h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#f0a01e]">
        <Text className="text-[9px] font-bold text-white">{count}</Text>
      </View>
    </View>
  );
}
