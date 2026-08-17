"use client";

import AuthenticatedHomeHeader from "@/components/home/AuthenticatedHome/components/AuthenticatedHomeHeader";
import { authenticatedHomeContent } from "@/components/home/AuthenticatedHome/content";
import type { Venue } from "@/components/home/NearbyVenues/types";
import type { SportCategory } from "@/components/home/SportCategories/types";
import VenueFilterContent from "@/components/home/VenueFilterContent";
import PublicFooter from "@/components/layouts/PublicFooter";
import { useSession } from "@/lib/api/session";

type AuthenticatedHomeProps = {
  sports: SportCategory[];
  venues: Venue[];
};

const weekdayLabels = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

// Ngày hiện tại theo giờ Việt Nam, dạng "Thứ ba, 18/08/2026".
function formatToday() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Bangkok",
    year: "numeric",
    weekday: "short",
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const weekday = weekdayLabels[new Date(`${get("year")}-${get("month")}-${get("day")}T12:00:00.000Z`).getUTCDay()];
  return `${weekday}, ${get("day")}/${get("month")}/${get("year")}`;
}

export default function AuthenticatedHome({ sports, venues }: AuthenticatedHomeProps) {
  const { session } = useSession();
  const profile = session?.user;

  return (
    <div className="min-h-[100dvh] bg-[#f5f6f5] pb-24">
      <AuthenticatedHomeHeader
        avatarInitial={profile?.avatarInitial ?? authenticatedHomeContent.guestInitial}
        date={formatToday()}
        name={profile?.fullName ?? authenticatedHomeContent.guestName}
        searchLabel={authenticatedHomeContent.searchLabel}
        searchPlaceholder={authenticatedHomeContent.searchPlaceholder}
      />
      <main>
        <VenueFilterContent showPromotion sports={sports} venues={venues} />
      </main>
      <PublicFooter activeItemId="home" />
    </div>
  );
}
