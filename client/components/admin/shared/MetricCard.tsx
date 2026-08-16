"use client";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Flex, Statistic, Typography } from "antd";

export type MetricTone = "blue" | "emerald" | "orange" | "violet";

export type MetricTrend = {
  isPositive: boolean;
  label: string;
};

type MetricCardProps = {
  change?: string;
  icon: React.ReactNode;
  label: string;
  tone?: MetricTone;
  trend?: MetricTrend;
  value: string;
};

// antd không có ô icon màu nhạt sẵn nên phần này vẫn dùng Tailwind.
const toneClassName: Record<MetricTone, string> = {
  blue: "bg-sky-50 text-sky-600 ring-sky-100",
  emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  orange: "bg-orange-50 text-orange-600 ring-orange-100",
  violet: "bg-violet-50 text-violet-600 ring-violet-100",
};

export default function MetricCard({ change, icon, label, tone = "emerald", trend, value }: MetricCardProps) {
  return (
    <Card className="h-full transition-shadow duration-200 hover:shadow-[0_10px_28px_-18px_rgba(15,23,42,0.5)]">
      <Flex align="flex-start" gap="middle" justify="space-between">
        <Statistic title={label} value={value} />
        <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-lg ring-1 ${toneClassName[tone]}`}>
          {icon}
        </span>
      </Flex>

      <Flex align="center" className="!mt-2" gap="small" wrap>
        {trend ? (
          <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${trend.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
            {trend.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            {trend.label}
          </span>
        ) : null}
        {change ? <Typography.Text className="!text-xs" type="secondary">{change}</Typography.Text> : null}
      </Flex>
    </Card>
  );
}
