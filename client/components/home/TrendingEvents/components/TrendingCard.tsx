import TrendingMedia from "@/components/home/TrendingEvents/components/TrendingMedia";
import RankIcon from "@/components/home/TrendingEvents/components/RankIcon";
import type { TrendingEvent } from "@/components/home/TrendingEvents/mockData";

type TrendingCardProps = {
  item: TrendingEvent;
};

export default function TrendingCard({ item }: TrendingCardProps) {
  return (
    <article aria-label={`${item.rank}. ${item.title}`} className="relative w-[calc(78vw_+_55px)] max-w-[347px] shrink-0 overflow-visible py-1 sm:w-[347px]">
      <span className={`absolute bottom-9 translate-y-1/2 z-1 ${item.rank === 1 ? "left-[40px]" : "left-[20px]"}`}>
        <RankIcon rank={item.rank} />
      </span>
      <div className="relative ml-[55px] aspect-video w-[calc(100%_-_55px)] overflow-hidden rounded-xl bg-[#343338] shadow-sm">
        <TrendingMedia alt={item.title} src={item.imageUrl} />
      </div>
    </article>
  );
}
