"use client";

import { useRef } from "react";

import StarCard from "@/components/home/FeaturedStars/components/StarCard";
import type { FeaturedStar } from "@/components/home/FeaturedStars/mockData";

type StarsCarouselProps = {
  items: FeaturedStar[];
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path d="m15 6-6 6 6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export default function StarsCarousel({ items }: StarsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "next" | "previous") => {
    scrollRef.current?.scrollBy({
      behavior: "smooth",
      left: direction === "next" ? 166 : -166,
    });
  };

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto" ref={scrollRef}>
        {items.map((item) => (
          <StarCard item={item} key={item.id} />
        ))}
      </div>
      <button aria-label="Ngôi sao trước" className="absolute left-0 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-r bg-black/50 text-white opacity-60 transition-opacity hover:opacity-90" onClick={() => scroll("previous")} type="button">
        <ArrowIcon />
      </button>
      <button aria-label="Ngôi sao tiếp theo" className="absolute right-0 top-1/2 flex size-8 -translate-y-1/2 rotate-180 items-center justify-center rounded-r bg-black/50 text-white opacity-60 transition-opacity hover:opacity-90" onClick={() => scroll("next")} type="button">
        <ArrowIcon />
      </button>
    </div>
  );
}
