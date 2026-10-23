import { CreditCard, Eye, Map, Minus, Plus, Share2 } from "lucide-react";
import { useState } from "react";

import images from "@/components/assets/images";
import type { BookingEvent, ProductDetailContent } from "@/components/product/ProductDetail/types";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type EventCardProps = {
  actions: ProductDetailContent["actions"];
  event: BookingEvent;
  isPaid: boolean;
  onPayment: (event: BookingEvent, quantity: number) => void;
};

export default function EventCard({ actions, event, isPaid, onPayment }: EventCardProps) {
  const isLive = Boolean(event.isLive);
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const isSelected = isLive || isAdded;

  return (
    <div className={`overflow-hidden rounded-xl ${isSelected ? "bg-[#effcf6]" : "bg-white"}`}>
      <div className="min-h-[142px] p-2.5 pr-[96px]">
        <div className="flex-row flex-wrap items-center gap-1.5">
          <span className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold text-white ${isLive ? "bg-[#f02f62]" : "bg-[#2564e9]"}`}>
            {isLive ? "🔴 LIVE" : `◷ ${event.status}`}
          </span>
          <span className="rounded border border-[#db69ff] bg-[#fbf0ff] px-1.5 py-0.5 text-[11px] font-bold text-[#8c1ed2]">♧ Xẻ vé</span>
          <span className="rounded bg-[#ececec] px-1.5 py-0.5 text-[11px] font-bold text-[#636363]">#329</span>
        </div>

        <div className="mt-2 flex-row items-start gap-3">
          <div className="rounded-lg border border-[#ffb7c6] bg-[#fff7f8] px-1.5 py-1">
            <span className="text-center text-[13px] font-bold leading-6 text-[#f21d4a]">{event.timeStart}</span>
            <span className="text-center text-[13px] font-bold leading-6 text-[#f21d4a]">{event.timeEnd}</span>
            <span className="mt-1 border-t border-[#ffd2da] pt-1 text-center text-[10px] font-medium leading-4 text-[#f21d4a]">
              ▣ {event.date}
            </span>
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <span className="text-[16px] font-bold leading-5 text-[#15251f]">{event.title}</span>
            <div className="mt-1.5 flex-row items-center gap-1">
              <Map color="#008447" size={13} />
              <span className="text-[13px] text-[#1d2924]">{event.court}</span>
            </div>
            <span className="mt-1 text-[16px] font-bold leading-4 text-[#f18a00]">
              {event.price}
              <span className="text-[12px] font-normal text-[#26352e]"> / vé</span>
            </span>
          </div>
        </div>

        <img
          alt=""
          className="object-cover"
          src={images.venueCovers.pickleball}
          style={{ height: 128, position: "absolute", right: 0, top: 0, width: 105 }}
        />
        <div className="absolute right-2 top-2 rounded-full bg-white p-2" style={shadow.card}>
          <Share2 color="#1f2e29" size={16} />
        </div>
      </div>

      <div className="border-t-2 border-dashed border-[#c9d5d0] px-2.5 pb-2.5 pt-3">
        <span className="self-start rounded-full bg-[#e4f9ec] px-2 py-1 text-[11px] font-bold text-[#008447]">{event.available}</span>

        {showDetails ? (
          <span className="mt-3 rounded-md bg-white/70 p-2 text-[12px] text-[#456056]">
            Sự kiện tại {event.court}, từ {event.timeStart} đến {event.timeEnd}.
          </span>
        ) : null}

        <div className="my-3 h-1.5 rounded bg-[#e6efeb]" />

        <div className="flex-row items-center justify-between">
          <Touch
            className="h-7 flex-row items-center gap-1 rounded-full bg-[#f1f1f1] px-2.5"
            onPress={() => setShowDetails((value) => !value)}
          >
            <Eye color="#656565" size={12} />
            <span className="text-[12px] text-[#656565]">{actions.details}</span>
          </Touch>

          {isSelected ? (
            <div className="flex-row items-center gap-3">
              <Touch
                accessibilityLabel="Giảm số vé"
                className="rounded-md border border-[#9bd9b8] p-1.5"
                onPress={() => {
                  if (quantity === 1) {
                    setQuantity(0);
                    setIsAdded(false);
                    return;
                  }
                  setQuantity((value) => value - 1);
                }}
              >
                <Minus color="#008447" size={14} />
              </Touch>
              <span className="text-[15px] font-semibold text-[#093b28]">{quantity}</span>
              <Touch
                accessibilityLabel="Tăng số vé"
                className="rounded-md border border-[#9bd9b8] p-1.5"
                onPress={() => setQuantity((value) => value + 1)}
              >
                <Plus color="#008447" size={14} />
              </Touch>
            </div>
          ) : (
            <Touch
              className="h-8 flex-row items-center gap-2 rounded-md border border-[#9bd9b8] px-4"
              onPress={() => {
                setQuantity(1);
                setIsAdded(true);
              }}
            >
              <Plus color="#008447" size={14} />
              <span className="text-[12px] text-[#008447]">{actions.addTicket}</span>
            </Touch>
          )}
        </div>

        {isSelected ? (
          <div>
            <span className="mt-3 self-start rounded-full bg-[#fff4e1] px-2.5 py-1 text-[12px] font-semibold text-[#f18a00]">
              {event.price} / vé
            </span>
            <Touch
              className="mt-3 h-9 w-full flex-row items-center justify-center gap-2 rounded-md bg-[#008447]"
              disabled={isPaid}
              onPress={() => onPayment(event, quantity)}
            >
              <CreditCard color="#ffffff" size={17} />
              <span className="text-[14px] font-semibold text-white">{isPaid ? actions.paymentComplete : actions.payment}</span>
            </Touch>
          </div>
        ) : null}
      </div>
    </div>
  );
}
