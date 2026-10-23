import type { ReactNode } from "react";

import { shadow } from "@/components/ui/theme";

type CardProps = {
  children: ReactNode;
  className?: string;
  description?: string;
  extra?: ReactNode;
  noBodyPadding?: boolean;
  title?: string;
};

/** Thẻ trắng bo góc dùng lại cho toàn bộ khu quản trị, thay cho antd Card. */
export default function Card({ children, className = "", description, extra, noBodyPadding, title }: CardProps) {
  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200 bg-white ${className}`} style={shadow.card}>
      {title ? (
        <div className="flex-row flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
          <div className="min-w-0 flex-1">
            <span className="text-[15px] font-bold text-slate-900">{title}</span>
            {description ? <span className="mt-0.5 text-[12px] text-slate-500">{description}</span> : null}
          </div>
          {extra ? <div className="flex-row flex-wrap items-center gap-2">{extra}</div> : null}
        </div>
      ) : null}
      <div className={noBodyPadding ? "" : "p-4"}>{children}</div>
    </div>
  );
}
