import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

import CategoryPin from "@/components/home/SportCategories/components/CategoryPin";
import type { SportCategory, SportCategoryIcon } from "@/components/home/SportCategories/types";
import Touch from "@/components/ui/Pressable";

type CategoryTileProps = {
  category: SportCategory;
  isActive: boolean;
  onSelect: () => void;
};

/** Nền ô và màu ghim của từng bộ môn, khai báo đầy đủ để không ghép chuỗi màu lúc chạy. */
const tileTheme: Record<SportCategoryIcon, { background: string; pin: string }> = {
  athletics: { background: "#fdecee", pin: "#f43f5e" },
  badminton: { background: "#e6f7f1", pin: "#12b886" },
  basketball: { background: "#fef3e3", pin: "#f0910c" },
  football: { background: "#e8f7ee", pin: "#22a55b" },
  pickleball: { background: "#e9f1fe", pin: "#3b82f6" },
  swimming: { background: "#e4f6fa", pin: "#06b6d4" },
  tableTennis: { background: "#fdebef", pin: "#e11d48" },
  taekwondo: { background: "#ecebfd", pin: "#4f46e5" },
  tennis: { background: "#fef0e5", pin: "#f97316" },
  volleyball: { background: "#f1ecfd", pin: "#8b5cf6" },
};

export default function CategoryTile({ category, isActive, onSelect }: CategoryTileProps) {
  const theme = tileTheme[category.icon];

  return (
    <Touch accessibilityRole="button" className="w-[74px] shrink-0 items-center gap-2" onPress={onSelect}>
      <View
        className={`h-14 w-14 items-center justify-center overflow-hidden rounded-[18px] ${isActive ? "border-2 border-[#008447]" : ""}`}
        style={{ backgroundColor: theme.background }}
      >
        {/* Ánh sáng nhẹ từ trên xuống, dùng chung cho mọi màu nên không phải khai báo gradient riêng từng môn. */}
        <LinearGradient
          colors={["rgba(255,255,255,0.65)", "rgba(255,255,255,0)"]}
          style={{ bottom: 0, left: 0, position: "absolute", right: 0, top: 0 }}
        />
        <CategoryPin color={theme.pin} icon={category.icon} scale={0.86} />
      </View>
      <Text className={`text-center text-[12px] font-medium ${isActive ? "text-[#007b45]" : "text-slate-600"}`}>
        {category.label}
      </Text>
    </Touch>
  );
}
