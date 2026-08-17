"use client";

import { ArrowLeft, BadgeCheck, CalendarDays, Camera, CircleDot, Dumbbell, Ruler, Target, Trophy } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import images from "@/components/assets/images";
import { profileContent, profileDetailItems } from "@/components/account/ProfileOverview/content";
import type { ProfileDetailItem } from "@/components/account/ProfileOverview/types";
import { useSession } from "@/lib/api/session";

const personalIcons: Record<ProfileDetailItem["icon"], typeof Target> = {
  goal: Target,
  location: CircleDot,
  schedule: CalendarDays,
  sport: Trophy,
};

export default function ProfileOverview() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "links">("overview");
  const { session } = useSession();
  const profile = session?.user;
  const orDash = (value: number | string | null | undefined) => (value === null || value === undefined || value === "" ? profileContent.notProvided : String(value));

  return (
    <main className="min-h-[100dvh] w-screen max-w-none bg-[#f7f7f7] pb-3 text-[#18221e]">
      <header className="relative h-[185px] overflow-hidden rounded-b-[25px] bg-[#008447]">
        <Image alt="" className="object-cover opacity-55" fill priority sizes="410px" src={images.alobo.homeHeader} />
        <div className="absolute left-1/2 top-1 h-11 w-[196px] -translate-x-1/2 overflow-hidden">
          <Image alt="ALOBO" className="absolute left-0 top-[-146px] w-[196px] max-w-none brightness-0 invert" src={images.alobo.logo} />
        </div>
        <button aria-label="Quay lại tài khoản" className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-full bg-[#005b36]/80 text-white" onClick={() => router.push("/account")} type="button"><ArrowLeft size={21} strokeWidth={2.5} /></button>
        <label className="absolute right-3 top-3 flex size-9 cursor-pointer items-center justify-center rounded-full bg-[#005b36]/80 text-white"><Camera size={18} /><input accept="image/*" aria-label="Đổi ảnh đại diện" className="sr-only" type="file" /></label>

        <section className="absolute inset-x-3 bottom-3 rounded-[18px] bg-white/90 px-4 py-3 shadow-[0_5px_14px_rgba(0,70,40,.12)] backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-[#6471d9] text-[27px] text-white">{profile?.avatarInitial ?? profileContent.avatarInitial}<span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-[#5360ad] text-white ring-2 ring-white"><Camera size={11} /></span></span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1"><h1 className="text-[18px] font-semibold leading-5">{profile?.fullName ?? profileContent.name}</h1><BadgeCheck aria-hidden="true" className="text-[#7d8581]" size={16} /></div>
              <span className="mt-1 inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-[12px] text-[#57625c]"><Image alt="" className="size-[14px]" src={images.alobo.icons.email} />{profile?.email ?? profileContent.emailPrompt}</span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[12px] text-[#56605b]">
            <span className="flex items-center justify-center gap-1"><Image alt="" className="size-[15px]" src={images.alobo.icons.phoneOutline} />{profile?.phone ?? profileContent.phone}</span>
            <span className="flex items-center justify-center gap-1"><Image alt="" className="size-[15px]" src={images.alobo.icons.calendar} /><span>{profileContent.yearLabel}<b className="block text-[14px] text-[#1c2822]">{orDash(profile?.birthYear)}</b></span></span>
            <span className="flex items-center justify-center gap-1"><Image alt="" className="size-[15px]" src={images.alobo.icons.gender} /><span>{profileContent.genderLabel}<b className="block text-[14px] text-[#1c2822]">{orDash(profile?.gender)}</b></span></span>
          </div>
        </section>
      </header>

      <div className="px-3 pt-4">
        <nav className="grid grid-cols-2 overflow-hidden rounded-[10px] bg-[#008447] p-1 text-[15px] font-semibold text-white">
          <button className={`h-8 rounded-[7px] transition ${activeTab === "overview" ? "bg-white text-[#008447]" : ""}`} onClick={() => setActiveTab("overview")} type="button">{profileContent.overview}</button>
          <button className={`h-8 rounded-[7px] transition ${activeTab === "links" ? "bg-white text-[#008447]" : ""}`} onClick={() => setActiveTab("links")} type="button">Liên kết</button>
        </nav>

        {activeTab === "overview" ? <section className="mt-3 min-h-[604px] rounded-[10px] bg-white px-3 py-3">
          <div className="flex items-center"><h2 className="flex-1 text-[15px] font-medium text-[#008447]">{profileContent.physicalTitle}</h2><button aria-label="Chỉnh sửa thông tin thể chất" className="text-[#008447]" type="button"><Image alt="" className="size-5" src={images.alobo.icons.edit} /></button></div>
          <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-[11px] border border-[#dce2df] py-2 text-center text-[12px] text-[#626b66]">
            <div className="border-r border-[#e7ebe9]"><span className="flex items-center justify-center gap-1"><Ruler size={15} />{profileContent.heightLabel}</span><b className="mt-1 block text-[14px] text-[#1b2721]">{orDash(profile?.heightCm)}</b></div>
            <div><span className="flex items-center justify-center gap-1"><Dumbbell size={15} />{profileContent.weightLabel}</span><b className="mt-1 block text-[14px] text-[#1b2721]">{orDash(profile?.weightKg)}</b></div>
          </div>
          <button className="mt-3 flex items-center gap-1 text-[14px] font-medium" type="button"><Image alt="" className="size-[17px]" src={images.alobo.icons.note} />{profileContent.specialNote}</button>

          <div className="mt-3 flex items-center"><h2 className="flex-1 text-[15px] font-medium text-[#008447]">{profileContent.personalTitle}</h2><button aria-label="Chỉnh sửa thông tin cá nhân" className="text-[#008447]" type="button"><Image alt="" className="size-5" src={images.alobo.icons.edit} /></button></div>
          <div className="mt-4 space-y-3.5">
            {profileDetailItems.map((item) => { const Icon = personalIcons[item.icon]; return <button className="flex items-center gap-1.5 text-[14px]" key={item.id} type="button"><Icon aria-hidden="true" size={16} />{item.label}</button>; })}
          </div>
        </section> : <section className="mt-3 min-h-[604px] rounded-[10px] bg-white px-3 py-5 text-center text-[14px] text-[#7d8581]">Chưa có tài khoản liên kết.</section>}
      </div>
    </main>
  );
}
