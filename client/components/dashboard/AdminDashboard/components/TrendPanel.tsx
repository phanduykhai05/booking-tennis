import { ArrowDown, ArrowUp } from "lucide-react-native";
import { Text, View } from "react-native";

import type { MetricTrend } from "@/components/admin/shared/MetricCard";
import AreaChart from "@/components/dashboard/AdminDashboard/components/AreaChart";
import type { AreaChartAccent } from "@/components/dashboard/AdminDashboard/components/AreaChart";
import Card from "@/components/ui/Card";

type TrendPanelProps = {
  accent?: AreaChartAccent;
  data: { label: string; value: number }[];
  description: string;
  formatValue: (value: number) => string;
  headlineValue: string;
  title: string;
  trend: MetricTrend | null;
};

export default function TrendPanel({ accent = "emerald", data, description, formatValue, headlineValue, title, trend }: TrendPanelProps) {
  return (
    <Card className="h-full">
      <View className="flex-row flex-wrap items-start justify-between gap-3">
        <View className="min-w-0 flex-1">
          <Text className="text-[15px] font-bold text-slate-900">{title}</Text>
          <Text className="text-[12px] text-slate-500">{description}</Text>
        </View>
        <View className="items-end">
          <Text className="text-[18px] font-bold text-slate-900">{headlineValue}</Text>
          {trend ? (
            <View
              className={`mt-1 flex-row items-center gap-1 rounded-full px-2 py-0.5 ${trend.isPositive ? "bg-emerald-50" : "bg-rose-50"}`}
            >
              {trend.isPositive ? <ArrowUp color="#059669" size={12} /> : <ArrowDown color="#e11d48" size={12} />}
              <Text className={`text-[12px] font-semibold ${trend.isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                {trend.label}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <View className="mt-5">
        <AreaChart accent={accent} data={data} formatValue={formatValue} />
      </View>
    </Card>
  );
}
