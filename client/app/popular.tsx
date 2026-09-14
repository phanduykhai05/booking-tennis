import { Text, View } from "react-native";

import PublicFooter from "@/components/layouts/PublicFooter";
import Screen from "@/components/ui/Screen";

/** Mục "Nổi bật" đã có trên thanh điều hướng nhưng chưa có contract dữ liệu; giữ chỗ để link không chết. */
export default function PopularScreen() {
  return (
    <Screen backgroundColor="#f5f6f5">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-[17px] font-bold text-[#0b5133]">Nổi bật</Text>
        <Text className="mt-2 text-center text-[14px] text-[#68716d]">
          Nội dung nổi bật sẽ hiển thị ở đây khi API cung cấp danh sách.
        </Text>
      </View>
      <PublicFooter activeItemId="popular" />
    </Screen>
  );
}
