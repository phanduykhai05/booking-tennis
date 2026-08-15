import VenueCover from "@/components/home/NearbyVenues/components/VenueCover";
import VenueSummary from "@/components/home/NearbyVenues/components/VenueSummary";
import type { NearbyVenuesContent, Venue } from "@/components/home/NearbyVenues/types";

type VenueCardProps = {
  content: NearbyVenuesContent;
  venue: Venue;
};

export default function VenueCard({ content, venue }: VenueCardProps) {
  return (
    // @container: bề ngang card do số cột lưới quyết định, không theo bề ngang màn hình,
    // nên các mốc responsive bên trong phải đo theo card chứ không phải viewport.
    <article className="@container overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(15,23,42,0.1)] transition-shadow duration-200 hover:shadow-[0_8px_20px_-8px_rgba(15,23,42,0.28)]">
      <VenueCover content={content} venue={venue} />
      <VenueSummary content={content} venue={venue} />
    </article>
  );
}
