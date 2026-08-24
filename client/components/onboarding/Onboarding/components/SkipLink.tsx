import { ChevronRight } from "lucide-react-native";
import { Text } from "react-native";

import Touch from "@/components/ui/Pressable";

type SkipLinkProps = {
  label: string;
  onPress: () => void;
};

export default function SkipLink({ label, onPress }: SkipLinkProps) {
  return (
    <Touch className="flex-row items-center gap-0.5" onPress={onPress}>
      <Text className="text-[15px] font-semibold text-emerald-700">{label}</Text>
      <ChevronRight color="#047857" size={16} />
    </Touch>
  );
}
