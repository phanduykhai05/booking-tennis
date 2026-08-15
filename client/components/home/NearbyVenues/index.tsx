import VenueCard from "@/components/home/NearbyVenues/components/VenueCard";
import { nearbyVenues, nearbyVenuesContent } from "@/components/home/NearbyVenues/mockData";

export default function NearbyVenues() {
  return (
    <section aria-label={nearbyVenuesContent.sectionLabel} className="px-3 pb-6 sm:px-4">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nearbyVenues.map((venue) => (
          <li key={venue.id}>
            <VenueCard content={nearbyVenuesContent} venue={venue} />
          </li>
        ))}
      </ul>
    </section>
  );
}
