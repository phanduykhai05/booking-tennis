import { notFound } from "next/navigation";

import ProductDetail from "@/components/product/ProductDetail";
import { buildBookingDates } from "@/components/product/ProductDetail/content";
import { getVenue } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";
import type { ApiVenueDetail } from "@/lib/api/types";
import { todayInAppTimezone } from "@/lib/date";

async function loadVenue(slug: string): Promise<ApiVenueDetail> {
  try {
    return await getVenue(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const today = todayInAppTimezone();
  const venue = await loadVenue(slug);

  return (
    <ProductDetail
      bookingDates={buildBookingDates(slug, today)}
      product={{
        address: venue.address,
        directionsHref: venue.directionsHref,
        events: venue.events,
        openingLabel: venue.openingLabel,
        phone: venue.phone,
        slug: venue.slug,
        venue: venue.venue,
      }}
    />
  );
}
