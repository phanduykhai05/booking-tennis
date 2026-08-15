type StatusBadgeProps = {
  label: string;
  tone: "blue" | "emerald" | "orange" | "rose" | "slate" | "violet";
};

const toneClassNames = {
  blue: "bg-sky-50 text-sky-700 ring-sky-600/15",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  orange: "bg-amber-50 text-amber-700 ring-amber-600/15",
  rose: "bg-rose-50 text-rose-700 ring-rose-600/15",
  slate: "bg-slate-100 text-slate-600 ring-slate-500/15",
  violet: "bg-violet-50 text-violet-700 ring-violet-600/15",
};

export default function StatusBadge({ label, tone }: StatusBadgeProps) {
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ring-inset ${toneClassNames[tone]}`}>{label}</span>;
}
