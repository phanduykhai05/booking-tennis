import Image from "next/image";

import images from "@/components/assets/images";

type PromotionBadgeProps = {
  count: number;
  label: string;
};

// Hình fire.png có phần lửa là vùng TRONG SUỐT khoét trên nền đỏ (không phải nét
// trắng vẽ đè), nên chỉ hiện rõ khi phía sau nó là nền sáng — đặt icon trên nền
// đỏ CSS trùng màu sẽ làm lỗ trong suốt lộ ra màu đỏ giống hệt và biến mất.
// Vì vậy icon đứng riêng (không nền), chữ "Ưu đãi" mới có nền đỏ nối tiếp ngay
// sau để tạo cảm giác một dải ribbon liền mạch mà không kéo giãn/cắt ảnh gốc.
//
// Phần thân ruy băng (không tính ngọn lửa) chỉ cao ~50/68 khung ảnh gốc — ngọn
// lửa vẽ tràn lên cao hơn thân. Nếu ép cả khung ảnh vào đúng chiều cao thanh
// ribbon, phần thân sẽ bị co ngắn hơn ô chữ bên cạnh, tạo bậc thang lệch xấu.
// Nên icon được scale lớn hơn thanh ribbon và neo đáy, để ngọn lửa tự nhiên
// tràn lên trên mép thanh thay vì bị bó vào.
export default function PromotionBadge({ count, label }: PromotionBadgeProps) {
  return (
    <div className="relative w-[112px] shrink-0">
      <div className="flex h-[21px] w-full items-center overflow-hidden rounded-md shadow-[0_1px_3px_rgba(15,23,42,0.25)]">
        <div className="w-[54px] shrink-0" />
        <span className="flex h-full flex-1 items-center whitespace-nowrap bg-[#f3090c] pl-1 text-[10px] font-bold leading-none text-white">
          {label}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 h-[29px] w-[54px]">
        <Image alt="" className="object-contain object-bottom" fill src={images.icons.fire} />
      </div>
      <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-[#f0a01e] text-[9px] font-bold leading-none text-white ring-2 ring-white">
        {count}
      </span>
    </div>
  );
}
