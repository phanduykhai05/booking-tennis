import Image from "next/image";

import type { HomeBannerItem } from "@/components/home/HomeBanner/mockData";

type BannerMediaProps = {
  item: HomeBannerItem;
};

function VideoBadge() {
  return (
    <span className="absolute bottom-2 right-2 z-10 text-white/50">
      <svg aria-hidden="true" className="size-8" fill="none" viewBox="0 0 32 32">
        <path
          d="M5.33 5.33A2.67 2.67 0 0 0 2.67 8v16a2.67 2.67 0 0 0 2.66 2.67h21.34A2.67 2.67 0 0 0 29.33 24V8a2.67 2.67 0 0 0-2.66-2.67H5.33Zm15.15 11.75a1.33 1.33 0 0 0 0-2.17l-5.7-4.07a1.33 1.33 0 0 0-2.11 1.08v8.16a1.33 1.33 0 0 0 2.11 1.08l5.7-4.07Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export default function BannerMedia({ item }: BannerMediaProps) {
  return (
    <>
      {item.videoUrl && (
        <div className="absolute inset-0 z-[1] overflow-hidden">
          <video className="size-full object-cover opacity-0" playsInline poster={item.imageUrl} preload="metadata">
            <source src={item.videoUrl} type="video/mp4" />
          </video>
        </div>
      )}
      <Image
        alt={item.title}
        className="z-[3] object-cover"
        draggable={false}
        fill
        sizes="(max-width: 767px) 100vw, 663px"
        src={item.imageUrl}
      />
      {item.videoUrl && <VideoBadge />}
    </>
  );
}
