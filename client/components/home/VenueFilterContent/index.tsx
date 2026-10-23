import { useState } from "react";

import NearbyFilters from "@/components/home/NearbyFilters";
import NearbyVenues from "@/components/home/NearbyVenues";
import type { Venue } from "@/components/home/NearbyVenues/types";
import SportCategories from "@/components/home/SportCategories";
import type { SportCategory, SportCategoryId } from "@/components/home/SportCategories/types";

type VenueFilterContentProps = {
  sports: SportCategory[];
  venues: Venue[];
};

export default function VenueFilterContent({ sports, venues }: VenueFilterContentProps) {
  const [activeNearbyFilter, setActiveNearbyFilter] = useState<string | null>(null);
  const [activeSport, setActiveSport] = useState<SportCategoryId | null>(null);

  const selectNearbyFilter = (filterId: string, sport?: SportCategoryId) => {
    if (activeNearbyFilter === filterId) {
      setActiveNearbyFilter(null);
      setActiveSport(null);
      return;
    }

    setActiveNearbyFilter(filterId);
    setActiveSport(sport ?? null);
  };

  const selectSport = (sportId: SportCategoryId) => {
    setActiveNearbyFilter(null);
    setActiveSport((currentSport) => (currentSport === sportId ? null : sportId));
  };

  return (
    <div>
      {/* Bản gốc không hiện chip "gần tôi" và hàng môn thể thao ở desktop. */}
      <div className="lg:hidden">
        <NearbyFilters activeId={activeNearbyFilter} onChange={selectNearbyFilter} />
        <SportCategories activeId={activeSport} categories={sports} onSelect={selectSport} />
      </div>

      <NearbyVenues sport={activeSport} venues={venues} />
    </div>
  );
}
