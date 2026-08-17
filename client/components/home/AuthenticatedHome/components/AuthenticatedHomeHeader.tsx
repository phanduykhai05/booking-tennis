import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import images from "@/components/assets/images";

type AuthenticatedHomeHeaderProps = {
  avatarInitial: string;
  date: string;
  name: string;
  searchLabel: string;
  searchPlaceholder: string;
};

export default function AuthenticatedHomeHeader({ avatarInitial, date, name, searchLabel, searchPlaceholder }: AuthenticatedHomeHeaderProps) {
  return (
    <header className="relative h-[132px] overflow-visible bg-[#087442] text-white">
      <Image alt="" className="object-cover opacity-75" fill priority sizes="100vw" src={images.alobo.homeHeader} />
      <div className="relative px-4 pt-4">
        <div className="flex items-center gap-3">
          <span className="flex size-14 items-center justify-center rounded-full bg-[#666bd5] text-[30px] font-light">{avatarInitial}</span>
          <div className="flex-1"><p className="text-xs">{date}</p><p className="mt-2 text-[16px] font-bold text-[#ffe049]">{name}</p></div>
          <Link aria-label="Thông báo" className="rounded-full p-2 transition hover:bg-white/15" href="/notifications"><Image alt="" className="size-5 brightness-0 invert" src={images.alobo.icons.notification} /></Link>
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-0 flex h-11 items-center rounded-lg bg-white pl-3 shadow-[0_3px_9px_rgba(0,51,30,.28)]">
        <span className="mr-2 text-[#00a85a]">◉</span>
        <label className="flex min-w-0 flex-1 items-center"><span className="sr-only">{searchLabel}</span><input className="min-w-0 flex-1 bg-transparent text-sm text-[#134832] outline-none placeholder:text-[#a5aaa7]" placeholder={searchPlaceholder} type="search" /><Image alt="" className="mr-3 size-5" src={images.alobo.icons.search} /></label>
        <button aria-label="Bộ lọc" className="border-l border-[#eef2f0] px-3" type="button"><Image alt="" className="size-5" src={images.alobo.icons.filter} /></button>
        <button aria-label="Yêu thích" className="rounded-r-lg border-l border-[#eef2f0] px-3 text-[#006b3d]" type="button"><Heart aria-hidden="true" size={21} /></button>
      </div>
    </header>
  );
}
