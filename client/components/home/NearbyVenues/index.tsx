"use client";

import { useState } from "react";

import VenueCard from "@/components/home/NearbyVenues/components/VenueCard";
import VenuePreviewSheet from "@/components/home/NearbyVenues/components/VenuePreviewSheet";
import { nearbyVenues, nearbyVenuesContent } from "@/components/home/NearbyVenues/mockData";
import type { Venue } from "@/components/home/NearbyVenues/types";
import type { SportCategoryId } from "@/components/home/SportCategories/types";

type NearbyVenuesProps = { sport?: SportCategoryId | null };

export default function NearbyVenues({ sport = null }: NearbyVenuesProps) {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const visibleVenues = sport ? nearbyVenues.filter((venue) => venue.sport === sport) : nearbyVenues;

  return (
    <>
      <section aria-label={nearbyVenuesContent.sectionLabel} className="px-3 pb-6 sm:px-4">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleVenues.map((venue) => (
            <li key={venue.id}>
              <VenueCard content={nearbyVenuesContent} onOpen={() => setSelectedVenue(venue)} venue={venue} />
            </li>
          ))}
        </ul>
        {visibleVenues.length === 0 && <p className="py-12 text-center text-sm text-[#637169]">Chưa có sân phù hợp với bộ môn này.</p>}
      </section>
      {selectedVenue && <VenuePreviewSheet content={nearbyVenuesContent} onClose={() => setSelectedVenue(null)} venue={selectedVenue} />}
    </>
  );
}
