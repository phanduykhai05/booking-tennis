import { useLocalSearchParams } from "expo-router";

import ProductDetail from "@/components/product/ProductDetail";
import { buildBookingDates } from "@/components/product/ProductDetail/content";
import { ErrorMessage, LoadingState } from "@/components/ui/Feedback";
import Screen from "@/components/ui/Screen";
import { getVenue } from "@/lib/api/endpoints";
import type { ApiVenueDetail } from "@/lib/api/types";
import { todayInAppTimezone } from "@/lib/date";
import { useAsync } from "@/lib/useAsync";

export default function ProductScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { data, errorMessage, isLoading, reload } = useAsync<ApiVenueDetail>(
    () => getVenue(slug),
    [slug],
    "Không tải được thông tin sân",
  );

  if (isLoading || !data) {
    return (
      <Screen backgroundColor="#efefef">
        {errorMessage ? <ErrorMessage text={errorMessage} /> : <LoadingState label="Đang tải thông tin sân…" />}
      </Screen>
    );
  }

  return (
    <ProductDetail
      bookingDates={buildBookingDates(slug, todayInAppTimezone())}
      onPaid={reload}
      product={{
        address: data.address,
        directionsHref: data.directionsHref,
        events: data.events,
        openingLabel: data.openingLabel,
        phone: data.phone,
        slug: data.slug,
        venue: data.venue,
      }}
    />
  );
}
