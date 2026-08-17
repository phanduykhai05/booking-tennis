"use client";

import CategoryTile from "@/components/home/SportCategories/components/CategoryTile";
import { sportCategories, sportCategoriesLabel } from "@/components/home/SportCategories/mockData";
import type { SportCategoryId } from "@/components/home/SportCategories/types";

type SportCategoriesProps = {
  activeId?: SportCategoryId | null;
  onSelect?: (sportId: SportCategoryId) => void;
};

export default function SportCategories({ activeId, onSelect }: SportCategoriesProps) {
  return (
    <nav aria-label={sportCategoriesLabel} className="overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <ul className="flex w-max min-w-full items-start gap-2 px-3 pb-4 pt-1 sm:gap-4 sm:px-4">
        {sportCategories.map((category) => (
          <li key={category.id}>
            <CategoryTile category={category} isActive={activeId === category.id} onSelect={() => onSelect?.(category.id)} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
