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
    <div className="flex-row flex-wrap items-center gap-x-3 gap-y-2.5 px-3 py-3">
      <div className="h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-50">
        <img alt="" className="object-contain" src={logoImages[venue.logo]} style={{ height: 32, width: 32 }} />
      </div>

      <div className="min-w-[132px] flex-1">
        <Touch onPress={onOpen}>
          <span className="truncate text-[16px] font-bold text-[#12324f]">{venue.name}</span>
        </Touch>
        <span className="mt-0.5 truncate text-[12px]">
          <span className="font-semibold text-[#16a34a]">({venue.distanceLabel})</span>{" "}
          <span className="text-slate-500">{venue.address}</span>
        </span>
        <div className="mt-1 flex-row items-center gap-1">
          <Clock color="#64748b" size={14} strokeWidth={1.8} />
          <span className="text-[12px] text-slate-500">{venue.openingLabel}</span>
        </div>
      </div>

      <Touch
        className="h-8 shrink-0 items-center justify-center rounded-md bg-[#f0a01e] px-3.5"
        onPress={() => navigate(venue.productHref)}
      >
        <span className="text-[12px] font-bold uppercase tracking-wide text-white">{content.bookLabel}</span>
      </Touch>
    </div>
  );
}
