import { ArrowLeft, Heart, MapPin, Navigation, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import venueCover from "@/components/assets/images/uploads/venues/pickleball_cover.png";

type ProductHeroProps = {
  address: string;
  bookLabel: string;
  scheduleHref: string;
  venue: string;
};

export default function ProductHero({ address, bookLabel, scheduleHref, venue }: ProductHeroProps) {
  return (
    <header className="relative h-[143px] overflow-hidden text-white">
      <Image alt="Sân Pickleball" className="object-cover" fill priority sizes="(max-width: 430px) 100vw, 410px" src={venueCover} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,18,21,.14),rgba(0,24,25,.7))]" />
      <Link aria-label="Quay lại" className="absolute left-2 top-4 rounded-full p-1.5 transition hover:bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" href="/">
        <ArrowLeft aria-hidden="true" size={20} />
      </Link>
      <div className="absolute right-3 top-3 flex items-center gap-2 text-xs">
        <Heart aria-hidden="true" className="rounded-full bg-[#ed2d56] p-1 text-[#ffdf1b]" fill="currentColor" size={23} />
        <span className="flex items-center gap-1"><Navigation aria-hidden="true" size={13} />Chỉ đường</span>
        <Link className="rounded-full bg-[#efb91f] px-3 py-2 font-bold text-white transition hover:bg-[#dca50e]" href={scheduleHref}>{bookLabel}</Link>
      </div>
      <div className="absolute bottom-4 left-5 right-4 flex items-end gap-3">
        <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl border-2 border-white bg-[#f7f2d8] text-xs font-black text-[#006d37]">ĐTG</span>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[17px] font-bold">{venue}</h1>
          <p className="mt-1 flex items-center gap-1 truncate text-[12px] text-white/90"><MapPin aria-hidden="true" size={12} />{address}</p>
        </div>
        <button aria-label="Chia sẻ" className="rounded-full bg-white/95 p-2 text-[#213b35]" type="button"><Share2 aria-hidden="true" size={16} /></button>
      </div>
    </header>
  );
}
