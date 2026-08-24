import { ScrollView } from "react-native";

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
    <ScrollView
      accessibilityLabel={sportCategoriesLabel}
      contentContainerClassName="flex-row items-start gap-2 px-3 pb-4 pt-1"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category) => (
        <CategoryTile
          category={category}
          isActive={activeId === category.id}
          key={category.id}
          onSelect={() => onSelect?.(category.id)}
        />
      ))}
    </ScrollView>
  );
}
