import CategoryPin from "@/components/home/SportCategories/components/CategoryPin";
import type { SportCategory, SportCategoryIcon } from "@/components/home/SportCategories/types";

type CategoryTileProps = {
  category: SportCategory;
};

// Lớp đầy đủ để Tailwind quét được; không ghép chuỗi màu lúc chạy.
const tileTheme: Record<SportCategoryIcon, string> = {
  athletics: "bg-[#fdecee] text-[#f43f5e]",
  badminton: "bg-[#e6f7f1] text-[#12b886]",
  basketball: "bg-[#fef3e3] text-[#f0910c]",
  football: "bg-[#e8f7ee] text-[#22a55b]",
  pickleball: "bg-[#e9f1fe] text-[#3b82f6]",
  swimming: "bg-[#e4f6fa] text-[#06b6d4]",
  tableTennis: "bg-[#fdebef] text-[#e11d48]",
  taekwondo: "bg-[#ecebfd] text-[#4f46e5]",
  tennis: "bg-[#fef0e5] text-[#f97316]",
  volleyball: "bg-[#f1ecfd] text-[#8b5cf6]",
};

export default function CategoryTile({ category }: CategoryTileProps) {
  return (
    <button className="group flex w-[74px] shrink-0 flex-col items-center gap-2 focus-visible:outline-none" type="button">
      <span
        className={`relative flex size-14 items-center justify-center overflow-hidden rounded-[18px] shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_14px_-6px_rgba(15,23,42,0.28)] group-focus-visible:ring-2 group-focus-visible:ring-[#0f9b58]/50 group-active:scale-95 ${tileTheme[category.icon]}`}
      >
        {/* Ánh sáng nhẹ từ trên xuống, dùng chung cho mọi màu nên không phải khai báo gradient riêng từng môn. */}
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-white/65 to-transparent" />
        <CategoryPin icon={category.icon} />
      </span>
      <span className="text-center text-xs font-medium leading-4 text-slate-600 transition-colors duration-200 group-hover:text-slate-900">
        {category.label}
      </span>
    </button>
  );
}
