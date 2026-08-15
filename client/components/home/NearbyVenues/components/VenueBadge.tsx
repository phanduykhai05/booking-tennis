import { Star } from "lucide-react";

import type { VenueBadge as VenueBadgeType, VenueBadgeTone } from "@/components/home/NearbyVenues/types";

const toneClassName: Record<VenueBadgeTone, string> = {
  event: "bg-[#b87ce6] text-white",
  single: "bg-[#45b649] text-white",
};

const pillClassName = "flex h-[21px] shrink-0 items-center px-3 text-[11px] font-semibold leading-none shadow-[0_1px_2px_rgba(15,23,42,0.18)]";

type VenueBadgeProps = {
  badge: VenueBadgeType;
};

// Badge luôn nằm sau pill đánh giá và chồng mép lên nó: cạnh trái để vuông
// để chui gọn xuống dưới, chỉ bo cạnh phải.
export function VenueBadge({ badge }: VenueBadgeProps) {
  return <span className={`${pillClassName} rounded-r-full ${toneClassName[badge.tone]}`}>{badge.label}</span>;
}

type RatingBadgeProps = {
  rating: number | null;
};

// Pill đầu dải, cạnh trái lộ ra nên bo tròn cả hai đầu.
export function RatingBadge({ rating }: RatingBadgeProps) {
  const hasRating = rating !== null;

  return (
    <span className={`${pillClassName} gap-[3px] rounded-full bg-white text-[#1f2d3d]`}>
      <Star
        aria-hidden="true"
        className={hasRating ? "size-[13px] text-[#f5b912]" : "size-[13px] text-slate-300"}
        fill="currentColor"
        strokeWidth={0}
      />
      {hasRating ? rating : null}
    </span>
  );
}
