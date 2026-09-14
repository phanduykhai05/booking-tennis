import { useRouter } from "expo-router";
import Svg, { Circle, Defs, Ellipse, G, LinearGradient, Rect, Stop } from "react-native-svg";
import { View } from "react-native";

import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type HeaderLogoProps = {
  brandName: string;
  href?: string;
  size?: number;
};

function PaddleMark({ size }: { size: number }) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 40 40" width={size}>
      <Defs>
        <LinearGradient id="public-header-paddle" x1="0" x2="1" y1="0" y2="1">
          <Stop offset="0%" stopColor="#2ecb77" />
          <Stop offset="100%" stopColor="#07854f" />
        </LinearGradient>
      </Defs>
      <G transform="rotate(-32 20 20)">
        <Rect fill="url(#public-header-paddle)" height="14" rx="3.2" width="6.4" x="16.8" y="21" />
        <Ellipse cx="20" cy="14.5" fill="url(#public-header-paddle)" rx="11.5" ry="12.5" />
        <G fill="#ffffff" opacity="0.92">
          <Circle cx="15.6" cy="11" r="1.5" />
          <Circle cx="21.4" cy="9.4" r="1.5" />
          <Circle cx="24.6" cy="14.6" r="1.5" />
          <Circle cx="18.6" cy="16.6" r="1.5" />
          <Circle cx="13.6" cy="17" r="1.5" />
          <Circle cx="21.6" cy="21.6" r="1.5" />
        </G>
      </G>
    </Svg>
  );
}

export default function HeaderLogo({ brandName, href = "/", size = 48 }: HeaderLogoProps) {
  const router = useRouter();

  return (
    <Touch
      accessibilityLabel={brandName}
      accessibilityRole="link"
      className="shrink-0 items-center justify-center rounded-full bg-white"
      onPress={() => router.navigate(href)}
      style={[{ height: size, width: size }, shadow.raised]}
    >
      <View>
        <PaddleMark size={size * 0.68} />
      </View>
    </Touch>
  );
}
