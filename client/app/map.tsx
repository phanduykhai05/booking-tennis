import { View } from "react-native";

import type { SportCategoryIcon } from "@/components/home/SportCategories/types";
import PublicFooter, { publicFooterHeight } from "@/components/layouts/PublicFooter";
import CourtMap from "@/components/map/CourtMap";
import type { CourtMapMarker } from "@/components/map/CourtMap/types";
import { ErrorMessage, LoadingState } from "@/components/ui/Feedback";
import Screen from "@/components/ui/Screen";
import { getMapMarkers } from "@/lib/api/endpoints";
import { useAsync } from "@/lib/useAsync";

export default function MapScreen() {
  const { data, errorMessage, isLoading } = useAsync<CourtMapMarker[]>(
    async () => {
      const markers = await getMapMarkers();

      return markers.map((marker) => ({
        href: `/product/${marker.id}`,
        id: marker.id,
        isFeatured: marker.isFeatured,
        latitude: marker.latitude,
        longitude: marker.longitude,
        name: marker.name,
        sport: marker.sport as SportCategoryIcon,
      }));
    },
    [],
    "Không tải được vị trí sân",
  );

  return (
    <Screen backgroundColor="#d9f4ea">
      <View className="flex-1" style={{ paddingBottom: publicFooterHeight }}>
        {isLoading ? (
          <LoadingState label="Đang tải bản đồ…" />
        ) : errorMessage ? (
          <View className="p-4">
            <ErrorMessage text={errorMessage} />
          </View>
        ) : (
          <CourtMap markers={data ?? []} />
        )}
      </View>
      <PublicFooter activeItemId="map" />
    </Screen>
  );
}
