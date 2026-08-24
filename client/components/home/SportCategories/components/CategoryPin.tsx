import { Image } from "expo-image";
import Svg, { Circle, Path } from "react-native-svg";
import { View } from "react-native";
import type { ImageSourcePropType } from "react-native";

import images from "@/components/assets/images";
import type { SportCategoryIcon } from "@/components/home/SportCategories/types";

type CategoryPinProps = {
  color: string;
  icon: SportCategoryIcon;
  scale?: number;
};

const sportImages: Record<SportCategoryIcon, ImageSourcePropType> = {
  athletics: images.sports.athletics,
  badminton: images.sports.badminton,
  basketball: images.sports.basketball,
  football: images.sports.football,
  pickleball: images.sports.pickleball,
  swimming: images.sports.swimming,
  tableTennis: images.sports.tableTennis,
  taekwondo: images.sports.taekwondo,
  tennis: images.sports.tennis,
  volleyball: images.sports.volleyball,
};

const pinBody =
  "M16 1.6c-7.5 0-13.6 6-13.6 13.5 0 9.9 11.8 24.6 12.3 25.2a1.7 1.7 0 0 0 2.6 0c.5-.6 12.3-15.3 12.3-25.2 0-7.5-6.1-13.5-13.6-13.5Z";

const BASE_WIDTH = 30.5;
const BASE_HEIGHT = 40;

/** Tỉ lệ 32:42 khớp viewBox của ghim, ảnh môn thể thao đặt trùng tâm vòng tròn trắng. */
export default function CategoryPin({ color, icon, scale = 1 }: CategoryPinProps) {
  const width = BASE_WIDTH * scale;
  const height = BASE_HEIGHT * scale;
  const badgeSize = width * 0.66;

  return (
    <View style={{ height, width }}>
      <Svg fill="none" height={height} viewBox="0 0 32 42" width={width}>
        <Path d={pinBody} fill={color} />
        {/* Vệt sáng dọc mép trên giúp ghim bớt phẳng. */}
        <Path d="M16 3.3c-5.5 0-10.2 3.4-12 8.2 2.5-3.7 6.9-6.1 12-6.1s9.5 2.4 12 6.1c-1.8-4.8-6.5-8.2-12-8.2Z" fill="#ffffff" opacity={0.24} />
        <Circle cx="16" cy="14.7" fill="#ffffff" r="9.8" />
      </Svg>
      <Image
        contentFit="contain"
        source={sportImages[icon]}
        style={{
          height: badgeSize,
          left: (width - badgeSize) / 2,
          position: "absolute",
          top: height * 0.35 - badgeSize / 2,
          width: badgeSize,
        }}
      />
    </View>
  );
}
