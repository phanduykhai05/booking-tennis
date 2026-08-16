"use client";

import { Card, Progress, Tag, Typography } from "antd";

import { getCourtUtilization } from "@/components/admin/AdminData/selectors";
import type { Booking, Court, Venue } from "@/components/admin/AdminData/types";

type CourtUtilizationPanelProps = {
  bookings: Booking[];
  courts: Court[];
  date: string;
  dateLabel: string;
  venue: Venue;
};

// Ngưỡng đọc nhanh: kín quá thì thiếu sân, vắng quá thì lãng phí khung giờ.
function getUtilizationStyle(utilization: number) {
  if (utilization >= 75) return { color: "#f43f5e", label: "Kín", tag: "red" };
  if (utilization >= 40) return { color: "#0f9b58", label: "Ổn định", tag: "green" };
  return { color: "#f59e0b", label: "Còn trống", tag: "orange" };
}

export default function CourtUtilizationPanel({ bookings, courts, date, dateLabel, venue }: CourtUtilizationPanelProps) {
  const rankedCourts = courts
    .map((court) => ({ court, utilization: getCourtUtilization(court, bookings, date, venue.openingMinute, venue.closingMinute) }))
    .sort((first, second) => second.utilization - first.utilization);

  return (
    <Card
      className="h-full"
      title={
        <div className="py-3">
          <Typography.Text strong>Công suất theo sân</Typography.Text>
          <Typography.Paragraph className="!mb-0 !text-xs" type="secondary">
            Tỷ lệ thời gian được đặt trong ngày {dateLabel}
          </Typography.Paragraph>
        </div>
      }
    >
      <div className="space-y-4">
        {rankedCourts.map(({ court, utilization }) => {
          const style = getUtilizationStyle(utilization);
          return (
            <div key={court.id}>
              <div className="mb-1 flex items-center justify-between gap-2">
                <Typography.Text className="!text-sm" strong>{court.name}</Typography.Text>
                <Tag bordered={false} color={style.tag}>{style.label}</Tag>
              </div>
              <Progress percent={utilization} size={{ height: 8 }} strokeColor={style.color} />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
