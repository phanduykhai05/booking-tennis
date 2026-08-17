"use client";

import CategoryPin from "@/components/home/SportCategories/components/CategoryPin";
import type { CourtMapFilter } from "@/components/map/CourtMap/types";
import type { SportCategoryIcon } from "@/components/home/SportCategories/types";

type MapFiltersProps = {
  activeId: SportCategoryIcon | null;
  filters: CourtMapFilter[];
  onSelect: (id: SportCategoryIcon) => void;
};

export default function MapFilters({ activeId, filters, onSelect }: MapFiltersProps) {
  return (
    <nav aria-label="Lọc theo bộ môn" className="absolute left-0 right-0 top-[72px] z-[1001] overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <ul className="flex w-max gap-2">
        {filters.map((filter) => {
          const isActive = activeId === filter.id;
          return (
            <li key={filter.id}>
              <button
                aria-pressed={isActive}
                className={`flex h-9 items-center gap-1.5 rounded-full py-1 pl-1 pr-3 text-sm font-medium shadow-[0_2px_8px_rgba(15,23,42,0.15)] transition-transform hover:-translate-y-0.5 active:scale-95 ${isActive ? "bg-[#008447] text-white" : "bg-white text-slate-700"}`}
                onClick={() => onSelect(filter.id)}
                type="button"
              >
                <span className="scale-[0.72]"><CategoryPin icon={filter.id} /></span>
                {filter.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
