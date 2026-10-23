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
      <div className="flex-1 bg-[#f5f6f5]">
        <div className="h-[59px] items-center justify-center bg-[#00925a]">
          <span className="text-[17px] font-bold text-white">Nổi bật</span>
        </div>

        {isLoading ? (
          <LoadingState label="Đang tải sân nổi bật…" />
        ) : errorMessage ? (
          <div className="p-4">
            <ErrorMessage text={errorMessage} />
          </div>
        ) : venues.length === 0 ? (
          <span className="px-6 py-16 text-center text-[14px] text-[#68716d]">Chưa có sân nào được gắn nổi bật.</span>
        ) : (
          <div className="grow shrink overflow-y-auto overflow-x-hidden">
            <div className="pb-32 pt-3">
              <NearbyVenues venues={venues} />
            </div>
          </div>
        )}

        <PublicFooter activeItemId="popular" />
      </div>
    </Screen>
  );
}
