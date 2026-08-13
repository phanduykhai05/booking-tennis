"use client";

import { useRef, useState } from "react";

import MapControls from "@/components/map/CourtMap/components/MapControls";
import MapFilters from "@/components/map/CourtMap/components/MapFilters";
import MapSearch from "@/components/map/CourtMap/components/MapSearch";
import OpenStreetMapCanvas from "@/components/map/CourtMap/components/OpenStreetMapCanvas";
import type { OpenStreetMapCanvasHandle } from "@/components/map/CourtMap/components/OpenStreetMapCanvas";
import type { CourtMapContent, CourtMapFilter, CourtMapMarker } from "@/components/map/CourtMap/types";

type MapExperienceProps = {
  brandName: string;
  content: CourtMapContent;
  filters: CourtMapFilter[];
  markers: CourtMapMarker[];
};

export default function MapExperience({ brandName, content, filters, markers }: MapExperienceProps) {
  const mapRef = useRef<OpenStreetMapCanvasHandle>(null);
  const [showVenueLayer, setShowVenueLayer] = useState(true);

  return (
    <>
      <OpenStreetMapCanvas
        geolocationUnavailableMessage={content.geolocationUnavailableMessage}
        markers={markers}
        ref={mapRef}
        showVenueLayer={showVenueLayer}
        unavailableMessage={content.unavailableMapMessage}
      />
      <MapSearch
        brandName={brandName}
        inputLabel={content.searchInputLabel}
        placeholder={content.searchPlaceholder}
        submitLabel={content.searchSubmitLabel}
      />
      <MapFilters filters={filters} />
      <MapControls
        currentLocationLabel={content.currentLocationLabel}
        isVenueLayerVisible={showVenueLayer}
        layersLabel={content.layersLabel}
        onLocate={() => mapRef.current?.locate()}
        onToggleVenueLayer={() => setShowVenueLayer((isVisible) => !isVisible)}
      />
      <p className="absolute bottom-20 left-3 z-[1001] rounded bg-white/85 px-1.5 py-0.5 text-[10px] text-slate-600">{content.mapAttribution}</p>
    </>
  );
}
