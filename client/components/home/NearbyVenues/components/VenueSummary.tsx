import { Clock } from "lucide-react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";

import images from "@/components/assets/images";
import type { NearbyVenuesContent, Venue, VenueLogoKey } from "@/components/home/NearbyVenues/types";

type VenueSummaryProps = {
  content: NearbyVenuesContent;
  onOpen: () => void;
  venue: Venue;
};

const logoImages: Record<VenueLogoKey, StaticImageData> = {
  badminton: images.sports.badminton,
  football: images.sports.football,
  pickleball: images.sports.pickleball,
  tennis: images.sports.tennis,
};

export default function VenueSummary({ content, onOpen, venue }: VenueSummaryProps) {
  return (
    // flex-wrap + min-w trên khối chữ: card hẹp thì nút tụt xuống hàng riêng thay vì bóp nát địa chỉ.
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5 px-3 py-3">
      <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-50 ring-1 ring-slate-900/[0.06]">
        <Image alt="" className="size-8 object-contain" height={64} src={logoImages[venue.logo]} width={64} />
      </span>

      <div className="min-w-[132px] flex-1">
        <button className="block max-w-full truncate text-left text-[16px] font-bold leading-5 text-[#12324f] transition hover:text-[#0f9b58] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f9b58]" onClick={onOpen} type="button">{venue.name}</button>
        <p className="mt-0.5 truncate text-xs leading-4">
          <span className="font-semibold text-[#16a34a]">({venue.distanceLabel})</span> <span className="text-slate-500">{venue.address}</span>
        </p>
        <p className="mt-1 flex items-center gap-1 text-xs leading-4 text-slate-500">
          <Clock aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.8} />
          {venue.openingLabel}
        </p>
      </div>

      <Link
        className="inline-flex h-8 w-full shrink-0 items-center justify-center rounded-md bg-[#f0a01e] px-3.5 text-xs font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#dd9013] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a01e]/50 active:scale-[0.97] @[330px]:w-auto"
        href={venue.productHref}
      >
        {content.bookLabel}
      </Link>
    </div>
  );
}
