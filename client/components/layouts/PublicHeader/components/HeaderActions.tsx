import Link from "next/link";

import LanguageSelector from "@/components/layouts/PublicHeader/components/LanguageSelector";

function TicketIcon() {
  return (
    <svg aria-hidden="true" className="size-full" fill="none" viewBox="0 0 24 24">
      <path
        d="M19.76 12a2.9 2.9 0 0 1 1.93-2.74c.52-.19.98-.62.98-1.17V5.24a1 1 0 0 0-1-1H2.33a1 1 0 0 0-1 1v2.85c0 .55.46.98.98 1.17a2.91 2.91 0 0 1 0 5.48c-.52.19-.98.62-.98 1.17v2.85a1 1 0 0 0 1 1h19.33a1 1 0 0 0 1-1v-2.85c0-.55-.46-.98-.98-1.17A2.9 2.9 0 0 1 19.76 12Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M8.12 10.06h7.76M8.12 13.94h7.76" stroke="currentColor" />
    </svg>
  );
}

export default function HeaderActions() {
  return (
    <>
      <Link
        className="hidden min-w-[148px] rounded-full border border-white px-5 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-white/15 lg:block"
        href="/organizer/create-event"
      >
        Tạo sự kiện
      </Link>

      <nav aria-label="Tiện ích tài khoản" className="flex items-center gap-4 text-sm text-white">
        <Link className="hidden items-center gap-2 whitespace-nowrap lg:flex" href="/my-tickets">
          <span className="size-6 text-white">
            <TicketIcon />
          </span>
          Vé của tôi
        </Link>
        <Link className="hidden whitespace-nowrap font-semibold lg:block" href="/login">
          Đăng nhập | Đăng ký
        </Link>
        <Link aria-label="Đăng nhập" className="font-semibold lg:hidden" href="/login">
          Đăng nhập
        </Link>
        <LanguageSelector />
      </nav>
    </>
  );
}
