import { Clock3, MapPin, PackageCheck, Phone, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import images from "@/components/assets/images";
import type { Venue, VenuePreviewTab } from "@/components/home/NearbyVenues/types";
import type { ApiVenuePreview, ApiVenuePreviewItem } from "@/lib/api/types";

type VenuePreviewTabContentProps = {
  activeTab: VenuePreviewTab["id"];
  address: string;
  openingLabel: string;
  preview: ApiVenuePreview | null;
  venue: Venue;
};

function PreviewItems({ icon: Icon, items }: { icon: LucideIcon; items: ApiVenuePreviewItem[] }) {
  return (
    <div className="space-y-2 px-5 py-4">
      {items.map((item) => (
        <article className="flex gap-3 rounded-xl border border-[#dceee5] bg-[#f7fdf9] p-3" key={item.id}>
          <Icon aria-hidden="true" className="mt-0.5 shrink-0 text-[#008447]" size={19} />
          <div>
            <h3 className="text-[14px] font-bold text-[#075038]">{item.title}</h3>
            <p className="mt-1 text-[13px] leading-4 text-[#537267]">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function VenuePreviewTabContent({ activeTab, address, openingLabel, preview, venue }: VenuePreviewTabContentProps) {
  if (!preview) {
    return <p className="px-5 py-8 text-center text-[13px] text-[#537267]">Đang tải thông tin sân…</p>;
  }

  if (activeTab === "membership") return <PreviewItems icon={PackageCheck} items={preview.memberships} />;
  if (activeTab === "services") return <PreviewItems icon={Sparkles} items={preview.services} />;

  if (activeTab === "images") {
    return (
      <div className="grid grid-cols-2 gap-2 px-5 py-4">
        {preview.gallery.map((label) => (
          <figure className="overflow-hidden rounded-lg" key={label}>
            <div className="relative aspect-[4/3]"><Image alt={label} className="object-cover" fill sizes="200px" src={images.venueCovers[venue.cover]} /></div>
            <figcaption className="bg-[#f4faf7] px-2 py-1.5 text-[12px] text-[#28634c]">{label}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  // Tab "Thông tin" (mặc định): mô tả + tiện ích + liên hệ.
  return (
    <div className="space-y-4 px-5 py-4">
      <p className="text-[13px] leading-5 text-[#3f5a4f]">{preview.description}</p>

      <div>
        <h3 className="mb-2 text-[14px] font-bold text-[#075038]">Tiện ích</h3>
        <ul className="flex flex-wrap gap-1.5">
          {preview.amenities.map((amenity) => (
            <li className="rounded-full border border-[#cdeadd] bg-[#f2fbf6] px-2.5 py-1 text-[12px] text-[#2b6a4e]" key={amenity}>{amenity}</li>
          ))}
        </ul>
      </div>

      <dl className="space-y-2 rounded-xl border border-[#e1eee7] bg-[#f8fdfb] p-3 text-[13px] text-[#3f5a4f]">
        <div className="flex items-start gap-2"><MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-[#008447]" size={16} /><dd>{address}</dd></div>
        <div className="flex items-center gap-2"><Clock3 aria-hidden="true" className="shrink-0 text-[#008447]" size={16} /><dd>{openingLabel}</dd></div>
        <div className="flex items-center gap-2"><Phone aria-hidden="true" className="shrink-0 text-[#008447]" size={16} /><dd>{preview.phone}</dd></div>
      </dl>
    </div>
  );
}
