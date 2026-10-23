import { ArrowLeft, Heart, MapPin, Navigation, Share2 } from "lucide-react";
import { useNavigate } from "react-router";

import images from "@/components/assets/images";
import Touch from "@/components/ui/Pressable";

type ProductHeroProps = {
  address: string;
  bookLabel: string;
  onBook: () => void;
  venue: string;
};

export default function ProductHero({ address, bookLabel, onBook, venue }: ProductHeroProps) {
  const navigate = useNavigate();

  return (
    <div className="h-[143px] overflow-hidden">
      <img alt="" className="object-cover" src={images.venueCovers.pickleball} style={{ height: "100%", width: "100%" }} />
      <div
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(0,18,21,0.14), rgba(0,24,25,0.7))",
          bottom: 0,
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
        }}
      />

      <Touch accessibilityLabel="Quay lại" className="absolute left-2 top-4 rounded-full p-1.5" onPress={() => navigate("/")}>
        <ArrowLeft color="#ffffff" size={20} />
      </Touch>

      <div className="absolute right-3 top-3 flex-row items-center gap-2">
        <Heart color="#ffdf1b" fill="#ffdf1b" size={23} style={{ backgroundColor: "#ed2d56", borderRadius: 999, padding: 1 }} />
        <div className="flex-row items-center gap-1">
          <Navigation color="#ffffff" size={13} />
          <span className="text-[12px] text-white">Chỉ đường</span>
        </div>
        <Touch className="rounded-full bg-[#efb91f] px-3 py-2" onPress={onBook}>
          <span className="text-[12px] font-bold text-white">{bookLabel}</span>
        </Touch>
      </div>

      <div className="absolute bottom-4 left-5 right-4 flex-row items-end gap-3">
        <div className="h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-white bg-[#f7f2d8]">
          <span className="text-[12px] font-black text-[#006d37]">ĐTG</span>
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[17px] font-bold text-white truncate">
            {venue}
          </span>
          <div className="mt-1 flex-row items-center gap-1">
            <MapPin color="#ffffff" size={12} />
            <span className="flex-1 text-[12px] text-white/90 truncate">
              {address}
            </span>
          </div>
        </div>
        <div className="rounded-full bg-white/95 p-2">
          <Share2 color="#213b35" size={16} />
        </div>
      </div>
    </div>
  );
}
