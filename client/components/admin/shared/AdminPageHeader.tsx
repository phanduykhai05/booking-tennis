import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  actions?: ReactNode;
  description: string;
  eyebrow?: string;
  title: string;
};

export default function AdminPageHeader({ actions, description, eyebrow, title }: AdminPageHeaderProps) {
  return (
    <div className="flex-row flex-wrap items-end justify-between gap-3">
      <div className="min-w-[240px] flex-1">
        {eyebrow ? (
          <span className="text-[12px] font-bold uppercase tracking-[2px] text-emerald-600">{eyebrow}</span>
        ) : null}
        <span className="mb-1 mt-1 text-[24px] font-bold text-slate-900">{title}</span>
        <span className="max-w-2xl text-[14px] text-slate-500">{description}</span>
      </div>
      {actions ? <div className="flex-row flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
