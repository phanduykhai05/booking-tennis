import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";

import type { SportCategoryIcon } from "@/components/home/SportCategories/types";
import MapControls from "@/components/map/CourtMap/components/MapControls";
import MapFilters from "@/components/map/CourtMap/components/MapFilters";
import MapSearch from "@/components/map/CourtMap/components/MapSearch";
import OpenStreetMapCanvas from "@/components/map/CourtMap/components/OpenStreetMapCanvas";
import type { OpenStreetMapCanvasHandle } from "@/components/map/CourtMap/components/OpenStreetMapCanvas";
import type { CourtMapContent, CourtMapFilter, CourtMapMarker } from "@/components/map/CourtMap/types";
import { shadow } from "@/components/ui/theme";
import { normalizeText } from "@/lib/format";

type MapExperienceProps = {
  brandName: string;
  content: CourtMapContent;
  filters: CourtMapFilter[];
  markers: CourtMapMarker[];
};

export default function MapExperience({ brandName, content, filters, markers }: MapExperienceProps) {
  const router = useRouter();
  const mapRef = useRef<OpenStreetMapCanvasHandle>(null);
  const [showVenueLayer, setShowVenueLayer] = useState(true);
  const [query, setQuery] = useState("");
  const [activeSport, setActiveSport] = useState<SportCategoryIcon | null>(null);
  const [notice, setNotice] = useState("");

  // Lọc pin theo bộ môn đang chọn và theo từ khoá (khớp tên, không dấu).
  const visibleMarkers = useMemo(() => {
    const needle = normalizeText(query);

    return markers.filter((marker) => {
      if (activeSport && marker.sport !== activeSport) return false;
      if (needle && !normalizeText(marker.name).includes(needle)) return false;
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
    <View className="flex-1">
      <OpenStreetMapCanvas
        geolocationUnavailableMessage={content.geolocationUnavailableMessage}
        markers={visibleMarkers}
        onMarkerPress={(markerId) => router.push(`/product/${markerId}`)}
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

      {notice ? (
        <View className="absolute left-6 right-6 top-[120px] items-center">
          <Text className="rounded-full bg-white/95 px-4 py-1.5 text-[13px] font-medium text-slate-700" style={shadow.card}>
            {notice}
          </Text>
        </View>
      ) : null}

      <Text className="absolute bottom-24 left-3 rounded bg-white/85 px-1.5 py-0.5 text-[11px] text-slate-600">
        {content.mapAttribution} · {visibleMarkers.length} sân
      </Text>
    </View>
  );
}
