"use client";

import { useEffect, useRef, useState } from "react";

import BannerCard from "@/components/home/HomeBanner/components/BannerCard";
import CarouselControls from "@/components/home/HomeBanner/components/CarouselControls";
import { homeBannerMockData } from "@/components/home/HomeBanner/mockData";

const MOBILE_BREAKPOINT = "(max-width: 767px)";
const WHEEL_LOCK_DURATION = 450;
const DRAG_THRESHOLD = 60;

export default function HomeBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(2);
  const carouselRef = useRef<HTMLDivElement>(null);
  const displayedIndexRef = useRef(0);
  const dragStartIndex = useRef(0);
  const dragStartX = useRef<number | null>(null);
  const maxIndexRef = useRef(0);
  const wheelLocked = useRef(false);
  const wheelUnlockTimer = useRef<number | null>(null);
  const maxIndex = Math.max(homeBannerMockData.length - slidesToShow, 0);
  const displayedIndex = Math.min(activeIndex, maxIndex);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
    const syncSlidesToShow = () => setSlidesToShow(mediaQuery.matches ? 1 : 2);

    syncSlidesToShow();
    mediaQuery.addEventListener("change", syncSlidesToShow);
    return () => mediaQuery.removeEventListener("change", syncSlidesToShow);
  }, []);

  const goTo = (index: number) => setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragStartX.current = event.clientX;
    dragStartIndex.current = displayedIndex;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    setDragOffset(event.clientX - dragStartX.current);
  };
  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;

    const distance = event.clientX - dragStartX.current;
    const nextIndex =
      distance <= -DRAG_THRESHOLD
        ? dragStartIndex.current + 1
        : distance >= DRAG_THRESHOLD
          ? dragStartIndex.current - 1
          : dragStartIndex.current;

    dragStartX.current = null;
    setDragOffset(0);
    setIsDragging(false);
    goTo(nextIndex);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  useEffect(() => {
    displayedIndexRef.current = displayedIndex;
    maxIndexRef.current = maxIndex;
  }, [displayedIndex, maxIndex]);

  useEffect(() => {
    const carouselElement = carouselRef.current;

    if (!carouselElement) return;

    const handleWheel = (event: WheelEvent) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

      if (wheelLocked.current || delta === 0 || maxIndexRef.current === 0) return;

      event.preventDefault();
      wheelLocked.current = true;
      setActiveIndex(
        Math.max(0, Math.min(displayedIndexRef.current + (delta > 0 ? 1 : -1), maxIndexRef.current)),
      );

      wheelUnlockTimer.current = window.setTimeout(() => {
        wheelLocked.current = false;
      }, WHEEL_LOCK_DURATION);
    };

    carouselElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      carouselElement.removeEventListener("wheel", handleWheel);
      if (wheelUnlockTimer.current !== null) window.clearTimeout(wheelUnlockTimer.current);
    };
  }, []);

  return (
    <section aria-label="Sự kiện nổi bật" className="mx-auto mt-16 w-full max-w-[1336px] px-4 lg:px-0">
      <div
        className="relative cursor-grab select-none touch-pan-y active:cursor-grabbing"
        onDragStart={(event) => event.preventDefault()}
        onPointerCancel={handlePointerEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        ref={carouselRef}
      >
        <div className="overflow-hidden">
          <div
            className={`flex ${isDragging ? "" : "transition-transform duration-500 ease-[cubic-bezier(.665,.235,.265,.8)]"}`}
            style={{ transform: `translate3d(calc(-${displayedIndex * (100 / slidesToShow)}% + ${dragOffset}px), 0, 0)` }}
          >
            {homeBannerMockData.map((item) => (
              <div className="w-full shrink-0 md:w-1/2" key={item.id}>
                <BannerCard item={item} />
              </div>
            ))}
          </div>
        </div>
        <CarouselControls
          activeIndex={displayedIndex}
          items={homeBannerMockData}
          maxIndex={maxIndex}
          onNavigate={goTo}
        />
      </div>
    </section>
  );
}
