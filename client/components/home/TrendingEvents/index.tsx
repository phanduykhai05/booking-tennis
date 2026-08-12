import FireIcon from "@/components/home/TrendingEvents/components/FireIcon";
import TrendingCarousel from "@/components/home/TrendingEvents/components/TrendingCarousel";
import { trendingEventsMockData } from "@/components/home/TrendingEvents/mockData";

export default function TrendingEvents() {
  return (
    <section aria-labelledby="trending-events-title" className="my-14 overflow-hidden px-4 sm:px-8 xl:px-[52px]">
      <div className="mx-auto w-full max-w-[1344px]">
        <div className="mb-4 flex items-center gap-2">
          <FireIcon />
          <h2 className="text-base font-bold text-white" id="trending-events-title">{trendingEventsMockData.title}</h2>
        </div>
        <TrendingCarousel items={trendingEventsMockData.items} />
      </div>
    </section>
  );
}
