import Image from "next/image";
import type { StaticImageData } from "next/image";

import images from "@/components/assets/images";
import type { SportCategoryIcon } from "@/components/home/SportCategories/types";

type CategoryPinProps = {
  icon: SportCategoryIcon;
};

const sportImages: Record<SportCategoryIcon, StaticImageData> = {
  athletics: images.sports.athletics,
  badminton: images.sports.badminton,
  basketball: images.sports.basketball,
  football: images.sports.football,
  pickleball: images.sports.pickleball,
  swimming: images.sports.swimming,
  tableTennis: images.sports.tableTennis,
  taekwondo: images.sports.taekwondo,
  tennis: images.sports.tennis,
  volleyball: images.sports.volleyball,
};

const pinBody =
  "M16 1.6c-7.5 0-13.6 6-13.6 13.5 0 9.9 11.8 24.6 12.3 25.2a1.7 1.7 0 0 0 2.6 0c.5-.6 12.3-15.3 12.3-25.2 0-7.5-6.1-13.5-13.6-13.5Z";

export default function CategoryPin({ icon }: CategoryPinProps) {
  return (
    // Tỉ lệ 32:42 khớp viewBox của ghim, ảnh môn thể thao đặt trùng tâm vòng tròn trắng.
    <span className="relative block h-10 w-[30.5px]">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full drop-shadow-[0_2px_4px_rgba(15,23,42,0.18)]" fill="none" viewBox="0 0 32 42">
        <path d={pinBody} fill="currentColor" />
        {/* Vệt sáng dọc mép trên giúp ghim bớt phẳng. */}
        <path d="M16 3.3c-5.5 0-10.2 3.4-12 8.2 2.5-3.7 6.9-6.1 12-6.1s9.5 2.4 12 6.1c-1.8-4.8-6.5-8.2-12-8.2Z" fill="#ffffff" opacity="0.24" />
        <circle cx="16" cy="14.7" fill="#ffffff" r="9.8" />
        <circle cx="16" cy="14.7" opacity="0.07" r="9.3" stroke="#0f172a" strokeWidth="1" />
      </svg>
      <Image
        alt=""
        className="absolute left-1/2 top-[35%] h-auto w-[66%] -translate-x-1/2 -translate-y-1/2"
        height={64}
        src={sportImages[icon]}
        width={64}
      />
    </span>
  );
}
