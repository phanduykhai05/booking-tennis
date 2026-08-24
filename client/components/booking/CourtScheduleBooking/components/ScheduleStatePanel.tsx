import { Text, View } from "react-native";

import Touch from "@/components/ui/Pressable";

type ScheduleStatePanelProps = {
  actionLabel?: string;
  message: string;
  onAction?: () => void;
};

export default function ScheduleStatePanel({ actionLabel, message, onAction }: ScheduleStatePanelProps) {
  return (
    <View className="min-h-[220px] items-center justify-center gap-3 border-y border-[#cfe6d8] bg-white px-6">
      <Text className="text-center text-[14px] text-[#124a31]">{message}</Text>
      {actionLabel && onAction ? (
        <Touch className="h-9 justify-center rounded-md border border-[#008447] px-4" onPress={onAction}>
          <Text className="text-[14px] font-semibold text-[#008447]">{actionLabel}</Text>
        </Touch>
      ) : null}
    </View>
  );
}
