import Link from "next/link";

type HeaderLogoProps = {
  brandName: string;
};

function PaddleMark() {
  return (
    <svg aria-hidden="true" className="size-8 sm:size-9" fill="none" viewBox="0 0 40 40">
      <defs>
        <linearGradient id="public-header-paddle" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#2ecb77" />
          <stop offset="100%" stopColor="#07854f" />
        </linearGradient>
      </defs>
      <g transform="rotate(-32 20 20)">
        <rect fill="url(#public-header-paddle)" height="14" rx="3.2" width="6.4" x="16.8" y="21" />
        <ellipse cx="20" cy="14.5" fill="url(#public-header-paddle)" rx="11.5" ry="12.5" />
        <g fill="#ffffff" opacity="0.92">
          <circle cx="15.6" cy="11" r="1.5" />
          <circle cx="21.4" cy="9.4" r="1.5" />
          <circle cx="24.6" cy="14.6" r="1.5" />
          <circle cx="18.6" cy="16.6" r="1.5" />
          <circle cx="13.6" cy="17" r="1.5" />
          <circle cx="21.6" cy="21.6" r="1.5" />
        </g>
      </g>
    </svg>
  );
}

export default function HeaderLogo({ brandName }: HeaderLogoProps) {
  return (
    <Link
      aria-label={brandName}
      className="group flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-white to-emerald-50 shadow-[0_6px_16px_-4px_rgba(3,52,32,0.55)] ring-1 ring-white/60 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95 sm:size-14"
      href="/"
    >
      <PaddleMark />
    </Link>
  );
}
