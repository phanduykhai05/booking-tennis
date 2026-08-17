import { ChevronRight, CircleDollarSign, MapPin, Phone, Share2, Trophy, UserRound } from "lucide-react";
import Image from "next/image";

import images from "@/components/assets/images";
import type { DiscoverPost } from "@/components/discover/DiscoverFeed/types";

type DiscoverPostCardProps = { contactLabel: string; moreLabel: string; post: DiscoverPost };

function VenueIntro({ post }: { post: DiscoverPost }) {
  const title = post.type === "course" ? "Huấn luyện viên chuyên nghiệp tại sân" : post.type === "member" ? "🔥 Ưu đãi gói hội viên mới" : post.type === "event" ? "🔥 Sự kiện mới" : "🔥 Ưu đãi sân trống trong hôm nay";
  return <><div className="flex gap-3"><span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#fff3da] text-2xl">🏸</span><div className="min-w-0"><h2 className="text-[15px] font-semibold text-[#202c28]">{post.venue}</h2><p className="mt-1 flex items-center gap-1 truncate text-[12px] text-[#4f5b56]"><MapPin aria-hidden="true" className="text-[#008447]" size={13} />(3.9km) 2 Đường Lê Quát, Tân Phú, Hồ Chí Minh</p><p className="mt-1 text-[12px] text-[#626b67]">{post.date}</p></div></div><h3 className="mt-3 text-[15px] font-medium text-[#263a32]">{title}</h3><p className="text-[13px] text-[#008447]">{post.labels.join(" ")}</p></>;
}

function CourseCard({ contactLabel }: { contactLabel: string }) {
  return (
    <div className="mt-2 rounded-[13px] bg-[#e4f7ee] p-[7px]">
      <div className="relative rounded-[11px] border border-[#d7e2dc] bg-white px-2.5 pb-2 pt-1.5">
        <div className="flex h-6 items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-[#008447] text-[11px] font-bold text-white">1</span>
          <span className="rounded bg-[#ffe6e7] px-2 py-1 text-[14px] font-semibold leading-none text-[#dc334c]">Khóa học</span>
        </div>

        <p className="mt-1 text-[16px] font-semibold leading-5">Lớp học Cầu lông</p>
        <p className="text-[14px] font-medium leading-5 text-[#007b45]">16:00 - 18:00 <span className="text-[#303b36]">| T7, CN</span></p>
        <p className="mt-1 flex items-center gap-1 text-[14px] leading-5"><CircleDollarSign aria-hidden="true" className="text-[#008447]" size={16} />Chỉ từ <b className="text-[#007a45]">750.000 ₫/Tháng</b></p>
        <p className="mt-0.5 flex items-center gap-1 text-[14px] leading-5"><Phone aria-hidden="true" className="text-[#008447]" size={15} />+84 789314698</p>

        <div className="mt-2 flex min-h-9 items-center border-t border-[#d0e0d7] pt-1.5">
          <UserRound aria-hidden="true" className="mr-1.5 shrink-0 text-[#008447]" size={17} />
          <p className="flex-1 text-[13px] leading-4">Huấn luyện viên:<br /><b className="font-semibold">Phương Thị Thanh</b></p>
          <button className="mr-2 text-[13px] font-medium text-[#008447]" type="button">{contactLabel}</button>
          <ChevronRight aria-hidden="true" className="mr-1 text-[#008447]" size={17} />
        </div>

        <div className="absolute right-[-1px] top-[54px] flex size-10 items-center justify-center rounded-full bg-[#e4f7ee]">
          <div className="flex size-7 items-center justify-center rounded-full bg-[#c92f47] text-white">
            <Trophy aria-hidden="true" size={17} strokeWidth={2.4} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MemberCard() { return <div className="mt-2 rounded-xl bg-[#e4f7ee] p-2"><div className="rounded-lg bg-white p-2"><div className="flex items-center gap-2"><span className="flex size-5 items-center justify-center rounded-full bg-[#008447] text-[11px] font-bold text-white">1</span><span className="rounded bg-[#d9ffeb] px-2 py-1 text-[12px] text-[#008447]">Thẻ hội viên</span></div><p className="mt-2 text-[13px] font-bold text-[#008447]">Social Tháng</p><p className="text-[13px]">Pickleball • T2 - T6</p><p className="mt-2 text-[12px] text-[#5a6862]">▣ Mở bán: 01/06/2026 - 30/12/2026</p><div className="mt-2 grid grid-cols-3 text-[12px]"><span>◷ Thời hạn<br /><b className="text-[#00914d]">1 Tháng</b></span><span>◉ Miễn phí<br /><b className="text-[#f2a300]">20</b></span><span>♧ Loại sân<br /><b className="text-[#f2a300]">Pickleball</b></span></div><div className="mt-3 flex items-center"><b className="flex-1 text-[15px] text-[#007b45]">700.000 ₫</b><button className="rounded-l-xl bg-[#00a345] px-4 py-2 text-[12px] font-bold text-white" type="button">Đăng ký <ChevronRight className="inline" size={14} /></button></div></div><button className="mt-2 flex h-9 w-full items-center justify-center gap-1 rounded-lg border border-[#008447] text-[13px] text-[#007b45]" type="button">🌐 Khám phá ưu đãi khác tại chi nhánh <ChevronRight size={15} /></button></div>; }

function OfferCard() { return <div className="mt-2 rounded-xl bg-[#e4f7ee] p-2"><div className="rounded-lg bg-white p-2"><div className="flex items-center"><span className="flex size-5 items-center justify-center rounded-full bg-[#008447] text-[11px] font-bold text-white">1</span><span className="ml-2 rounded bg-[#fff1db] px-2 py-1 text-[12px] text-[#f08a00]">Ưu đãi</span></div><p className="mt-2 text-[13px] font-bold">Sân 1:</p><div className="flex items-center"><p className="flex-1 text-[13px] text-[#008447]">20:00 - 22:00<br /><span className="text-[#4a5651]">17/08/2026</span></p><p className="mr-2 text-[13px] text-[#008447]">306.000 ₫<br /><s className="text-[#e35e63]">360.000 ₫</s></p><button className="rounded-lg bg-[#008447] px-3 py-2 text-[12px] font-bold text-white" type="button">Đặt lịch</button></div></div></div>; }

function EventCard() { return <div className="mt-2 overflow-hidden rounded-xl border border-[#008447] bg-[#edfbf5] p-2"><div className="relative min-h-[128px] rounded-lg bg-white p-2 pr-[104px]"><div className="flex gap-1 text-[11px]"><span className="rounded-full bg-[#2768e9] px-2 py-1 font-bold text-white">◷ Còn 2:07:29</span><span className="rounded bg-[#fbf0ff] px-2 py-1 text-[#981fe3]">♧ Xẻ vé</span><span className="rounded bg-[#ececec] px-2 py-1">#548</span></div><div className="mt-2 flex gap-2"><span className="rounded-md border border-[#b7cfff] bg-[#f3f8ff] px-2 py-1 text-center text-[13px] font-bold leading-6 text-[#1264ed]">17:00<br />20:00<br /><small>▣ Hôm nay</small></span><div><p className="text-[15px] font-bold">Trình 2.5/ advanced players</p><p className="mt-2 text-[13px]">💎 <b className="rounded-full bg-[#4b97f4] px-2 py-1 text-white">2.5 - 3.5</b></p><p className="mt-2 text-[13px] text-[#008447]">♧ Pickleball 1 - 2 - 3 - 4</p><p className="mt-1 text-[17px] font-bold text-[#f18a00]">60.000 ₫ <small className="font-normal text-[#333]">/ vé</small></p></div></div><Image alt="Sân Pickleball" className="absolute right-0 top-0 h-full w-[100px] object-cover [clip-path:polygon(26%_0,100%_0,100%_100%,0_100%)]" src={images.venueCovers.pickleball} /><button className="absolute right-2 top-2 rounded-full bg-white p-2 shadow" type="button"><Share2 size={15} /></button></div><div className="mt-2 flex justify-between"><button className="rounded-full bg-white px-3 py-1 text-[12px] text-[#666]" type="button">⊙ Xem chi tiết</button><button className="rounded border border-[#9bd9b8] bg-white px-4 py-1 text-[12px] text-[#008447]" type="button">＋ Mua vé</button></div></div>; }

export default function DiscoverPostCard({ contactLabel, moreLabel, post }: DiscoverPostCardProps) {
  return <article className="border-b-[9px] border-[#d7eae1] bg-white px-4 pb-3 pt-3 text-[#183127]"><VenueIntro post={post} />{post.type === "course" ? <CourseCard contactLabel={contactLabel} /> : post.type === "member" ? <MemberCard /> : post.type === "offer" ? <OfferCard /> : post.type === "event" ? <EventCard /> : <div className="mt-2 text-[13px]">{moreLabel}</div>}</article>;
}
