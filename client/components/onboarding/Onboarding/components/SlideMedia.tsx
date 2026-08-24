import { Image } from "expo-image";
import { View } from "react-native";
import type { ImageSourcePropType } from "react-native";

type SlideMediaProps = {
  image: ImageSourcePropType;
};

export default function SlideMedia({ image }: SlideMediaProps) {
  return (
    <View className="aspect-[23/20] w-full max-w-[280px] overflow-hidden rounded-[28px]">
      <Image contentFit="cover" source={image} style={{ height: "100%", width: "100%" }} />
    </View>
  );
}
