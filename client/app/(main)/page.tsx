import VenueFilterContent from "@/components/home/VenueFilterContent";
import PublicFooter from "@/components/layouts/PublicFooter";
import PublicHeader from "@/components/layouts/PublicHeader";
import ScrollToTop from "@/components/layouts/ScrollToTop";
import { scrollToTopLabel } from "@/components/layouts/ScrollToTop/mockData";
import { getSports, getVenues } from "@/lib/api/endpoints";

export default async function Home() {
  const [sports, venues] = await Promise.all([getSports(), getVenues()]);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <PublicHeader />
      <main className="flex-1 bg-[#f2f4f6] pb-24">
        <div className="mx-auto w-full max-w-[1275px]">
          <VenueFilterContent sports={sports} venues={venues} />
        </div>
      </main>
      <ScrollToTop label={scrollToTopLabel} />
      <PublicFooter />
    </div>
  );
}
