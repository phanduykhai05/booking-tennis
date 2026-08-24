import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";

import type { Venue } from "@/components/home/NearbyVenues/types";
import type { SportCategory } from "@/components/home/SportCategories/types";
import VenueFilterContent from "@/components/home/VenueFilterContent";
import PublicFooter from "@/components/layouts/PublicFooter";
import PublicHeader from "@/components/layouts/PublicHeader";
import ScrollToTop from "@/components/layouts/ScrollToTop";
import { scrollToTopLabel } from "@/components/layouts/ScrollToTop/mockData";
import { ErrorMessage, LoadingState } from "@/components/ui/Feedback";
import Screen from "@/components/ui/Screen";
import { getSports, getVenues } from "@/lib/api/endpoints";
import { matchesQuery } from "@/lib/format";
import { useAsync } from "@/lib/useAsync";

const VISIBLE_AFTER = 320;

type HomeData = { sports: SportCategory[]; venues: Venue[] };

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { data, errorMessage, isLoading } = useAsync<HomeData>(
    async () => {
      const [sports, venues] = await Promise.all([getSports(), getVenues()]);
      return { sports, venues };
    },
    [],
    "Không tải được danh sách sân",
  );

  const venues = data?.venues ?? [];
  const visibleVenues = searchValue.trim()
    ? venues.filter((venue) => matchesQuery(venue.name, searchValue) || matchesQuery(venue.address, searchValue))
    : venues;

  return (
    <Screen backgroundColor="#0f9b58" statusBarStyle="light">
      <View className="flex-1 bg-[#f2f4f6]">
        <PublicHeader onSearchChange={setSearchValue} searchValue={searchValue} />

        <ScrollView
          contentContainerClassName="pb-32"
          keyboardShouldPersistTaps="handled"
          onScroll={(event) => setIsScrolled(event.nativeEvent.contentOffset.y > VISIBLE_AFTER)}
          ref={scrollRef}
          scrollEventThrottle={64}
        >
          {isLoading ? (
            <LoadingState label="Đang tải danh sách sân…" />
          ) : errorMessage ? (
            <View className="p-4">
              <ErrorMessage text={errorMessage} />
            </View>
          ) : (
            <VenueFilterContent sports={data?.sports ?? []} venues={visibleVenues} />
          )}
        </ScrollView>

        <ScrollToTop
          isVisible={isScrolled}
          label={scrollToTopLabel}
          onPress={() => scrollRef.current?.scrollTo({ animated: true, y: 0 })}
        />
        <PublicFooter activeItemId="home" />
      </View>
    </Screen>
  );
}
