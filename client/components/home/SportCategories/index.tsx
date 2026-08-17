"use client";

import CategoryTile from "@/components/home/SportCategories/components/CategoryTile";
import { sportCategoriesLabel } from "@/components/home/SportCategories/content";
import type { SportCategory, SportCategoryId } from "@/components/home/SportCategories/types";

type SportCategoriesProps = {
  activeId?: SportCategoryId | null;
  categories: SportCategory[];
  onSelect?: (sportId: SportCategoryId) => void;
};

export default function SportCategories({ activeId, categories, onSelect }: SportCategoriesProps) {
  return (
    <nav aria-label={sportCategoriesLabel} className="overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <ul className="flex w-max min-w-full items-start gap-2 px-3 pb-4 pt-1 sm:gap-4 sm:px-4">
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryTile category={category} isActive={activeId === category.id} onSelect={() => onSelect?.(category.id)} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
