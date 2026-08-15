import { Heart, Users } from "lucide-react";
import Image from "next/image";

import images from "@/components/assets/images";
import PromotionBadge from "@/components/home/NearbyVenues/components/PromotionBadge";
import { RatingBadge, VenueBadge } from "@/components/home/NearbyVenues/components/VenueBadge";
import type { NearbyVenuesContent, Venue } from "@/components/home/NearbyVenues/types";

type VenueCoverProps = {
  content: NearbyVenuesContent;
  venue: Venue;
};

const circleButtonClassName =
  "flex size-8 items-center justify-center rounded-full bg-white text-slate-600 shadow-[0_2px_6px_rgba(15,23,42,0.28)] transition-colors duration-200 hover:text-[#0f9b58] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95";

export default function VenueCover({ content, venue }: VenueCoverProps) {
  const overlayBadges = [
    { key: "rating", node: <RatingBadge rating={venue.rating} /> },
    ...venue.badges.map((badge) => ({ key: badge.id, node: <VenueBadge badge={badge} /> })),
  ];

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden bg-slate-100">
      <Image
        alt=""
        className="object-cover"
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        src={images.venueCovers[venue.cover]}
      />

      <div className="absolute inset-x-2 top-2 flex items-start justify-between gap-2">
        {/* Các pill chồng mép lên nhau: pill trước luôn nằm trên pill sau nên z-index giảm dần. */}
        <div className="flex min-w-0 items-start">
          {overlayBadges.map((item, index) => (
            <span
              className={index === 0 ? "relative" : "relative -ml-2"}
              key={item.key}
              style={{ zIndex: overlayBadges.length - index }}
            >
              {item.node}
            </span>
          ))}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <div className="flex items-center gap-1.5">
            <button aria-label={content.favoriteLabel} className={circleButtonClassName} type="button">
              <Heart aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
            </button>
            <button aria-label={content.matchLabel} className={circleButtonClassName} type="button">
              <Users aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
            </button>
          </div>
          {venue.offerCount ? <PromotionBadge count={venue.offerCount} label={content.offerLabel} /> : null}
        </div>
      </div>
    </div>
  );
}
