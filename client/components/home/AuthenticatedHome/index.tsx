import { useState } from "react";

import AuthenticatedHomeHeader from "@/components/home/AuthenticatedHome/components/AuthenticatedHomeHeader";
import { authenticatedHomeContent } from "@/components/home/AuthenticatedHome/content";
import type { Venue } from "@/components/home/NearbyVenues/types";
import type { SportCategory } from "@/components/home/SportCategories/types";
import VenueFilterContent from "@/components/home/VenueFilterContent";
import PublicFooter from "@/components/layouts/PublicFooter";
import Screen from "@/components/ui/Screen";
import { formatWeekdayDate, todayInAppTimezone } from "@/lib/date";
import { matchesQuery } from "@/lib/format";
import { useSession } from "@/lib/api/session";

type AuthenticatedHomeProps = {
  sports: SportCategory[];
  venues: Venue[];
};

export default function AuthenticatedHome({ sports, venues }: AuthenticatedHomeProps) {
  const { session } = useSession();
  const [searchValue, setSearchValue] = useState("");
  const profile = session?.user;

  const visibleVenues = searchValue.trim()
    ? venues.filter((venue) => matchesQuery(venue.name, searchValue) || matchesQuery(venue.address, searchValue))
    : venues;

  return (
    <Screen backgroundColor="#087442" statusBarStyle="light">
      <div className="flex-1 bg-[#f5f6f5]">
        <AuthenticatedHomeHeader
          avatarInitial={profile?.avatarInitial ?? authenticatedHomeContent.guestInitial}
          date={formatWeekdayDate(todayInAppTimezone())}
          name={profile?.fullName ?? authenticatedHomeContent.guestName}
          onSearchChange={setSearchValue}
          searchPlaceholder={authenticatedHomeContent.searchPlaceholder}
          searchValue={searchValue}
        />

        <div className="grow shrink overflow-y-auto overflow-x-hidden">
          <div className="pb-32">
            <VenueFilterContent showPromotion sports={sports} venues={visibleVenues} />
          </div>
        </div>

        <PublicFooter activeItemId="home" />
      </div>
    </Screen>
  );
}
