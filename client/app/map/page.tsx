import CourtMap from "@/components/map/CourtMap";
import PublicFooter from "@/components/layouts/PublicFooter";
import PublicHeader from "@/components/layouts/PublicHeader";
import type { CourtMapMarker } from "@/components/map/CourtMap/types";
import type { SportCategoryIcon } from "@/components/home/SportCategories/types";
import { getMapMarkers } from "@/lib/api/endpoints";

export default async function MapPage() {
  const markers = await getMapMarkers();
  const mapMarkers: CourtMapMarker[] = markers.map((marker) => ({
    href: `/product/${marker.id}`,
    id: marker.id,
    isFeatured: marker.isFeatured,
    latitude: marker.latitude,
    longitude: marker.longitude,
    name: marker.name,
    sport: marker.sport as SportCategoryIcon,
  }));

  return (
    <div className="flex h-[100dvh] min-h-0 flex-col overflow-hidden">
      <div className="relative z-[1100] shrink-0">
        <PublicHeader />
      </div>
      <main className="min-h-0 flex-1 pb-[70px]">
        <CourtMap markers={mapMarkers} />
      </main>
      <PublicFooter activeItemId="map" />
    </div>
  );
}
