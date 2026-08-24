import { View } from "react-native";

import { publicHeaderContent } from "@/components/layouts/PublicHeader/mockData";
import MapExperience from "@/components/map/CourtMap/components/MapExperience";
import { courtMapContent, courtMapFilters } from "@/components/map/CourtMap/content";
import type { CourtMapMarker } from "@/components/map/CourtMap/types";

type CourtMapProps = {
  markers: CourtMapMarker[];
};

export default function CourtMap({ markers }: CourtMapProps) {
  return (
    <View accessibilityLabel="Bản đồ sân thể thao" className="flex-1 overflow-hidden bg-[#d9f4ea]">
      <MapExperience
        brandName={publicHeaderContent.brandName}
        content={courtMapContent}
        filters={courtMapFilters}
        markers={markers}
      />
    </View>
  );
}
