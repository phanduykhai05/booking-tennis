import { Text, View } from "react-native";

type SlideTextProps = {
  description: string;
  title: string;
};

export default function SlideText({ description, title }: SlideTextProps) {
  return (
    <View className="items-center gap-3 px-6">
      <Text className="text-center text-[21px] font-bold text-slate-900">{title}</Text>
      <Text className="text-center text-[15px] text-slate-500">{description}</Text>
    </View>
  );
}
