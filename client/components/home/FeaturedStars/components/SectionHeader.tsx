import Link from "next/link";

type SectionHeaderProps = {
  href: string;
  linkLabel: string;
  title: string;
};

function StarIcon() {
  return (
    <svg aria-hidden="true" className="size-5 shrink-0" fill="none" viewBox="0 0 20 20">
      <path
        d="m10.9 1.06-2.53 5.12-5.66.82a1 1 0 0 0-.55 1.71l4.09 3.99-.97 5.63a1 1 0 0 0 1.45 1.05L10 16.73l5.06 2.66a1 1 0 0 0 1.45-1.05l-.97-5.63 4.09-3.99a1 1 0 0 0-.55-1.71l-5.66-.82-2.53-5.13a1 1 0 0 0-1.79 0Z"
        fill="url(#featured-star-gradient)"
      />
      <defs>
        <linearGradient id="featured-star-gradient" x1="15" x2="7" y1="6" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffee96" />
          <stop offset="1" stopColor="#fa0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="m9 18 6-6-6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  );
}

export default function SectionHeader({ href, linkLabel, title }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between pr-[5px]">
      <h2 className="ml-[5px] flex items-center gap-2 text-base font-semibold text-white">
        <StarIcon />
        {title}
      </h2>
      <Link className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium text-[#a6a6b0] transition-colors hover:text-white" href={href}>
        {linkLabel}
        <ChevronIcon />
      </Link>
    </div>
  );
}
