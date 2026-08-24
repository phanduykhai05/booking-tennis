import Svg, { Path, Rect } from "react-native-svg";
import { View } from "react-native";

import Touch from "@/components/ui/Pressable";

type LanguageSelectorProps = {
  label: string;
};

function VietnamFlag() {
  return (
    <Svg height={24} viewBox="0 0 20 20" width={24}>
      <Rect fill="#da251d" height="20" width="20" />
      <Path d="M10 3 11.57 7.84 16.66 7.84 12.54 10.83 14.12 15.66 10 12.67 5.89 15.66 7.46 10.83 3.34 7.84 8.43 7.84Z" fill="#ffde00" />
    </Svg>
  );
}

export default function LanguageSelector({ label }: LanguageSelectorProps) {
  return (
    <Touch accessibilityLabel={label} accessibilityRole="button" className="h-6 w-6 shrink-0 overflow-hidden rounded-full">
      <View className="h-full w-full items-center justify-center">
        <VietnamFlag />
      </View>
    </Touch>
  );
}
