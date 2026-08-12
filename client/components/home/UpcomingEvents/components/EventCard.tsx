import { CalendarDays } from "lucide-react";

import EventMedia from "@/components/home/UpcomingEvents/components/EventMedia";
import type { UpcomingEvent } from "@/components/home/UpcomingEvents/types";

type EventCardProps = {
  item: UpcomingEvent;
};

export default function EventCard({ item }: EventCardProps) {
  return (
    <article className="min-w-0">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-[#343338]">
        <EventMedia alt={item.title} src={item.imageUrl} />
      </div>
      <div className="pt-4">
        <h3 className="line-clamp-2 min-h-[42px] text-sm font-bold leading-[21px] text-white">{item.title}</h3>
        <p className="mt-2 text-sm font-semibold leading-5 text-[#2dc275]">{item.price}</p>
        <p className="mt-3 flex items-center gap-2 text-xs leading-4 text-white">
          <CalendarDays aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />
          {item.date}
        </p>
      </div>
    </article>
  );
}
