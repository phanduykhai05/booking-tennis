"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

type ScheduleSheetProps = {
  children: ReactNode;
  closeLabel: string;
  footer?: ReactNode;
  onClose: () => void;
  title: string;
};

export default function ScheduleSheet({ children, closeLabel, footer, onClose, title }: ScheduleSheetProps) {
  return (
    <div aria-label={title} aria-modal="true" className="fixed inset-0 z-[80] flex items-end justify-center bg-[#081e16]/55" onMouseDown={onClose} role="dialog">
      <section className="flex max-h-[85dvh] w-full max-w-[430px] flex-col overflow-hidden rounded-t-[18px] bg-white text-[#172720]" onMouseDown={(event) => event.stopPropagation()}>
        <header className="flex shrink-0 items-center border-b border-[#e7e9e8] px-4 py-3">
          <h2 className="text-[17px] font-bold">{title}</h2>
          <button aria-label={closeLabel} className="-mr-1 ml-auto p-1 text-[#68716d]" onClick={onClose} type="button">
            <X aria-hidden="true" size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-3">{children}</div>

        {footer && <footer className="shrink-0 border-t border-[#e7e9e8] px-4 py-3">{footer}</footer>}
      </section>
    </div>
  );
}
