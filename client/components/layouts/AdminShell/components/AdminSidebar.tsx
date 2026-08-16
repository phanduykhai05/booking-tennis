"use client";

import {
  CalendarOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu, Typography } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";

import HeaderLogo from "@/components/layouts/PublicHeader/components/HeaderLogo";
import { adminHomeHref } from "@/components/layouts/AdminShell/mockData";
import type { AdminNavigationIcon, AdminNavigationItem, AdminShellContent } from "@/components/layouts/AdminShell/types";

type AdminSidebarProps = {
  content: AdminShellContent;
  items: AdminNavigationItem[];
  onNavigate?: () => void;
  pathname: string;
};

const icons: Record<AdminNavigationIcon, React.ReactNode> = {
  bookings: <CalendarOutlined />,
  courts: <EnvironmentOutlined />,
  customers: <TeamOutlined />,
  dashboard: <DashboardOutlined />,
  payments: <CreditCardOutlined />,
};

export default function AdminSidebar({ content, items, onNavigate, pathname }: AdminSidebarProps) {
  const activeItem = items.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));

  const menuItems: MenuProps["items"] = items.map((item) => ({
    icon: icons[item.icon],
    key: item.href,
    label: <Link href={item.href} onClick={onNavigate}>{item.label}</Link>,
  }));

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-4">
        <HeaderLogo brandName={content.brandName} href={adminHomeHref} />
        <div className="min-w-0">
          <Typography.Text strong>TennisHub</Typography.Text>
          <Typography.Paragraph className="!mb-0 !text-[11px] !uppercase !tracking-[0.12em]" type="success">
            Admin Portal
          </Typography.Paragraph>
        </div>
      </div>

      <Menu
        aria-label={content.navigationLabel}
        className="flex-1 !border-e-0 !px-2 !py-3"
        items={menuItems}
        mode="inline"
        selectedKeys={activeItem ? [activeItem.href] : []}
      />

      <div className="border-t border-slate-200 p-4">
        <div className="rounded-xl bg-slate-50 p-3">
          <Typography.Text className="!text-xs" strong>TennisHub Cầu Giấy</Typography.Text>
          <Typography.Paragraph className="!mb-0 !mt-1 !text-[11px]" type="secondary">
            Dữ liệu đang chạy ở chế độ mô phỏng.
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
}
