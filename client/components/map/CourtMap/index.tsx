import MapExperience from "@/components/map/CourtMap/components/MapExperience";
import { courtMapContent, courtMapFilters } from "@/components/map/CourtMap/content";
import type { CourtMapMarker } from "@/components/map/CourtMap/types";
import { publicHeaderContent } from "@/components/layouts/PublicHeader/mockData";

type CourtMapProps = { markers: CourtMapMarker[] };

export default function CourtMap({ markers }: CourtMapProps) {
  return (
    <section aria-label="Bản đồ sân thể thao" className="relative size-full min-h-0 overflow-hidden bg-[#d9f4ea]">
      <MapExperience
        brandName={publicHeaderContent.brandName}
        content={courtMapContent}
        filters={courtMapFilters}
        markers={markers}
      />
    </section>
  );
}
