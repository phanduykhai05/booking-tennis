import { Clock } from "lucide-react";
import { useNavigate } from "react-router";

import images from "@/components/assets/images";
import type { NearbyVenuesContent, Venue, VenueLogoKey } from "@/components/home/NearbyVenues/types";
import Touch from "@/components/ui/Pressable";

type VenueSummaryProps = {
  content: NearbyVenuesContent;
  onOpen: () => void;
  venue: Venue;
};

const logoImages: Record<VenueLogoKey, string> = {
  badminton: images.sports.badminton,
  football: images.sports.football,
  pickleball: images.sports.pickleball,
  tennis: images.sports.tennis,
};

export default function VenueSummary({ content, onOpen, venue }: VenueSummaryProps) {
  const navigate = useNavigate();

  return (
    <div className="flex-row flex-wrap items-center gap-x-3 gap-y-2.5 px-2.5 py-2.5">
      <div className="h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
        <img alt="" className="object-contain" src={logoImages[venue.logo]} style={{ height: 36, width: 36 }} />
      </div>

      <div className="min-w-[132px] flex-1">
        <Touch onPress={onOpen}>
          <span className="truncate text-[15px] font-semibold text-[#004126]">{venue.name}</span>
        </Touch>
        <span className="mt-0.5 truncate text-[12px]">
          {venue.distanceLabel ? <span className="text-[#f17f51]">({venue.distanceLabel}) </span> : null}
          <span className="text-[#4a4a4a]">{venue.address}</span>
        </span>
        <div className="mt-0.5 flex-row items-center gap-1">
          <Clock color="#4a4a4a" size={13} strokeWidth={1.8} />
          <span className="text-[12px] text-[#4a4a4a]">{venue.openingLabel}</span>
        </div>
      </div>

      <Touch
        className="h-[30px] w-[80px] shrink-0 items-center justify-center rounded bg-[#e2af30]"
        onPress={() => navigate(venue.productHref)}
      >
        <span className="text-[13px] font-bold uppercase text-white">{content.bookLabel}</span>
      </Touch>
    </div>
  );
}
