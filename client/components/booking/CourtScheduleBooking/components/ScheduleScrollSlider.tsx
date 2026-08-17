"use client";

import { type RefObject, useEffect, useState } from "react";

import styles from "@/components/booking/CourtScheduleBooking/components/ScheduleScrollSlider.module.scss";

type ScheduleScrollSliderProps = {
  label: string;
  targetRef: RefObject<HTMLDivElement | null>;
};

const getMaxScroll = (node: HTMLDivElement) => Math.max(node.scrollWidth - node.clientWidth, 0);

// Thanh trượt điều khiển vị trí cuộn ngang của lưới: trên mobile khó kéo trực tiếp vì mỗi ô chỉ rộng vài chục px.
export default function ScheduleScrollSlider({ label, targetRef }: ScheduleScrollSliderProps) {
  const [ratio, setRatio] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;

    const syncFromScroll = () => {
      const maxScroll = getMaxScroll(node);
      setIsScrollable(maxScroll > 0);
      setRatio(maxScroll === 0 ? 0 : node.scrollLeft / maxScroll);
    };

    syncFromScroll();
    node.addEventListener("scroll", syncFromScroll, { passive: true });
    const observer = new ResizeObserver(syncFromScroll);
    observer.observe(node);

    return () => {
      node.removeEventListener("scroll", syncFromScroll);
      observer.disconnect();
    };
  }, [targetRef]);

  const scrollToRatio = (nextRatio: number) => {
    const node = targetRef.current;
    if (!node) return;

    node.scrollLeft = getMaxScroll(node) * nextRatio;
    setRatio(nextRatio);
  };

  return (
    <div className="px-4 py-2">
      <div className="rounded-full border border-[#dbe7e0] bg-white px-4 py-2 shadow-[0_1px_4px_rgba(11,107,62,.12)]">
        <input
          aria-label={label}
          aria-valuetext={`${Math.round(ratio * 100)}%`}
          className={styles.slider}
          disabled={!isScrollable}
          max={1}
          min={0}
          onChange={(event) => scrollToRatio(Number(event.target.value))}
          step={0.01}
          style={{ accentColor: "#22a45d" }}
          type="range"
          value={ratio}
        />
      </div>
    </div>
  );
}
