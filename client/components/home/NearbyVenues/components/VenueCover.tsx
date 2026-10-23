import { Heart, Users } from "lucide-react";

import images from "@/components/assets/images";
import PromotionBadge from "@/components/home/NearbyVenues/components/PromotionBadge";
import { RatingBadge, VenueBadge } from "@/components/home/NearbyVenues/components/VenueBadge";
import type { NearbyVenuesContent, Venue } from "@/components/home/NearbyVenues/types";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type VenueCoverProps = {
  content: NearbyVenuesContent;
  onOpen: () => void;
  venue: Venue;
};

export default function VenueCover({ content, onOpen, venue }: VenueCoverProps) {
  return (
    <Touch accessibilityLabel={`Xem thông tin ${venue.name}`} className="aspect-[2/1] w-full overflow-hidden bg-slate-100" onPress={onOpen}>
      <img alt="" className="object-cover" src={images.venueCovers[venue.cover]} style={{ height: "100%", width: "100%" }} />

      <div className="absolute inset-x-2 top-2 flex-row items-start justify-between gap-2">
        {/* Các pill chồng mép lên nhau: pill trước luôn nằm trên pill sau. */}
        <div className="min-w-0 flex-row items-start">
          <div style={{ zIndex: venue.badges.length + 1 }}>
            <RatingBadge rating={venue.rating} />
          </div>
          {venue.badges.map((badge, index) => (
            <div className="-ml-2" key={badge.id} style={{ zIndex: venue.badges.length - index }}>
              <VenueBadge badge={badge} />
            </div>
          ))}
        </div>

        <div className="shrink-0 items-end gap-1.5">
          <div className="flex-row items-center gap-1.5">
            <div className="h-8 w-8 items-center justify-center rounded-full bg-white" style={shadow.card}>
              <Heart color="#475569" size={18} strokeWidth={1.8} />
            </div>
            <div className="h-8 w-8 items-center justify-center rounded-full bg-white" style={shadow.card}>
              <Users color="#475569" size={18} strokeWidth={1.8} />
            </div>
          </div>
          {venue.offerCount ? <PromotionBadge count={venue.offerCount} label={content.offerLabel} /> : null}
        </div>
      </div>
    </Touch>
  );
}
