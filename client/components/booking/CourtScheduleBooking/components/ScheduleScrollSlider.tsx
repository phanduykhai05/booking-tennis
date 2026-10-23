import type { PointerEvent } from "react";

import { shadow } from "@/components/ui/theme";

type ScheduleScrollSliderProps = {
  label: string;
  onSeek: (ratio: number) => void;
  ratio: number;
};

const THUMB_SIZE = 18;

/**
 * Thanh trượt điều khiển vị trí cuộn ngang của lưới. Lưới vẫn vuốt trực tiếp được,
 * thanh này cho biết đang ở đâu trong dải giờ và nhảy nhanh tới khung giờ xa.
 * Dùng pointer capture để kéo tiếp được cả khi ngón tay trượt ra ngoài thanh.
 */
export default function ScheduleScrollSlider({ label, onSeek, ratio }: ScheduleScrollSliderProps) {
  const seekFromEvent = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const usable = Math.max(rect.width - THUMB_SIZE, 1);
    onSeek(Math.max(0, Math.min(1, (event.clientX - rect.left - THUMB_SIZE / 2) / usable)));
  };

  return (
    <div className="px-4 py-2">
      <div className="rounded-full border border-[#dbe7e0] bg-white px-4 py-2" style={shadow.card}>
        <div
          aria-label={label}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={Math.round(ratio * 100)}
          className="h-[22px] touch-none justify-center"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            seekFromEvent(event);
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) seekFromEvent(event);
          }}
          role="slider"
        >
          <div className="h-1 w-full rounded-full bg-[#e3ebe7]" />
          <div
            className="absolute h-[18px] w-[18px] rounded-full border-[3px] border-white bg-[#22a45d]"
            style={{ left: `calc((100% - ${THUMB_SIZE}px) * ${ratio})`, ...shadow.card }}
          />
        </div>
      </div>
    </div>
  );
}
