"use client";

import { Card, Space, Typography } from "antd";

type AdminTableCardProps = {
  children: React.ReactNode;
  description?: string;
  title: string;
  toolbar?: React.ReactNode;
};

export default function AdminTableCard({ children, description, title, toolbar }: AdminTableCardProps) {
  return (
    <Card
      classNames={{ body: "!p-0" }}
      extra={toolbar ? <Space wrap>{toolbar}</Space> : undefined}
      title={
        <div className="py-3">
          <Typography.Text strong>{title}</Typography.Text>
          {description ? (
            <Typography.Paragraph className="!mb-0 !text-xs" type="secondary">{description}</Typography.Paragraph>
          ) : null}
        </div>
      }
    >
      {children}
    </Card>
  );
}
