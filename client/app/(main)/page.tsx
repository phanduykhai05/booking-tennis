import NearbyFilters from "@/components/home/NearbyFilters";
import NearbyVenues from "@/components/home/NearbyVenues";
import SportCategories from "@/components/home/SportCategories";
import PublicFooter from "@/components/layouts/PublicFooter";
import PublicHeader from "@/components/layouts/PublicHeader";
import ScrollToTop from "@/components/layouts/ScrollToTop";
import { scrollToTopLabel } from "@/components/layouts/ScrollToTop/mockData";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <PublicHeader />
      <main className="flex-1 bg-[#f2f4f6] pb-24">
        <div className="mx-auto w-full max-w-[1275px]">
          <NearbyFilters />
          <SportCategories />
          <NearbyVenues />
        </div>
      </main>
      <ScrollToTop label={scrollToTopLabel} />
      <PublicFooter />
    </div>
  );
}
