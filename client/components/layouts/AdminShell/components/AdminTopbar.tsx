"use client";

import { BellOutlined, MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Input, Space, Typography } from "antd";

import { adminBrandColor } from "@/components/admin/AdminTheme/theme";
import type { AdminShellContent } from "@/components/layouts/AdminShell/types";

type AdminTopbarProps = {
  content: AdminShellContent;
  onMenuOpen: () => void;
};

export default function AdminTopbar({ content, onMenuOpen }: AdminTopbarProps) {
  return (
    <div className="flex h-16 items-center gap-3">
      <Button
        aria-label={content.menuLabel}
        className="lg:hidden"
        icon={<MenuOutlined />}
        onClick={onMenuOpen}
        size="large"
      />

      <Input
        aria-label={content.commandPlaceholder}
        className="hidden !max-w-md sm:flex"
        placeholder={content.commandPlaceholder}
        prefix={<SearchOutlined className="text-slate-400" />}
        size="large"
        type="search"
      />

      <Space align="center" className="ml-auto" size="middle">
        <Badge dot>
          <Button aria-label={content.notificationLabel} icon={<BellOutlined />} size="large" />
        </Badge>
        <Space align="center" size="small">
          <Avatar style={{ backgroundColor: adminBrandColor }}>{content.userInitials}</Avatar>
          <div className="hidden sm:block">
            <Typography.Paragraph className="!mb-0 !text-xs" strong>{content.userName}</Typography.Paragraph>
            <Typography.Paragraph className="!mb-0 !text-[11px]" type="secondary">{content.roleLabel}</Typography.Paragraph>
          </div>
        </Space>
      </Space>
    </div>
  );
}
