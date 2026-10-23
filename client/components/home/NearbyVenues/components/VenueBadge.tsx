import { Star } from "lucide-react";

import type { VenueBadge as VenueBadgeType, VenueBadgeTone } from "@/components/home/NearbyVenues/types";

const toneBackground: Record<VenueBadgeTone, string> = {
  event: "bg-[#b87ce6]",
  single: "bg-[#45b649]",
};

type VenueBadgeProps = {
  badge: VenueBadgeType;
};

/** Badge nằm sau pill đánh giá và chồng mép lên nó: chỉ bo cạnh phải. */
export function VenueBadge({ badge }: VenueBadgeProps) {
  return (
    <div className={`h-[21px] shrink-0 justify-center rounded-r-full px-3 ${toneBackground[badge.tone]}`}>
      <span className="text-[12px] font-semibold text-white">{badge.label}</span>
    </div>
  );
}

type RatingBadgeProps = {
  rating: number | null;
};

/** Pill đầu dải, cạnh trái lộ ra nên bo tròn cả hai đầu. */
export function RatingBadge({ rating }: RatingBadgeProps) {
  return (
    <div className="h-[21px] shrink-0 flex-row items-center gap-[3px] rounded-full bg-white px-3">
      <Star color={rating !== null ? "#f5b912" : "#cbd5e1"} fill={rating !== null ? "#f5b912" : "#cbd5e1"} size={13} />
      {rating !== null ? <span className="text-[12px] font-semibold text-[#1f2d3d]">{rating}</span> : null}
    </div>
  );
}
