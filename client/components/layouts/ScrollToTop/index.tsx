import { ArrowUp } from "lucide-react-native";
import { View } from "react-native";

import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type ScrollToTopProps = {
  isVisible: boolean;
  label: string;
  onPress: () => void;
};

/** Nút "lên đầu trang"; màn hình cha theo dõi vị trí cuộn rồi bật/tắt qua prop. */
export default function ScrollToTop({ isVisible, label, onPress }: ScrollToTopProps) {
  if (!isVisible) return null;

  return (
    <View className="absolute bottom-[92px] right-4 z-20">
      <Touch
        accessibilityLabel={label}
        accessibilityRole="button"
        className="h-10 w-10 items-center justify-center rounded-full bg-white"
        onPress={onPress}
        style={shadow.raised}
      >
        <ArrowUp color="#0f9b58" size={20} strokeWidth={2} />
      </Touch>
    </View>
  );
}
