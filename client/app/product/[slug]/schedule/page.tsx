import { notFound } from "next/navigation";

import CourtScheduleBooking from "@/components/booking/CourtScheduleBooking";
import type { CourtScheduleData } from "@/components/booking/CourtScheduleBooking/types";
import { getVenueSchedule } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/http";
import { todayInAppTimezone } from "@/lib/date";

async function loadSchedule(slug: string, date: string): Promise<CourtScheduleData> {
  try {
    return await getVenueSchedule(slug, date);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
}

export default async function ProductSchedulePage({ params, searchParams }: PageProps<"/product/[slug]/schedule">) {
  const { slug } = await params;
  const { date: requestedDate } = await searchParams;
  const date = typeof requestedDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(requestedDate) ? requestedDate : todayInAppTimezone();
  const schedule = await loadSchedule(slug, date);

  return (
    <CourtScheduleBooking
      backHref={`/product/${slug}`}
      initialDate={date}
      initialSchedule={schedule}
      venueId={slug}
    />
  );
}
