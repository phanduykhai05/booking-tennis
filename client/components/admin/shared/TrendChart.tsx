type TrendChartDatum = {
  label: string;
  value: number;
};

type TrendChartProps = {
  accent?: "emerald" | "violet";
  data: TrendChartDatum[];
  description: string;
  formatValue: (value: number) => string;
  title: string;
};

export default function TrendChart({ accent = "emerald", data, description, formatValue, title }: TrendChartProps) {
  const maximum = Math.max(...data.map((item) => item.value), 1);
  const accentClassName = accent === "emerald" ? "bg-emerald-500" : "bg-violet-500";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_28px_-24px_rgba(15,23,42,0.55)] sm:p-5">
      <div>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </div>
      <div className="mt-6 flex h-44 items-end gap-2 sm:gap-3">
        {data.map((item) => {
          const height = Math.max((item.value / maximum) * 100, item.value > 0 ? 8 : 2);
          return (
            <div className="group flex min-w-0 flex-1 flex-col items-center gap-2" key={item.label}>
              <div className="relative flex h-36 w-full items-end justify-center rounded-lg bg-slate-50 px-1">
                <span className="pointer-events-none absolute -top-6 hidden whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-[10px] font-bold text-white group-hover:block">{formatValue(item.value)}</span>
                <span className={`w-full max-w-9 rounded-t-md transition-all duration-300 group-hover:opacity-80 ${accentClassName}`} style={{ height: `${height}%` }} />
              </div>
              <span className="truncate text-[10px] font-semibold text-slate-400 sm:text-xs">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
