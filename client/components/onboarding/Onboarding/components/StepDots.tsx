import { View } from "react-native";

import Touch from "@/components/ui/Pressable";

type StepDotsProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
  total: number;
};

export default function StepDots({ activeIndex, onSelect, total }: StepDotsProps) {
  return (
    <View className="flex-row items-center justify-center gap-2">
      {Array.from({ length: total }, (_, index) => (
        <Touch
          accessibilityLabel={`Đi tới bước ${index + 1}`}
          className={`h-2 rounded-full ${index === activeIndex ? "w-6 bg-emerald-800" : "w-2 bg-slate-200"}`}
          key={index}
          onPress={() => onSelect(index)}
        />
      ))}
    </View>
  );
}
