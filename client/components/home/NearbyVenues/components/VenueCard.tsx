import VenueCover from "@/components/home/NearbyVenues/components/VenueCover";
import VenueSummary from "@/components/home/NearbyVenues/components/VenueSummary";
import type { NearbyVenuesContent, Venue } from "@/components/home/NearbyVenues/types";

type VenueCardProps = {
  content: NearbyVenuesContent;
  onOpen: () => void;
  venue: Venue;
};

export default function VenueCard({ content, onOpen, venue }: VenueCardProps) {
  return (
    <div className="overflow-hidden rounded-md border border-[#ededed] bg-white" style={{ boxShadow: "0 2px 3px rgba(0, 0, 0, 0.18)" }}>
      <VenueCover content={content} onOpen={onOpen} venue={venue} />
      <VenueSummary content={content} onOpen={onOpen} venue={venue} />
    </div>
  );
}
