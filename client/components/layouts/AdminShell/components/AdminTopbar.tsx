import { Bell, Menu, Search } from "lucide-react";

import type { AdminShellContent } from "@/components/layouts/AdminShell/types";

type AdminTopbarProps = {
  content: AdminShellContent;
  onMenuOpen: () => void;
};

export default function AdminTopbar({ content, onMenuOpen }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/95 px-3 backdrop-blur sm:px-5 lg:px-6">
      <button aria-label={content.menuLabel} className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden" onClick={onMenuOpen} type="button">
        <Menu aria-hidden="true" className="size-5" />
      </button>
      <label className="hidden h-10 max-w-md flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-emerald-400 focus-within:bg-white sm:flex">
        <Search aria-hidden="true" className="size-4 text-slate-400" />
        <span className="sr-only">{content.commandPlaceholder}</span>
        <input className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" placeholder={content.commandPlaceholder} type="search" />
        <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">⌘ K</kbd>
      </label>
      <div className="ml-auto flex items-center gap-2">
        <button aria-label={content.notificationLabel} className="relative flex size-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50" type="button">
          <Bell aria-hidden="true" className="size-[18px]" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white py-1.5 pl-1.5 pr-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">{content.userInitials}</span>
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-slate-800">{content.userName}</p>
            <p className="text-[10px] text-slate-400">{content.roleLabel}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
