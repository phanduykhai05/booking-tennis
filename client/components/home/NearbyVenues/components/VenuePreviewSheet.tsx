"use client";

import { ArrowLeft, Clock3, Heart, MapPin, Phone, Share2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import images from "@/components/assets/images";
import styles from "@/components/home/NearbyVenues/components/VenuePreviewSheet.module.scss";
import VenuePreviewTabContent from "@/components/home/NearbyVenues/components/VenuePreviewTabContent";
import type { NearbyVenuesContent, Venue, VenuePreviewTab } from "@/components/home/NearbyVenues/types";

type VenuePreviewSheetProps = {
  content: NearbyVenuesContent;
  onClose: () => void;
  venue: Venue;
};

export default function VenuePreviewSheet({ content, onClose, venue }: VenuePreviewSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<VenuePreviewTab["id"]>("information");
  const dragStartY = useRef<number | null>(null);

  const endDrag = (clientY: number) => {
    if (dragStartY.current === null) return;

    const distance = clientY - dragStartY.current;
    dragStartY.current = null;

    if (distance < -55) {
      setIsExpanded(true);
    } else if (distance > 80 && isExpanded) {
      setIsExpanded(false);
    } else if (distance > 100) {
      onClose();
    }
  };

  return (
    <div aria-modal="true" className="fixed inset-0 z-[1200] flex items-end justify-center" role="dialog">
      <button aria-label="Đóng thông tin sân" className={`absolute inset-0 bg-[#102c25]/65 ${styles.backdrop}`} onClick={onClose} type="button" />
      <section className={`relative flex w-full max-w-[430px] flex-col overflow-hidden bg-white shadow-[0_-12px_32px_rgba(0,36,22,.34)] transition-[height,border-radius] duration-300 ease-out ${isExpanded ? "h-[100dvh] rounded-none" : "h-[480px] rounded-t-[22px]"} ${styles.sheet}`}>
        <button aria-label="Kéo để phóng to hoặc thu nhỏ" className="absolute left-1/2 top-2 z-10 h-8 w-24 -translate-x-1/2 touch-none cursor-grab active:cursor-grabbing" onPointerDown={(event) => { dragStartY.current = event.clientY; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={(event) => endDrag(event.clientY)} type="button"><span aria-hidden="true" className="mx-auto block h-1 w-10 rounded-full bg-white/85 shadow" /></button>
        <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="relative h-[155px]"><Image alt="Sân thể thao" className="object-cover" fill sizes="(max-width: 430px) 100vw, 430px" src={images.venueCovers[venue.cover]} /><div className="absolute inset-0 bg-black/20" /><button aria-label="Đóng" className="absolute left-3 top-4 rounded-full bg-white p-2 text-[#007b49]" onClick={onClose} type="button"><ArrowLeft aria-hidden="true" size={20} /></button><div className="absolute right-3 top-4 flex gap-2"><button aria-label="Chia sẻ" className="rounded-full bg-white p-2 text-[#006b3d]" type="button"><Share2 aria-hidden="true" size={18} /></button><button aria-label="Yêu thích" className="rounded-full bg-white p-2 text-[#006b3d]" type="button"><Heart aria-hidden="true" size={18} /></button><Link className="rounded-xl bg-[#e7af1c] px-4 py-2 text-sm font-bold text-white" href={venue.productHref}>{content.previewBookLabel}</Link></div></div>
        <div className="relative -mt-3 rounded-t-[18px] bg-white px-5 pb-5 pt-7"><span className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#21c58d] px-4 py-2 text-[14px] font-bold text-white"><Star aria-hidden="true" fill="currentColor" size={19} />{content.previewRatingLabel}</span><div className="flex gap-3"><span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f7f2d8] text-xs font-black text-[#00713d] ring-1 ring-[#d9ca8d]">{content.previewVenueMark}</span><div className="min-w-0"><h2 className="truncate text-[17px] font-bold text-[#064b30]">{venue.name}</h2><div className="mt-1 flex flex-wrap gap-1">{content.previewCategories.map((category) => <span className="rounded-full border border-[#39a6ef] px-2 py-0.5 text-[11px] text-[#1689d2]" key={category}>{category}</span>)}</div></div></div><div className="mt-4 space-y-2 text-[14px] text-[#075038]"><p className="flex items-center gap-3"><MapPin aria-hidden="true" className="text-[#008447]" size={18} fill="currentColor" />{venue.address}</p><p className="flex items-center gap-3"><Clock3 aria-hidden="true" className="text-[#008447]" size={18} fill="currentColor" />{content.previewOpenLabel}</p><p className="flex items-center gap-3"><Phone aria-hidden="true" className="text-[#008447]" size={18} fill="currentColor" />{content.previewPhone}</p></div></div>
        <nav aria-label="Thông tin sân" className="flex overflow-x-auto border-t border-[#e1eee7] px-4 [scrollbar-width:none]" role="tablist">{content.previewTabs.map((tab) => <button aria-selected={activeTab === tab.id} className={`shrink-0 px-3 py-3 text-[13px] ${activeTab === tab.id ? "border-b-2 border-[#00a85a] font-semibold text-[#008447]" : "text-[#24614b]"}`} key={tab.id} onClick={() => setActiveTab(tab.id)} role="tab" type="button">{tab.label}</button>)}</nav>
        <VenuePreviewTabContent activeTab={activeTab} galleryImages={content.previewImages} memberships={content.previewMemberships} services={content.previewServices} venue={venue} />
        </div>
      </section>
    </div>
  );
}
