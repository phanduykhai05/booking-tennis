import Link from "next/link";

import BannerMedia from "@/components/home/HomeBanner/components/BannerMedia";
import type { HomeBannerItem } from "@/components/home/HomeBanner/mockData";

type BannerCardProps = {
  item: HomeBannerItem;
};

export default function BannerCard({ item }: BannerCardProps) {
  const isExternalUrl = item.href.startsWith("http");

  return (
    <article className="relative mx-[5px] mb-6 aspect-[16/9] overflow-hidden rounded-xl bg-zinc-600">
      <BannerMedia item={item} />
      <div className="absolute bottom-4 left-4 z-10">
        <Link
          className="flex h-8 items-center justify-center rounded bg-white px-4 text-sm font-normal text-black"
          href={item.href}
          rel={isExternalUrl ? "noopener noreferrer" : undefined}
          target={isExternalUrl ? "_blank" : undefined}
        >
          {item.ctaLabel}
        </Link>
      </div>
    </article>
  );
}
