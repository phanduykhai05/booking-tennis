"use client";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Flex, Typography } from "antd";

import AreaChart from "@/components/dashboard/AdminDashboard/components/AreaChart";
import type { AreaChartAccent } from "@/components/dashboard/AdminDashboard/components/AreaChart";
import type { MetricTrend } from "@/components/admin/shared/MetricCard";

type TrendPanelProps = {
  accent?: AreaChartAccent;
  data: Array<{ label: string; value: number }>;
  description: string;
  formatValue: (value: number) => string;
  headlineValue: string;
  title: string;
  trend: MetricTrend | null;
};

export default function TrendPanel({ accent = "emerald", data, description, formatValue, headlineValue, title, trend }: TrendPanelProps) {
  return (
    <Card className="h-full">
      <Flex align="flex-start" gap="middle" justify="space-between" wrap>
        <div>
          <Typography.Text strong>{title}</Typography.Text>
          <Typography.Paragraph className="!mb-0 !text-xs" type="secondary">{description}</Typography.Paragraph>
        </div>
        <div className="text-right">
          <Typography.Title className="!mb-0" level={4}>{headlineValue}</Typography.Title>
          {trend ? (
            <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${trend.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
              {trend.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              {trend.label}
            </span>
          ) : null}
        </div>
      </Flex>

      <div className="mt-5">
        <AreaChart accent={accent} data={data} formatValue={formatValue} />
      </div>
    </Card>
  );
}
