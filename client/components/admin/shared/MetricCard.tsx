import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  change?: string;
  icon: LucideIcon;
  label: string;
  tone?: "blue" | "emerald" | "orange" | "violet";
  value: string;
};

const toneClassNames = {
  blue: "bg-sky-50 text-sky-700 ring-sky-100",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  orange: "bg-orange-50 text-orange-700 ring-orange-100",
  violet: "bg-violet-50 text-violet-700 ring-violet-100",
};

export default function MetricCard({ change, icon: Icon, label, tone = "emerald", value }: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_-22px_rgba(15,23,42,0.5)] sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{value}</p>
          {change && <p className="mt-1 text-xs font-medium text-slate-400">{change}</p>}
        </div>
        <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ${toneClassNames[tone]}`}>
          <Icon aria-hidden="true" className="size-5" />
        </span>
      </div>
    </article>
  );
}
