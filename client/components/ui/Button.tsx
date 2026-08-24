import { ActivityIndicator, Text, View } from "react-native";
import type { ReactNode } from "react";

import Touch from "@/components/ui/Pressable";

export type ButtonTone = "danger" | "ghost" | "outline" | "primary" | "warning";

type ButtonProps = {
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  isLoading?: boolean;
  label: string;
  onPress: () => void;
  size?: "large" | "medium" | "small";
  tone?: ButtonTone;
};

const toneContainer: Record<ButtonTone, string> = {
  danger: "bg-[#e0574f]",
  ghost: "bg-transparent",
  outline: "border border-[#008447] bg-white",
  primary: "bg-[#087a46]",
  warning: "bg-[#e3b32a]",
};

const toneLabel: Record<ButtonTone, string> = {
  danger: "text-white",
  ghost: "text-[#008447]",
  outline: "text-[#008447]",
  primary: "text-white",
  warning: "text-white",
};

const sizeContainer = {
  large: "h-12 px-5",
  medium: "h-11 px-4",
  small: "h-9 px-3",
};

const sizeLabel = {
  large: "text-[16px]",
  medium: "text-[15px]",
  small: "text-[13px]",
};

export default function Button({
  disabled,
  fullWidth,
  icon,
  isLoading,
  label,
  onPress,
  size = "medium",
  tone = "primary",
}: ButtonProps) {
  const isDisabled = Boolean(disabled) || Boolean(isLoading);

  return (
    <Touch
      accessibilityLabel={label}
      accessibilityRole="button"
      className={`flex-row items-center justify-center gap-2 rounded-lg ${sizeContainer[size]} ${toneContainer[tone]} ${fullWidth ? "w-full" : ""} ${isDisabled ? "bg-[#e2e5e3]" : ""}`}
      disabled={isDisabled}
      onPress={onPress}
    >
      {isLoading ? <ActivityIndicator color={tone === "outline" || tone === "ghost" ? "#008447" : "#ffffff"} size="small" /> : icon ? <View>{icon}</View> : null}
      <Text className={`font-bold ${sizeLabel[size]} ${isDisabled ? "text-[#a2aaa5]" : toneLabel[tone]}`}>{label}</Text>
    </Touch>
  );
}
