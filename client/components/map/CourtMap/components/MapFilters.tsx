
import CategoryPin from "@/components/home/SportCategories/components/CategoryPin";
import type { SportCategoryIcon } from "@/components/home/SportCategories/types";
import type { CourtMapFilter } from "@/components/map/CourtMap/types";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type MapFiltersProps = {
  activeId: SportCategoryIcon | null;
  filters: CourtMapFilter[];
  onSelect: (id: SportCategoryIcon) => void;
};

const pinColors: Record<SportCategoryIcon, string> = {
  athletics: "#e11d48",
  badminton: "#0f9b58",
  basketball: "#d97706",
  football: "#16a34a",
  pickleball: "#2563eb",
  swimming: "#0891b2",
  tableTennis: "#db2777",
  taekwondo: "#4f46e5",
  tennis: "#ea580c",
  volleyball: "#7c3aed",
};

export default function MapFilters({ activeId, filters, onSelect }: MapFiltersProps) {
  return (
    <div className="absolute left-0 right-0 top-[72px] lg:left-[596px] lg:top-[18px]">
      <div className="grow shrink flex-row overflow-x-auto overflow-y-hidden [scrollbar-width:none]">
        <div className="flex-row gap-2 px-3">
          {filters.map((filter) => {
            const isActive = activeId === filter.id;

            return (
              <Touch
                aria-pressed={isActive}
                className={`h-9 flex-row items-center gap-1.5 rounded-full py-1 pl-1 pr-3 ${isActive ? "bg-[#008447]" : "bg-white"}`}
                key={filter.id}
                onPress={() => onSelect(filter.id)}
                style={shadow.card}
              >
                <CategoryPin color={pinColors[filter.id]} icon={filter.id} scale={0.6} />
                <span className={`text-[14px] font-medium ${isActive ? "text-white" : "text-slate-700"}`}>{filter.label}</span>
              </Touch>
            );
          })}
        </div>
      </div>
    </div>
  );
}
