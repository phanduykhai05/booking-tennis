import { Link } from "react-router";

import images from "@/components/assets/images";
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
        <h1 className="sr-only">Nổi bật</h1>

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
            <div className="gap-[10px] px-[9px] pb-32 pt-[9px] lg:grid lg:grid-cols-2 lg:gap-x-[30px] lg:gap-y-[11px] lg:px-[30px] lg:pt-[30px]">
              {venues.map((venue) => (
                <div className="aspect-[2/1] overflow-hidden rounded-lg bg-[#eef1ef]" key={venue.id} style={{ boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)" }}>
                  <img alt="" className="absolute inset-0 h-full w-full object-cover" src={images.venueCovers[venue.cover]} />
                  <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)" }} />
                  <div className="absolute inset-x-3 bottom-3 flex-row items-end justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <span className="truncate text-[16px] font-extrabold text-white">{venue.name}</span>
                      <span className="truncate text-[12px] text-white/90">{venue.address}</span>
                    </div>
                    <Link className="flex h-[26px] shrink-0 items-center rounded bg-[#e2af30] px-[17px] text-[11px] font-extrabold text-white" to={venue.productHref}>
                      ĐẶT LỊCH NGAY
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <PublicFooter activeItemId="popular" />
      </div>
    </Screen>
  );
}
