import type { SportCategoryId } from "@/components/home/SportCategories/types";

export type NearbyFilter = {
  id: string;
  label: string;
  sport?: SportCategoryId;
};
