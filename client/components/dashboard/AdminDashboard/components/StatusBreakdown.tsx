"use client";

import { Card, Typography } from "antd";

import type { BookingStatus } from "@/components/admin/AdminData/types";
import { bookingScheduleContent } from "@/components/booking/BookingSchedule/mockData";

type StatusBreakdownProps = {
  counts: Record<BookingStatus, number>;
  total: number;
};

const RADIUS = 52;
const STROKE_WIDTH = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const statusColor: Record<BookingStatus, string> = {
  cancelled: "#f43f5e",
  "checked-in": "#0ea5e9",
  completed: "#8b5cf6",
  confirmed: "#10b981",
  pending: "#f59e0b",
};

const statusOrder: BookingStatus[] = ["confirmed", "pending", "checked-in", "completed", "cancelled"];

export default function StatusBreakdown({ counts, total }: StatusBreakdownProps) {
  const getSegmentLength = (status: BookingStatus) => total > 0 ? (counts[status] / total) * CIRCUMFERENCE : 0;

  // Offset cộng dồn từ các lát trước; tính lại thay vì gán biến ngoài để hàm render thuần khiết.
  const segments = statusOrder.map((status, index) => ({
    color: statusColor[status],
    length: getSegmentLength(status),
    offset: statusOrder.slice(0, index).reduce((total_, previous) => total_ + getSegmentLength(previous), 0),
    status,
    value: counts[status],
  }));

  return (
    <Card
      className="h-full"
      title={
        <div className="py-3">
          <Typography.Text strong>Cơ cấu trạng thái</Typography.Text>
          <Typography.Paragraph className="!mb-0 !text-xs" type="secondary">Phân bổ toàn bộ lịch đặt sân</Typography.Paragraph>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative">
          <svg className="size-[152px] -rotate-90" viewBox="0 0 140 140">
            <circle cx="70" cy="70" fill="none" r={RADIUS} stroke="#f1f5f9" strokeWidth={STROKE_WIDTH} />
            {segments.map((segment) => (
              <circle
                cx="70"
                cy="70"
                fill="none"
                key={segment.status}
                r={RADIUS}
                stroke={segment.color}
                strokeDasharray={`${segment.length} ${CIRCUMFERENCE - segment.length}`}
                strokeDashoffset={-segment.offset}
                strokeLinecap="butt"
                strokeWidth={STROKE_WIDTH}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Typography.Title className="!mb-0" level={2}>{total}</Typography.Title>
            <Typography.Text className="!text-xs" type="secondary">lịch đặt</Typography.Text>
          </div>
        </div>

        <ul className="w-full space-y-2">
          {segments.map((segment) => (
            <li className="flex items-center gap-2" key={segment.status}>
              <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: segment.color }} />
              <Typography.Text className="!text-xs flex-1">{bookingScheduleContent.bookingStatusLabels[segment.status]}</Typography.Text>
              <Typography.Text className="!text-xs" strong>{segment.value}</Typography.Text>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
