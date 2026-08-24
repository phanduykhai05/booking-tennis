import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import Button from "@/components/ui/Button";
import Screen from "@/components/ui/Screen";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <Screen backgroundColor="#f5f6f5">
      <View className="flex-1 items-center justify-center gap-4 px-6">
        <Text className="text-[19px] font-bold text-[#0b5133]">Không tìm thấy trang</Text>
        <Text className="text-center text-[14px] text-[#68716d]">Đường dẫn bạn mở không tồn tại hoặc đã bị gỡ.</Text>
        <Button label="Về trang chủ" onPress={() => router.replace("/")} />
      </View>
    </Screen>
  );
}
