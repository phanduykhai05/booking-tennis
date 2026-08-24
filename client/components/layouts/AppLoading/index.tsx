import { ActivityIndicator, Text, View } from "react-native";

import { appLoadingContent } from "@/components/layouts/AppLoading/content";
import { shadow } from "@/components/ui/theme";

export default function AppLoading() {
  return (
    <View accessibilityLabel={appLoadingContent.label} className="flex-1 items-center justify-center bg-[#f5f6f5] px-6">
      <View className="items-center gap-4">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-white" style={shadow.raised}>
          <View className="absolute inset-1 rounded-full border-[3px] border-[#d9f6e5]" />
          <ActivityIndicator color="#0f9b58" size="large" />
          <View className="absolute h-3 w-3 rounded-full bg-[#f4ca2d]" />
        </View>
        <Text className="text-[15px] font-semibold text-[#28734d]">{appLoadingContent.label}</Text>
      </View>
    </View>
  );
}
