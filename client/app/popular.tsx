import { ScrollView, Text, View } from "react-native";

import NearbyVenues from "@/components/home/NearbyVenues";
import type { Venue } from "@/components/home/NearbyVenues/types";
import PublicFooter from "@/components/layouts/PublicFooter";
import { ErrorMessage, LoadingState } from "@/components/ui/Feedback";
import Screen from "@/components/ui/Screen";
import { getVenues } from "@/lib/api/endpoints";
import { useAsync } from "@/lib/useAsync";

/** Sân được đánh dấu `isFeatured` ở server; lấy qua `GET /venues?featured=true`. */
export default function PopularScreen() {
  const { data, errorMessage, isLoading } = useAsync<Venue[]>(
    () => getVenues({ featured: true }),
    [],
    "Không tải được danh sách sân nổi bật",
  );

  const venues = data ?? [];

  return (
    <Screen backgroundColor="#0f9b58" statusBarStyle="light">
      <View className="flex-1 bg-[#f5f6f5]">
        <View className="h-[59px] items-center justify-center bg-[#00925a]">
          <Text className="text-[17px] font-bold text-white">Nổi bật</Text>
        </View>

        {isLoading ? (
          <LoadingState label="Đang tải sân nổi bật…" />
        ) : errorMessage ? (
          <View className="p-4">
            <ErrorMessage text={errorMessage} />
          </View>
        ) : venues.length === 0 ? (
          <Text className="px-6 py-16 text-center text-[14px] text-[#68716d]">Chưa có sân nào được gắn nổi bật.</Text>
        ) : (
          <ScrollView contentContainerClassName="pb-32 pt-3">
            <NearbyVenues venues={venues} />
          </ScrollView>
        )}

        <PublicFooter activeItemId="popular" />
      </View>
    </Screen>
  );
}
