"use client";

import Image from "next/image";
import { useState } from "react";

import images from "@/components/assets/images";
import NearbyFilters from "@/components/home/NearbyFilters";
import NearbyVenues from "@/components/home/NearbyVenues";
import type { Venue } from "@/components/home/NearbyVenues/types";
import SportCategories from "@/components/home/SportCategories";
import type { SportCategory, SportCategoryId } from "@/components/home/SportCategories/types";

type VenueFilterContentProps = {
  showPromotion?: boolean;
  sports: SportCategory[];
  venues: Venue[];
};

export default function VenueFilterContent({ showPromotion = false, sports, venues }: VenueFilterContentProps) {
  const [activeNearbyFilter, setActiveNearbyFilter] = useState<string | null>(null);
  const [activeSport, setActiveSport] = useState<SportCategoryId | null>(null);
  const isFiltering = activeNearbyFilter !== null || activeSport !== null;

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
    setActiveSport((currentSport) => currentSport === sportId ? null : sportId);
  };

  return <><NearbyFilters activeId={activeNearbyFilter} onChange={selectNearbyFilter} /><SportCategories activeId={activeSport} categories={sports} onSelect={selectSport} />{showPromotion && !isFiltering && <div className="px-4 pb-2"><div className="relative aspect-[2.2/1] overflow-hidden rounded-xl"><Image alt="Ưu đãi thể thao" className="object-cover" fill priority sizes="(max-width: 640px) 100vw, 640px" src={images.alobo.acaCover} /></div></div>}<NearbyVenues sport={activeSport} venues={venues} /></>;
}
