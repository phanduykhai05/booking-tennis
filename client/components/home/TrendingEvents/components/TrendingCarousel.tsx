"use client";

import { useEffect, useRef, useState } from "react";
import type { DragEvent, PointerEvent } from "react";

import TrendingCard from "@/components/home/TrendingEvents/components/TrendingCard";
import styles from "@/components/home/TrendingEvents/TrendingEvents.module.scss";
import type { TrendingEvent } from "@/components/home/TrendingEvents/mockData";

type TrendingCarouselProps = {
  items: TrendingEvent[];
};

const DRAG_THRESHOLD = 5;

export default function TrendingCarousel({ items }: TrendingCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ startScrollLeft: 0, startX: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container || event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = { startScrollLeft: container.scrollLeft, startX: event.clientX };
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (event: globalThis.PointerEvent) => {
      const container = scrollRef.current;
      if (!container) return;
      const distance = event.clientX - drag.current.startX;
      if (Math.abs(distance) < DRAG_THRESHOLD) return;
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

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => event.preventDefault();

  return (
    <div
      className={`flex gap-2 overflow-x-auto py-1 ${styles.scrollArea} ${isDragging ? styles.dragging : ""}`}
      onDragStart={handleDragStart}
      onPointerDown={handlePointerDown}
      ref={scrollRef}
    >
      {items.map((item) => <TrendingCard item={item} key={item.id} />)}
    </div>
  );
}
