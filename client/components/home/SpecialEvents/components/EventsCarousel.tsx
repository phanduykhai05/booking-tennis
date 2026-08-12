"use client";

import { useEffect, useRef, useState } from "react";
import type { DragEvent, MouseEvent, PointerEvent } from "react";

import EventCard from "@/components/home/SpecialEvents/components/EventCard";
import styles from "@/components/home/SpecialEvents/SpecialEvents.module.scss";
import type { SpecialEvent } from "@/components/home/SpecialEvents/mockData";

type EventsCarouselProps = {
  items: SpecialEvent[];
};

const CARD_STEP = 278;
const DRAG_THRESHOLD = 5;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path d="m15 6-6 6 6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export default function EventsCarousel({ items }: EventsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ moved: false, startScrollLeft: 0, startX: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const scroll = (direction: "next" | "previous") => {
    scrollRef.current?.scrollBy({ behavior: "smooth", left: direction === "next" ? CARD_STEP : -CARD_STEP });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container || event.pointerType !== "mouse" || event.button !== 0) return;

    drag.current = { moved: false, startScrollLeft: container.scrollLeft, startX: event.clientX };
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (event: globalThis.PointerEvent) => {
      const container = scrollRef.current;
      if (!container) return;
      const distance = event.clientX - drag.current.startX;
      if (Math.abs(distance) > DRAG_THRESHOLD) drag.current.moved = true;
      container.scrollLeft = drag.current.startScrollLeft - distance;
    };
    const stopDragging = () => setIsDragging(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    };
  }, [isDragging]);

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!drag.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.moved = false;
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => event.preventDefault();

  return (
    <div className="relative">
      <div
        className={`flex gap-4 overflow-x-auto ${styles.scrollArea} ${isDragging ? styles.dragging : ""}`}
        onClickCapture={handleClickCapture}
        onDragStart={handleDragStart}
        onPointerDown={handlePointerDown}
        ref={scrollRef}
      >
        {items.map((item) => <EventCard item={item} key={item.id} />)}
      </div>
      <button aria-label="Sự kiện trước" className="absolute left-0 top-1/2 hidden h-11 w-8 items-center justify-center rounded-r-md bg-black/50 text-white sm:flex" onClick={() => scroll("previous")} type="button">
        <ArrowIcon />
      </button>
      <button aria-label="Sự kiện tiếp theo" className="absolute right-0 top-1/2 hidden h-11 w-8 rotate-180 items-center justify-center rounded-r-md bg-black/50 text-white sm:flex" onClick={() => scroll("next")} type="button">
        <ArrowIcon />
      </button>
    </div>
  );
}
