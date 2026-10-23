import images from "@/components/assets/images";
import { shadow } from "@/components/ui/theme";

type PromotionBadgeProps = {
  count: number;
  label: string;
};

// Hình fire.png có phần lửa là vùng TRONG SUỐT khoét trên nền đỏ, nên icon đứng
// riêng (không nền) còn chữ "Ưu đãi" mới có nền đỏ nối tiếp ngay sau để tạo cảm
// giác một dải ribbon liền mạch. Icon cao hơn thanh và neo đáy để ngọn lửa tràn lên.
export default function PromotionBadge({ count, label }: PromotionBadgeProps) {
  return (
    <div className="w-[112px] shrink-0">
      <div className="h-[21px] w-full flex-row items-center overflow-hidden rounded-md" style={shadow.card}>
        <div className="w-[54px] shrink-0" />
        <div className="h-full flex-1 justify-center bg-[#f3090c] pl-1">
          <span className="text-[11px] font-bold text-white">{label}</span>
        </div>
      </div>
      <img
        alt=""
        className="object-contain object-bottom"
        src={images.icons.fire}
        style={{ bottom: 0, height: 29, left: 0, position: "absolute", width: 54 }}
      />
      <div className="absolute -right-1.5 -top-1.5 h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#f0a01e]">
        <span className="text-[9px] font-bold text-white">{count}</span>
      </div>
    </div>
  );
}
