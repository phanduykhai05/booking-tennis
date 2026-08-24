import { ScrollView, Text } from "react-native";

import { nearbyFilters, nearbyFiltersLabel } from "@/components/home/NearbyFilters/content";
import type { SportCategoryId } from "@/components/home/SportCategories/types";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type NearbyFiltersProps = {
  activeId?: string | null;
  onChange?: (filterId: string, sport?: SportCategoryId) => void;
};

export default function NearbyFilters({ activeId, onChange }: NearbyFiltersProps) {
  return (
    <ScrollView
      accessibilityLabel={nearbyFiltersLabel}
      contentContainerClassName="flex-row items-center gap-2.5 px-3 pb-1 pt-4"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {nearbyFilters.map((filter) => {
        const isActive = activeId === filter.id;

        return (
          <Touch
            accessibilityRole="button"
            className={`h-9 items-center justify-center rounded-[10px] px-4 ${isActive ? "bg-[#008447]" : "border border-slate-900/[0.05] bg-white"}`}
            key={filter.id}
            onPress={() => onChange?.(filter.id, filter.sport)}
            style={shadow.card}
          >
            <Text className={`text-[14px] font-medium ${isActive ? "text-white" : "text-slate-600"}`}>{filter.label}</Text>
          </Touch>
        );
      })}
    </ScrollView>
  );
}
