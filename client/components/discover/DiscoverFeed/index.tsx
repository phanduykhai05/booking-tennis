"use client";

import { BookOpen, Crown, Megaphone, Ticket } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import images from "@/components/assets/images";
import DiscoverPostCard from "@/components/discover/DiscoverFeed/components/DiscoverPostCard";
import { discoverContent, discoverFilters } from "@/components/discover/DiscoverFeed/content";
import type { DiscoverFilter, DiscoverPost } from "@/components/discover/DiscoverFeed/types";
import PublicFooter from "@/components/layouts/PublicFooter";

const filterIcons = { all: null, course: BookOpen, events: Ticket, member: Crown, notifications: Megaphone, offers: Crown };

type DiscoverFeedProps = { posts: DiscoverPost[] };

export default function DiscoverFeed({ posts }: DiscoverFeedProps) {
  const [activeFilter, setActiveFilter] = useState<DiscoverFilter["id"]>("all");
  const visiblePosts = activeFilter === "all" ? posts : posts.filter((post) => (activeFilter === "notifications" ? post.type === "course" || post.type === "offer" : activeFilter === "offers" ? post.type === "offer" : activeFilter === "events" ? post.type === "event" : post.type === activeFilter));
  return <div className="min-h-[100dvh] bg-[#f7f7f7] pb-24"><header className="border-t-[3px] border-[#24312d] bg-white px-5 pb-2 pt-2"><h1 className="text-[20px] font-black italic tracking-wide text-[#08a948]">{discoverContent.discover}</h1><nav className="mt-2 overflow-x-auto [scrollbar-width:none]"><div className="flex w-max gap-2">{discoverFilters.map((filter) => { const Icon = filterIcons[filter.id]; const active = activeFilter === filter.id; return <button className={`flex h-8 items-center gap-1 rounded-xl border px-3 text-[13px] ${active ? "border-[#008447] bg-[#e5f8ee] font-bold text-[#007b44]" : "border-[#d8dcda] bg-white text-[#858a88]"}`} key={filter.id} onClick={() => setActiveFilter(filter.id)} type="button">{Icon && <Icon size={15} />}{filter.label}</button>; })}</div></nav></header><main>{visiblePosts.length === 0 ? <p className="py-16 text-center text-[14px] text-[#68716d]">{discoverContent.empty}</p> : visiblePosts.map((post, index) => <div key={post.id}>{<DiscoverPostCard contactLabel={discoverContent.contact} moreLabel={discoverContent.more} post={post} />}{index === 0 && <div className="relative mx-4 my-3 h-[95px] overflow-hidden rounded-xl bg-[radial-gradient(circle_at_50%_0,#42ee3a,#00ab19_56%,#007d25)]"><span aria-hidden="true" className="absolute -left-2 top-0 size-24 rounded-full border-2 border-white/90" /><span aria-hidden="true" className="absolute -right-2 top-0 size-24 rounded-full border-2 border-white/90" /><Image alt="" className="absolute left-10 top-2 h-16 w-auto -rotate-35 object-contain" src={images.sports.badminton} /><Image alt="" className="absolute bottom-0 right-10 h-16 w-auto rotate-35 object-contain" src={images.sports.badminton} /><span className="absolute inset-0 flex items-center justify-center text-[25px] font-black italic tracking-wide text-[#fff12e]">CẦU LÔNG</span></div>}</div>)}</main><PublicFooter activeItemId="discover" /></div>;
}
