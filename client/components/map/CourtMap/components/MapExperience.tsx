"use client";

import { useMemo, useRef, useState } from "react";

import MapControls from "@/components/map/CourtMap/components/MapControls";
import MapFilters from "@/components/map/CourtMap/components/MapFilters";
import MapSearch from "@/components/map/CourtMap/components/MapSearch";
import OpenStreetMapCanvas from "@/components/map/CourtMap/components/OpenStreetMapCanvas";
import type { OpenStreetMapCanvasHandle } from "@/components/map/CourtMap/components/OpenStreetMapCanvas";
import type { CourtMapContent, CourtMapFilter, CourtMapMarker } from "@/components/map/CourtMap/types";
import type { SportCategoryIcon } from "@/components/home/SportCategories/types";

type MapExperienceProps = {
  brandName: string;
  content: CourtMapContent;
  filters: CourtMapFilter[];
  markers: CourtMapMarker[];
};

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

export default function MapExperience({ brandName, content, filters, markers }: MapExperienceProps) {
  const mapRef = useRef<OpenStreetMapCanvasHandle>(null);
  const [showVenueLayer, setShowVenueLayer] = useState(true);
  const [query, setQuery] = useState("");
  const [activeSport, setActiveSport] = useState<SportCategoryIcon | null>(null);
  const [notice, setNotice] = useState("");

  // Lọc pin theo bộ môn đang chọn và theo từ khoá (khớp tên, không dấu).
  const visibleMarkers = useMemo(() => {
    const needle = normalize(query);
    return markers.filter((marker) => {
      if (activeSport && marker.sport !== activeSport) return false;
      if (needle && !normalize(marker.name).includes(needle)) return false;
      return true;
    });
  }, [activeSport, markers, query]);

  const runSearch = () => {
    if (!query.trim()) {
      setNotice("");
      return;
    }

    const found = mapRef.current?.focusVenue(query) ?? false;
    setNotice(found ? "" : `Không tìm thấy sân khớp "${query.trim()}"`);
  };

  const selectSport = (sport: SportCategoryIcon) => {
    setActiveSport((current) => (current === sport ? null : sport));
    setNotice("");
  };

  return (
    <>
      <OpenStreetMapCanvas
        geolocationUnavailableMessage={content.geolocationUnavailableMessage}
        markers={visibleMarkers}
        ref={mapRef}
        showVenueLayer={showVenueLayer}
        unavailableMessage={content.unavailableMapMessage}
      />
      <MapSearch
        brandName={brandName}
        inputLabel={content.searchInputLabel}
        onChange={(value) => {
          setQuery(value);
          setNotice("");
        }}
        onSubmit={runSearch}
        placeholder={content.searchPlaceholder}
        submitLabel={content.searchSubmitLabel}
        value={query}
      />
      <MapFilters activeId={activeSport} filters={filters} onSelect={selectSport} />
      <MapControls
        currentLocationLabel={content.currentLocationLabel}
        isVenueLayerVisible={showVenueLayer}
        layersLabel={content.layersLabel}
        onLocate={() => mapRef.current?.locate()}
        onToggleVenueLayer={() => setShowVenueLayer((isVisible) => !isVisible)}
      />
      {notice && (
        <p className="absolute left-1/2 top-[120px] z-[1002] -translate-x-1/2 rounded-full bg-white/95 px-4 py-1.5 text-[13px] font-medium text-slate-700 shadow-[0_4px_14px_rgba(15,23,42,0.2)]" role="status">
          {notice}
        </p>
      )}
      <p className="absolute bottom-20 left-3 z-[1001] rounded bg-white/85 px-1.5 py-0.5 text-[11px] text-slate-600">
        {content.mapAttribution} · {visibleMarkers.length} sân
      </p>
    </>
  );
}
