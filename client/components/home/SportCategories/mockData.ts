import type { SportCategory } from "@/components/home/SportCategories/types";

export const sportCategoriesLabel = "Bộ môn thể thao";

export const sportCategories: SportCategory[] = [
  { icon: "pickleball", id: "pickleball", label: "Pickleball" },
  { icon: "badminton", id: "badminton", label: "Cầu lông" },
  { icon: "football", id: "football", label: "Bóng đá" },
  { icon: "basketball", id: "basketball", label: "Bóng rổ" },
  { icon: "tennis", id: "tennis", label: "Quần vợt" },
  { icon: "volleyball", id: "volleyball", label: "Bóng chuyền" },
  { icon: "tableTennis", id: "table-tennis", label: "Bóng bàn" },
  { icon: "swimming", id: "swimming", label: "Bơi lội" },
  { icon: "taekwondo", id: "taekwondo", label: "Taekwondo" },
  { icon: "athletics", id: "athletics", label: "Điền kinh" },
];
