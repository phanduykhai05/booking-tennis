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
    <div aria-label={nearbyFiltersLabel} className="grow shrink flex-row overflow-x-auto overflow-y-hidden [scrollbar-width:none]">
      <div className="flex-row items-center gap-[5px] px-[9px] pb-0 pt-2.5">
        {nearbyFilters.map((filter) => {
          const isActive = activeId === filter.id;

          return (
            <Touch
              className={`h-[33px] items-center justify-center rounded px-[10px] ${isActive ? "bg-[#008447]" : "bg-[#d1dad6]"}`}
              key={filter.id}
              onPress={() => onChange?.(filter.id, filter.sport)}
              style={shadow.card}
            >
              <span className={`text-[14px] font-medium ${isActive ? "text-white" : "text-[#004126]"}`}>{filter.label}</span>
            </Touch>
          );
        })}
      </div>
    </div>
  );
}
