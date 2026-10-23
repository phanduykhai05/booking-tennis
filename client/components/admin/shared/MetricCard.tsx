import { ArrowDown, ArrowUp } from "lucide-react";
import type { ReactNode } from "react";

import Card from "@/components/ui/Card";

export type MetricTone = "blue" | "emerald" | "orange" | "violet";

export type MetricTrend = {
  isPositive: boolean;
  label: string;
};

type MetricCardProps = {
  change?: string;
  icon: ReactNode;
  label: string;
  tone?: MetricTone;
  trend?: MetricTrend;
  value: string;
};

const toneBackground: Record<MetricTone, string> = {
  blue: "bg-sky-50",
  emerald: "bg-emerald-50",
  orange: "bg-orange-50",
  violet: "bg-violet-50",
};

export const metricIconColor: Record<MetricTone, string> = {
  blue: "#0284c7",
  emerald: "#059669",
  orange: "#ea580c",
  violet: "#7c3aed",
};

export default function MetricCard({ change, icon, label, tone = "emerald", trend, value }: MetricCardProps) {
  return (
    <Card className="h-full">
      <div className="flex-row items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-[13px] text-slate-500">{label}</span>
          <span className="mt-1 text-[24px] font-bold text-slate-900">{value}</span>
        </div>
        <div className={`h-11 w-11 shrink-0 items-center justify-center rounded-xl ${toneBackground[tone]}`}>{icon}</div>
      </div>

      <div className="mt-2 flex-row flex-wrap items-center gap-2">
        {trend ? (
          <div
            className={`flex-row items-center gap-1 rounded-full px-2 py-0.5 ${trend.isPositive ? "bg-emerald-50" : "bg-rose-50"}`}
          >
            {trend.isPositive ? <ArrowUp color="#059669" size={12} /> : <ArrowDown color="#e11d48" size={12} />}
            <span className={`text-[12px] font-semibold ${trend.isPositive ? "text-emerald-600" : "text-rose-600"}`}>
              {trend.label}
            </span>
          </div>
        ) : null}
        {change ? <span className="text-[12px] text-slate-500">{change}</span> : null}
      </div>
    </Card>
  );
}
