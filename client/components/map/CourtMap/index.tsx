import MapExperience from "@/components/map/CourtMap/components/MapExperience";
import { courtMapContent, courtMapFilters, courtMapMarkers } from "@/components/map/CourtMap/mockData";
import { publicHeaderContent } from "@/components/layouts/PublicHeader/mockData";

export default function CourtMap() {
  return (
    <section aria-label="Bản đồ sân thể thao" className="relative size-full min-h-0 overflow-hidden bg-[#d9f4ea]">
      <MapExperience
        brandName={publicHeaderContent.brandName}
        content={courtMapContent}
        filters={courtMapFilters}
        markers={courtMapMarkers}
      />
    </section>
  );
}
