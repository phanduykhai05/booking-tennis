import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import type { HeaderAction } from "@/components/layouts/PublicHeader/types";
import Touch from "@/components/ui/Pressable";

type HeaderActionsProps = {
  actions: HeaderAction[];
};

const variantContainer: Record<HeaderAction["id"], string> = {
  login: "bg-white",
  register: "border border-white/55 bg-white/10",
};

const variantLabel: Record<HeaderAction["id"], string> = {
  login: "text-[#0b7a4a]",
  register: "text-white",
};

export default function HeaderActions({ actions }: HeaderActionsProps) {
  const router = useRouter();

  return (
    <View className="w-full max-w-[300px] flex-row gap-2.5">
      {actions.map((action) => (
        <Touch
          accessibilityRole="link"
          className={`h-9 flex-1 items-center justify-center rounded-lg px-4 ${variantContainer[action.id]}`}
          key={action.id}
          onPress={() => action.href && router.push(action.href)}
        >
          <Text className={`text-[14px] font-semibold ${variantLabel[action.id]}`}>{action.label}</Text>
        </Touch>
      ))}
    </View>
  );
}
