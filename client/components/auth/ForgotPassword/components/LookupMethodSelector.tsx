import { Text, View } from "react-native";

import type { AccountLookupMethod } from "@/components/auth/ForgotPassword/types";
import Touch from "@/components/ui/Pressable";

type LookupMethodSelectorProps = {
  activeMethod: AccountLookupMethod;
  emailLabel: string;
  onSelect: (method: AccountLookupMethod) => void;
  phoneLabel: string;
  title: string;
};

export default function LookupMethodSelector({ activeMethod, emailLabel, onSelect, phoneLabel, title }: LookupMethodSelectorProps) {
  const methods = [
    { id: "email" as const, label: emailLabel },
    { id: "phone" as const, label: phoneLabel },
  ];

  return (
    <View>
      <Text className="mb-2.5 text-[16px] font-bold text-[#034f30]">{title}</Text>
      <View className="flex-row gap-2.5">
        {methods.map((method) => {
          const isActive = method.id === activeMethod;

          return (
            <Touch
              accessibilityRole="radio"
              accessibilityState={{ selected: isActive }}
              className={`h-11 flex-1 flex-row items-center gap-2 rounded-md border px-3 ${isActive ? "border-[#00b976] bg-[#ecfcf6]" : "border-[#d4d4d4] bg-white"}`}
              key={method.id}
              onPress={() => onSelect(method.id)}
            >
              <View
                className={`h-4 w-4 items-center justify-center rounded-full border ${isActive ? "border-[#00b976]" : "border-[#d2d2d2]"}`}
              >
                {isActive ? <View className="h-2 w-2 rounded-full bg-[#00b976]" /> : null}
              </View>
              <Text className={`text-[14px] font-semibold ${isActive ? "text-[#007a47]" : "text-[#164431]"}`}>{method.label}</Text>
            </Touch>
          );
        })}
      </View>
    </View>
  );
}
