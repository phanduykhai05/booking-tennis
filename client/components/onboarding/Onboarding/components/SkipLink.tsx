import { ChevronRight } from "lucide-react";

import Touch from "@/components/ui/Pressable";

type SkipLinkProps = {
  label: string;
  onPress: () => void;
};

export default function SkipLink({ label, onPress }: SkipLinkProps) {
  return (
    <Touch className="flex-row items-center gap-0.5" onPress={onPress}>
      <span className="text-[15px] font-semibold text-emerald-700">{label}</span>
      <ChevronRight color="#047857" size={16} />
    </Touch>
  );
}
