import type { HomeBannerItem } from "@/components/home/HomeBanner/mockData";

type CarouselControlsProps = {
  activeIndex: number;
  items: HomeBannerItem[];
  maxIndex: number;
  onNavigate: (index: number) => void;
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path
        d={direction === "left" ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function CarouselControls({ activeIndex, items, maxIndex, onNavigate }: CarouselControlsProps) {
  return (
    <>
      <button
        aria-label="Banner trước"
        className="absolute left-0 top-[40%] hidden h-[46px] w-8 items-center justify-center bg-black/50 text-white opacity-40 transition-opacity hover:opacity-80 md:flex disabled:cursor-not-allowed disabled:opacity-0"
        disabled={activeIndex === 0}
        onClick={() => onNavigate(activeIndex - 1)}
        type="button"
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        aria-label="Banner tiếp theo"
        className="absolute right-0 top-[40%] hidden h-[46px] w-8 items-center justify-center bg-black/50 text-white opacity-40 transition-opacity hover:opacity-80 md:flex disabled:cursor-not-allowed disabled:opacity-0"
        disabled={activeIndex === maxIndex}
        onClick={() => onNavigate(activeIndex + 1)}
        type="button"
      >
        <ArrowIcon direction="right" />
      </button>
      <div className="flex h-5 items-center justify-center gap-[10px]" role="tablist">
        {items.map((item, index) => (
          <button
            aria-label={`Hiển thị banner ${index + 1}`}
            aria-selected={index === activeIndex}
            className={`size-2 rounded-full ${index === activeIndex ? "bg-[#2dc275]" : "bg-white"}`}
            key={item.id}
            onClick={() => onNavigate(Math.min(index, maxIndex))}
            role="tab"
            type="button"
          />
        ))}
      </div>
    </>
  );
}
