import { useLocalSearchParams } from "expo-router";

import CourtScheduleBooking from "@/components/booking/CourtScheduleBooking";
import type { CourtScheduleData } from "@/components/booking/CourtScheduleBooking/types";
import { ErrorMessage, LoadingState } from "@/components/ui/Feedback";
import Screen from "@/components/ui/Screen";
import { getVenueSchedule } from "@/lib/api/endpoints";
import { todayInAppTimezone } from "@/lib/date";
import { useAsync } from "@/lib/useAsync";

export default function ProductScheduleScreen() {
  const { date: requestedDate, slug } = useLocalSearchParams<{ date?: string; slug: string }>();
  const date = typeof requestedDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(requestedDate) ? requestedDate : todayInAppTimezone();

  const { data, errorMessage, isLoading } = useAsync<CourtScheduleData>(
    () => getVenueSchedule(slug, date),
    [slug, date],
    "Không tải được lịch sân",
  );

  if (isLoading || !data) {
    return (
      <Screen backgroundColor="#f2fbf5">
        {errorMessage ? <ErrorMessage text={errorMessage} /> : <LoadingState label="Đang tải lịch sân…" />}
      </Screen>
    );
  }

  return <CourtScheduleBooking backHref={`/product/${slug}`} initialDate={date} initialSchedule={data} venueId={slug} />;
}
