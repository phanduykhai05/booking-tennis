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
    <div aria-label={sportCategoriesLabel} className="grow shrink flex-row overflow-x-auto overflow-y-hidden [scrollbar-width:none]">
      <div className="flex-row items-start px-[9px] pb-2.5 pt-2.5">
        {categories.map((category) => (
          <CategoryTile
            category={category}
            isActive={activeId === category.id}
            key={category.id}
            onSelect={() => onSelect?.(category.id)}
          />
        ))}
      </div>
    </div>
  );
}
