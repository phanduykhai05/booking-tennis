import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BottomNavigation from "@/components/layouts/PublicFooter/components/BottomNavigation";
import { bottomNavigationItems, publicFooterLabel } from "@/components/layouts/PublicFooter/mockData";
import { shadow } from "@/components/ui/theme";

type PublicFooterProps = {
  activeItemId?: string;
};

/** Chiều cao phần thanh điều hướng (chưa tính safe area) để nội dung phía trên chừa đúng khoảng. */
export const publicFooterHeight = 70;

export default function PublicFooter({ activeItemId = "home" }: PublicFooterProps) {
  const insets = useSafeAreaInsets();
  const items = bottomNavigationItems.map((item) => ({ ...item, isActive: item.id === activeItemId }));

  return (
    <View
      accessibilityLabel={publicFooterLabel}
      className="absolute inset-x-0 bottom-0 bg-white"
      // Safe-area đặt ở lớp bọc: nhét vào trong nav cao cố định sẽ bóp nội dung trên máy có notch.
      style={[{ paddingBottom: insets.bottom }, shadow.raised]}
    >
      <BottomNavigation items={items} />
    </View>
  );
}
