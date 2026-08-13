import CourtMap from "@/components/map/CourtMap";
import PublicFooter from "@/components/layouts/PublicFooter";
import PublicHeader from "@/components/layouts/PublicHeader";

export default function MapPage() {
  return (
    <div className="flex h-[100dvh] min-h-0 flex-col overflow-hidden">
      <div className="relative z-[1100] shrink-0">
        <PublicHeader />
      </div>
      <main className="min-h-0 flex-1 pb-[70px]">
        <CourtMap />
      </main>
      <PublicFooter activeItemId="map" />
    </div>
  );
}
