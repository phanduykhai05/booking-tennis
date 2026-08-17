"use client";

import { Card, Empty, Timeline, Typography } from "antd";

import type { ActivityEvent, ActivityType } from "@/components/admin/AdminData/types";

type RecentActivitiesProps = {
  activities: ActivityEvent[];
};

const timeFormatter = new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit" });

const activityColor: Record<ActivityType, string> = {
  "booking-created": "green",
  "booking-updated": "blue",
  "court-updated": "orange",
  "payment-updated": "purple",
};

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <Card
      className="h-full"
      title={
        <div className="py-3">
          <Typography.Text strong>Hoạt động gần đây</Typography.Text>
          <Typography.Paragraph className="!mb-0 !text-xs" type="secondary">Cập nhật từ vận hành sân và thanh toán</Typography.Paragraph>
        </div>
      }
    >
      {activities.length === 0 ? (
        <Empty description="Chưa có hoạt động nào" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Timeline
          items={activities.map((activity) => ({
            children: (
              <div>
                <Typography.Paragraph className="!mb-0 !text-sm">{activity.message}</Typography.Paragraph>
                <Typography.Text className="!text-[12px]" type="secondary">
                  {timeFormatter.format(new Date(activity.createdAt))}
                </Typography.Text>
              </div>
            ),
            color: activityColor[activity.type],
            key: activity.id,
          }))}
        />
      )}
    </Card>
  );
}
