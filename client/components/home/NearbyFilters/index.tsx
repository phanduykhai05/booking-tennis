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
      <div className="flex-row items-center gap-2.5 px-3 pb-1 pt-4">
        {nearbyFilters.map((filter) => {
          const isActive = activeId === filter.id;

          return (
            <Touch
              className={`h-9 items-center justify-center rounded-[10px] px-4 ${isActive ? "bg-[#008447]" : "border border-slate-900/[0.05] bg-white"}`}
              key={filter.id}
              onPress={() => onChange?.(filter.id, filter.sport)}
              style={shadow.card}
            >
              <span className={`text-[14px] font-medium ${isActive ? "text-white" : "text-slate-600"}`}>{filter.label}</span>
            </Touch>
          );
        })}
      </div>
    </div>
  );
}
