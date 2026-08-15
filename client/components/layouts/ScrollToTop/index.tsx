"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

type ScrollToTopProps = {
  label: string;
};

const VISIBLE_AFTER = 320;

export default function ScrollToTop({ label }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Không gọi handler ngay trong effect: setState đồng bộ ở đây sẽ tạo render thừa.
    const handleScroll = () => setIsVisible(window.scrollY > VISIBLE_AFTER);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      aria-hidden={!isVisible}
      aria-label={label}
      className={`fixed bottom-[92px] right-4 z-20 flex size-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-[0_4px_14px_-4px_rgba(15,23,42,0.4)] transition-all duration-200 hover:text-[#0f9b58] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f9b58]/50 active:scale-95 ${isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
      onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
      tabIndex={isVisible ? 0 : -1}
      type="button"
    >
      <ArrowUp aria-hidden="true" className="size-5" strokeWidth={2} />
    </button>
  );
}
