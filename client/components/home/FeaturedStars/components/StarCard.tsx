import Link from "next/link";

import StarMedia from "@/components/home/FeaturedStars/components/StarMedia";
import type { FeaturedStar } from "@/components/home/FeaturedStars/mockData";

type StarCardProps = {
  item: FeaturedStar;
};

function VerifiedIcon() {
  return (
    <svg aria-label="Đã xác minh" className="ml-1 size-[18px] shrink-0" fill="none" viewBox="0 0 24 24">
      <path clipRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.7 7.7a1 1 0 0 0-1.4-1.4l-4.8 4.8-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5a1 1 0 0 0 1.4 0l5.5-5.5Z" fill="#2dc275" fillRule="evenodd" />
    </svg>
  );
}

export default function StarCard({ item }: StarCardProps) {
  return (
    <Link className="block shrink-0 basis-[150px]" href={item.href} rel="noopener noreferrer" target="_blank">
      <article className="relative flex h-[180px] w-[150px] flex-col items-center rounded-[18px] bg-[rgba(34,134,0,0.1)] p-3 text-center backdrop-blur transition-colors hover:bg-[rgba(34,134,0,0.25)] before:absolute before:inset-0 before:-z-10 before:rounded-[18px] before:bg-[linear-gradient(135deg,#fff_0%,#45ff76_30%,#67fead_50%,rgba(255,255,255,.5)_100%)] before:p-px after:absolute after:inset-px after:-z-10 after:rounded-[17px] after:bg-[#27312d]">
        <div className="relative z-10 rounded-full p-0.5 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-[linear-gradient(223deg,#00ff79_14%,#165c37_36%,#108547_71%,#4fee0a_84%)] before:blur-[2px]">
          <StarMedia alt={item.name} src={item.imageUrl} />
        </div>
        <div className="relative z-10 mt-2 flex max-w-full items-center justify-center text-sm font-semibold text-white">
          <span className="max-w-[112px] truncate">{item.name}</span>
          <VerifiedIcon />
        </div>
      </article>
    </Link>
  );
}
