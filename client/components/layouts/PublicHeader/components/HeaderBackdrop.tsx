import Image from "next/image";

import images from "@/components/assets/images";

export default function HeaderBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[linear-gradient(115deg,#18b667_0%,#0f9b58_46%,#097a4f_100%)]"
    >
      {/* Tranh vận động viên làm vân nền; mix-blend-overlay giữ dải xanh, chỉ lấy phần sáng tối của ảnh. */}
      <Image
        alt=""
        className="object-cover opacity-30 mix-blend-overlay"
        fill
        priority
        sizes="100vw"
        src={images.homeHeader}
      />

      <div className="absolute -right-24 -top-40 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(212,247,140,0.4),transparent_70%)]" />
      <div className="absolute -bottom-40 -left-28 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(2,69,47,0.4),transparent_70%)]" />

      <div className="absolute inset-x-0 top-0 h-px bg-white/25" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
}
