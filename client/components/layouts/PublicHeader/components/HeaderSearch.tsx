import { CalendarCheck, Heart, Map, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { HeaderShortcut, HeaderShortcutIcon } from "@/components/layouts/PublicHeader/types";

type HeaderSearchProps = {
  favoriteLabel: string;
  inputLabel: string;
  placeholder: string;
  shortcuts: HeaderShortcut[];
  submitLabel: string;
};

const shortcutIcons: Record<HeaderShortcutIcon, LucideIcon> = {
  booked: CalendarCheck,
  favorite: Heart,
  map: Map,
};

type HeaderShortcutButtonProps = {
  shortcut: HeaderShortcut;
};

function HeaderShortcutButton({ shortcut }: HeaderShortcutButtonProps) {
  const Icon = shortcutIcons[shortcut.icon];

  return (
    <button
      className="group flex h-11 shrink-0 items-center justify-center gap-2 border-l border-slate-200/80 px-5 text-sm font-medium text-[#0f8f53] transition-colors duration-200 hover:bg-emerald-50/80 focus-visible:outline-none focus-visible:bg-emerald-50 lg:px-7"
      type="button"
    >
      <Icon aria-hidden="true" className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5" strokeWidth={2} />
      <span>{shortcut.label}</span>
    </button>
  );
}

export default function HeaderSearch({ favoriteLabel, inputLabel, placeholder, shortcuts, submitLabel }: HeaderSearchProps) {
  return (
    <div className="flex items-center overflow-hidden rounded-2xl bg-white shadow-[0_10px_24px_-10px_rgba(3,52,32,0.65)] ring-1 ring-black/[0.04] transition-shadow duration-200 focus-within:ring-2 focus-within:ring-[#18b667]/45 hover:shadow-[0_12px_28px_-10px_rgba(3,52,32,0.7)]">
      <form action="/" className="flex h-11 min-w-0 flex-1 items-center gap-2.5 pl-4 pr-2">
        <label className="sr-only" htmlFor="header-search">{inputLabel}</label>
        <Search aria-hidden="true" className="size-[18px] shrink-0 text-[#0f9b58]" strokeWidth={2.6} />
        <input
          className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
          id="header-search"
          name="search"
          placeholder={placeholder}
          type="search"
        />
        <button
          aria-label={submitLabel}
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-[#0f9b58] transition-colors duration-200 hover:bg-emerald-50 focus-visible:outline-none focus-visible:bg-emerald-100 active:scale-95"
          type="submit"
        >
          <Search aria-hidden="true" className="size-[18px]" strokeWidth={2.6} />
        </button>
      </form>

      <nav aria-label="Lối tắt" className="hidden h-11 shrink-0 items-center md:flex">
        {shortcuts.map((shortcut) => <HeaderShortcutButton key={shortcut.id} shortcut={shortcut} />)}
      </nav>

      <button
        aria-label={favoriteLabel}
        className="group flex h-11 w-12 shrink-0 items-center justify-center border-l border-slate-200/80 text-[#0f9b58] transition-colors duration-200 hover:bg-emerald-50/80 focus-visible:outline-none focus-visible:bg-emerald-50 md:hidden"
        type="button"
      >
        <Heart aria-hidden="true" className="size-[22px] transition-transform duration-200 group-active:scale-90" strokeWidth={2} />
      </button>
    </div>
  );
}
