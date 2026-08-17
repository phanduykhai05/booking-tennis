import { PackageCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import images from "@/components/assets/images";
import type { Venue, VenuePreviewItem, VenuePreviewTab } from "@/components/home/NearbyVenues/types";

type VenuePreviewTabContentProps = {
  activeTab: VenuePreviewTab["id"];
  galleryImages: string[];
  memberships: VenuePreviewItem[];
  services: VenuePreviewItem[];
  venue: Venue;
};

function PreviewItems({ icon: Icon, items }: { icon: LucideIcon; items: VenuePreviewItem[] }) {
  return <div className="space-y-2 px-5 py-4">{items.map((item) => <article className="flex gap-3 rounded-xl border border-[#dceee5] bg-[#f7fdf9] p-3" key={item.id}><Icon aria-hidden="true" className="mt-0.5 shrink-0 text-[#008447]" size={19} /><div><h3 className="text-[14px] font-bold text-[#075038]">{item.title}</h3><p className="mt-1 text-[13px] leading-4 text-[#537267]">{item.description}</p></div></article>)}</div>;
}

export default function VenuePreviewTabContent({ activeTab, galleryImages, memberships, services, venue }: VenuePreviewTabContentProps) {
  if (activeTab === "membership") return <PreviewItems icon={PackageCheck} items={memberships} />;
  if (activeTab === "services") return <PreviewItems icon={Sparkles} items={services} />;
  if (activeTab === "images") return <div className="grid grid-cols-2 gap-2 px-5 py-4">{galleryImages.map((label) => <figure className="overflow-hidden rounded-lg" key={label}><div className="relative aspect-[4/3]"><Image alt={label} className="object-cover" fill sizes="200px" src={images.venueCovers[venue.cover]} /></div><figcaption className="bg-[#f4faf7] px-2 py-1.5 text-[12px] text-[#28634c]">{label}</figcaption></figure>)}</div>;

  return null;
}
