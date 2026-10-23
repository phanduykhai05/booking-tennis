import CategoryPin from "@/components/home/SportCategories/components/CategoryPin";
import type { SportCategory, SportCategoryIcon } from "@/components/home/SportCategories/types";
import Touch from "@/components/ui/Pressable";

type CategoryTileProps = {
  category: SportCategory;
  isActive: boolean;
  onSelect: () => void;
};

/** Màu ghim của từng bộ môn (ô nền trắng viền xám như bản gốc), khai báo đầy đủ để không ghép chuỗi màu lúc chạy. */
const tileTheme: Record<SportCategoryIcon, { pin: string }> = {
  athletics: { pin: "#f43f5e" },
  badminton: { pin: "#12b886" },
  basketball: { pin: "#f0910c" },
  football: { pin: "#22a55b" },
  pickleball: { pin: "#3b82f6" },
  swimming: { pin: "#06b6d4" },
  tableTennis: { pin: "#e11d48" },
  taekwondo: { pin: "#4f46e5" },
  tennis: { pin: "#f97316" },
  volleyball: { pin: "#8b5cf6" },
};

export default function CategoryTile({ category, isActive, onSelect }: CategoryTileProps) {
  const theme = tileTheme[category.icon];

  return (
    <Touch className="w-[70px] shrink-0 items-center gap-1.5" onPress={onSelect}>
      <div
        className={`h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-md bg-white ${isActive ? "border-2 border-[#008447]" : "border border-[#b9b9b9]"}`}
      >
        <CategoryPin color={theme.pin} icon={category.icon} scale={0.64} />
      </div>
      <span className={`text-center text-[12px] ${isActive ? "font-bold text-[#007b45]" : "text-[#33624b]"}`}>
        {category.label}
      </span>
    </Touch>
  );
}
