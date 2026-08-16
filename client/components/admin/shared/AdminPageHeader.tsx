"use client";

import { Flex, Space, Typography } from "antd";

type AdminPageHeaderProps = {
  actions?: React.ReactNode;
  description: string;
  eyebrow?: string;
  title: string;
};

export default function AdminPageHeader({ actions, description, eyebrow, title }: AdminPageHeaderProps) {
  return (
    <Flex align="flex-end" gap="middle" justify="space-between" wrap>
      <div>
        {eyebrow ? (
          <Typography.Paragraph className="!mb-0 !text-xs !uppercase !tracking-[0.16em]" strong type="success">
            {eyebrow}
          </Typography.Paragraph>
        ) : null}
        <Typography.Title className="!mb-1 !mt-1" level={3}>{title}</Typography.Title>
        <Typography.Paragraph className="!mb-0 !max-w-2xl" type="secondary">{description}</Typography.Paragraph>
      </div>
      {actions ? <Space wrap>{actions}</Space> : null}
    </Flex>
  );
}
