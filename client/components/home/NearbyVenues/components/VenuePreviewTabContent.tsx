import { Clock3, MapPin, PackageCheck, Phone, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
    <div className="gap-2 px-5 py-4">
      {items.map((item) => (
        <div className="flex-row gap-3 rounded-xl border border-[#dceee5] bg-[#f7fdf9] p-3" key={item.id}>
          <Icon className="shrink-0" color="#008447" size={19} style={{ marginTop: 2 }} />
          <div className="flex-1">
            <span className="text-[14px] font-bold text-[#075038]">{item.title}</span>
            <span className="mt-1 text-[13px] leading-4 text-[#537267]">{item.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function VenuePreviewTabContent({ activeTab, address, openingLabel, preview, venue }: VenuePreviewTabContentProps) {
  if (!preview) {
    return <span className="px-5 py-8 text-center text-[13px] text-[#537267]">Đang tải thông tin sân…</span>;
  }

  if (activeTab === "membership") return <PreviewItems icon={PackageCheck} items={preview.memberships} />;
  if (activeTab === "services") return <PreviewItems icon={Sparkles} items={preview.services} />;

  if (activeTab === "images") {
    return (
      <div className="flex-row flex-wrap gap-2 px-5 py-4">
        {preview.gallery.map((label) => (
          <div className="w-[47%] overflow-hidden rounded-lg" key={label}>
            <img alt="" className="object-cover" src={images.venueCovers[venue.cover]} style={{ aspectRatio: 4 / 3, width: "100%" }} />
            <span className="bg-[#f4faf7] px-2 py-1.5 text-[12px] text-[#28634c]">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  // Tab "Thông tin" (mặc định): mô tả + tiện ích + liên hệ.
  return (
    <div className="gap-4 px-5 py-4">
      <span className="text-[13px] leading-5 text-[#3f5a4f]">{preview.description}</span>

      <div>
        <span className="mb-2 text-[14px] font-bold text-[#075038]">Tiện ích</span>
        <div className="flex-row flex-wrap gap-1.5">
          {preview.amenities.map((amenity) => (
            <span
              className="rounded-full border border-[#cdeadd] bg-[#f2fbf6] px-2.5 py-1 text-[12px] text-[#2b6a4e]"
              key={amenity}
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>

      <div className="gap-2 rounded-xl border border-[#e1eee7] bg-[#f8fdfb] p-3">
        <div className="flex-row items-start gap-2">
          <MapPin className="shrink-0" color="#008447" size={16} style={{ marginTop: 2 }} />
          <span className="flex-1 text-[13px] text-[#3f5a4f]">{address}</span>
        </div>
        <div className="flex-row items-center gap-2">
          <Clock3 color="#008447" size={16} />
          <span className="flex-1 text-[13px] text-[#3f5a4f]">{openingLabel}</span>
        </div>
        <div className="flex-row items-center gap-2">
          <Phone color="#008447" size={16} />
          <span className="flex-1 text-[13px] text-[#3f5a4f]">{preview.phone}</span>
        </div>
      </div>
    </div>
  );
}
