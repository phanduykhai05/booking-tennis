import Link from "next/link";

import EventMedia from "@/components/home/SpecialEvents/components/EventMedia";
import type { SpecialEvent } from "@/components/home/SpecialEvents/mockData";

type EventCardProps = {
  item: SpecialEvent;
};

export default function EventCard({ item }: EventCardProps) {
  return (
    <Link
      aria-label={item.title}
      className="relative block aspect-[3/4] w-[44vw] max-w-[262px] shrink-0 overflow-hidden rounded-[10px] bg-[#343338] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2dc275] sm:w-[262px]"
      href={item.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <EventMedia alt={item.title} src={item.imageUrl} />
    </Link>
  );
}
