"use client";

import { CreditCard, Eye, Map, Minus, Plus, Share2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import venueCover from "@/components/assets/images/uploads/venues/pickleball_cover.png";
import type { BookingEvent, ProductDetailData } from "@/components/product/ProductDetail/types";

type EventCardProps = {
  actions: ProductDetailData["actions"];
  event: BookingEvent;
  isPaid: boolean;
  onPayment: (event: BookingEvent, quantity: number) => void;
};

export default function EventCard({ actions, event, isPaid, onPayment }: EventCardProps) {
  const isLive = event.isLive;
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const isSelected = isLive || isAdded;

  return (
    <article className={`relative overflow-hidden rounded-xl ${isSelected ? "bg-[#effcf6]" : "bg-white"}`}>
      <div className={`relative min-h-[142px] p-2.5 pr-[96px] ${isSelected ? "bg-[#effcf6]" : "bg-white"}`}>
        <div className="flex items-center gap-1.5 text-[11px] font-bold"><span className={`rounded-full px-1.5 py-0.5 ${isLive ? "bg-[#f02f62] text-white" : "bg-[#2564e9] text-white"}`}>{isLive ? "🔴 LIVE" : `◷ ${event.status}`}</span><span className="rounded border border-[#db69ff] bg-[#fbf0ff] px-1.5 py-0.5 text-[#8c1ed2]">♧ Xẻ vé</span><span className="rounded bg-[#ececec] px-1.5 py-0.5 text-[#636363]">#329</span></div>
        <div className="mt-2 flex items-start gap-3"><div className="rounded-lg border border-[#ffb7c6] bg-[#fff7f8] px-1.5 py-1 text-center text-[13px] font-bold leading-6 text-[#f21d4a]"><div>{event.timeStart}</div><div>{event.timeEnd}</div><div className="mt-1 border-t border-[#ffd2da] pt-1 text-[10px] font-medium leading-4">▣ {event.date}<br />Hôm nay</div></div><div className="pt-0.5"><h3 className="text-[16px] font-bold leading-5 text-[#15251f]">{event.title}</h3><p className="mt-1.5 flex items-center gap-1 text-[13px] text-[#1d2924]"><Map aria-hidden="true" size={13} className="text-[#008447]" />{event.court}</p><p className="mt-1 text-[16px] font-bold leading-4 text-[#f18a00]">{event.price}<span className="ml-1 text-[12px] font-normal text-[#26352e]">/ vé</span></p></div></div>
        <Image alt="Sân Pickleball" className="absolute right-0 top-0 h-[128px] w-[105px] object-cover [clip-path:polygon(24%_0,100%_0,100%_100%,0_100%)]" src={venueCover} />
        <button aria-label="Chia sẻ sự kiện" className="absolute right-2 top-2 rounded-full bg-white p-2 text-[#1f2e29] shadow" type="button"><Share2 aria-hidden="true" size={16} /></button>
      </div>
      <span aria-hidden="true" className={`absolute -left-[11px] top-[136px] z-10 size-[21px] rounded-full border bg-[#efefef] ${isSelected ? "border-[#008447]" : "border-[#dfe3e1]"}`} />
      <span aria-hidden="true" className={`absolute -right-[11px] top-[136px] z-10 size-[21px] rounded-full border bg-[#efefef] ${isSelected ? "border-[#008447]" : "border-[#dfe3e1]"}`} />
      <div className="border-t-2 border-dashed border-[#c9d5d0] px-2.5 pb-2.5 pt-3"><span className="rounded-full bg-[#e4f9ec] px-2 py-1 text-[11px] font-bold text-[#008447]">{event.available}</span>{showDetails && <p className="mt-3 rounded-md bg-white/70 p-2 text-[12px] text-[#456056]">Sự kiện tại {event.court}, từ {event.timeStart} đến {event.timeEnd}.</p>}<div className="my-3 h-1.5 rounded bg-[#e6efeb]" /><div className="flex items-center justify-between"><button className="flex h-7 items-center gap-1 rounded-full bg-[#f1f1f1] px-2.5 text-[12px] text-[#656565]" onClick={() => setShowDetails((value) => !value)} type="button"><Eye aria-hidden="true" size={12} />{actions.details}</button>{isSelected ? <div className="flex items-center gap-3"><button className="rounded-md border border-[#9bd9b8] p-1.5 text-[#008447]" onClick={() => { if (quantity === 1) { setQuantity(0); setIsAdded(false); } else { setQuantity((value) => value - 1); } }} type="button"><Minus size={14} /></button><span className="text-sm font-semibold text-[#093b28]">{quantity}</span><button className="rounded-md border border-[#9bd9b8] p-1.5 text-[#008447]" onClick={() => setQuantity((value) => value + 1)} type="button"><Plus size={14} /></button></div> : <button className="flex h-8 items-center gap-2 rounded-md border border-[#9bd9b8] px-4 text-[12px] text-[#008447]" onClick={() => { setQuantity(1); setIsAdded(true); }} type="button"><Plus size={14} />{actions.addTicket}</button>}</div>{isSelected && <><span className="mt-3 inline-flex rounded-full bg-[#fff4e1] px-2.5 py-1 text-[12px] font-semibold text-[#f18a00]">{event.price} / vé</span><button className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-md bg-[#008447] text-[14px] font-semibold text-white" disabled={isPaid} onClick={() => onPayment(event, quantity)} type="button"><CreditCard aria-hidden="true" size={17} />{isPaid ? actions.paymentComplete : actions.payment}</button></>}</div>
    </article>
  );
}
