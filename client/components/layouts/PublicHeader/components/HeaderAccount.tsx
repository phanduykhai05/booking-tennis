"use client";

import { ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import HeaderActions from "@/components/layouts/PublicHeader/components/HeaderActions";
import { headerActions } from "@/components/layouts/PublicHeader/mockData";
import { useSession } from "@/lib/api/session";

export default function HeaderAccount() {
  const router = useRouter();
  const { isReady, session, signOut } = useSession();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };

    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [isMenuOpen]);

  // Server và lần render đầu đều chưa có session -> hiển thị nút khách, tránh lệch hydrate.
  if (!isReady || !session) {
    return <HeaderActions actions={headerActions} />;
  }

  const { user } = session;

  return (
    <div className="relative w-full max-w-[300px]" ref={containerRef}>
      <button
        aria-expanded={isMenuOpen}
        aria-haspopup="menu"
        className="flex h-9 w-full items-center gap-2 rounded-lg bg-white px-3 text-left text-[#0b7a4a] shadow-[0_4px_12px_-3px_rgba(3,52,32,0.5)] transition-colors hover:bg-emerald-50"
        onClick={() => setMenuOpen((open) => !open)}
        type="button"
      >
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#656ad5] text-[13px] font-semibold uppercase text-white">
          {user.avatarInitial}
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-semibold">{user.fullName}</span>
        <ChevronDown aria-hidden="true" className={`shrink-0 transition-transform ${isMenuOpen ? "rotate-180" : ""}`} size={16} />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl bg-white text-[#1b2f25] shadow-[0_12px_28px_-8px_rgba(3,52,32,0.45)]" role="menu">
          <Link className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#f1fbf5]" href="/account" onClick={() => setMenuOpen(false)} role="menuitem">
            <User aria-hidden="true" className="text-[#0b7a4a]" size={17} />
            Tài khoản của tôi
          </Link>
          <button
            className="flex w-full items-center gap-2 border-t border-[#eef3f0] px-4 py-3 text-left text-sm text-[#c0392b] hover:bg-[#fdf0ef]"
            onClick={() => {
              signOut();
              setMenuOpen(false);
              router.push("/login");
            }}
            role="menuitem"
            type="button"
          >
            <LogOut aria-hidden="true" size={17} />
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
