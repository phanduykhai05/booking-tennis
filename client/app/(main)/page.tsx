import PublicFooter from "@/components/layouts/PublicFooter";
import PublicHeader from "@/components/layouts/PublicHeader";
import HomeBanner from "@/components/home/HomeBanner";
import FeaturedStars from "@/components/home/FeaturedStars";
import SpecialEvents from "@/components/home/SpecialEvents";
import TrendingEvents from "@/components/home/TrendingEvents";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import ResaleEvents from "@/components/home/ResaleEvents";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <PublicHeader />
      <main className="flex-1 bg-[#28272c]">
        <HomeBanner />
        <FeaturedStars />
        <SpecialEvents />
        <TrendingEvents />
        <UpcomingEvents />
        <ResaleEvents />
      </main>
      <PublicFooter />
    </div>
  );
}
