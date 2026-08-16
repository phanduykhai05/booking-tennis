"use client";

import { Tag } from "antd";

export type StatusTone = "blue" | "emerald" | "orange" | "rose" | "slate" | "violet";

type StatusBadgeProps = {
  label: string;
  tone: StatusTone;
};

// Ánh xạ sang preset color của antd Tag để dùng chung bảng màu với phần còn lại.
const toneColor: Record<StatusTone, string> = {
  blue: "blue",
  emerald: "green",
  orange: "orange",
  rose: "red",
  slate: "default",
  violet: "purple",
};

export default function StatusBadge({ label, tone }: StatusBadgeProps) {
  return <Tag bordered={false} color={toneColor[tone]}>{label}</Tag>;
}
