"use client";

import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";

import { adminHomeHref } from "@/components/layouts/AdminShell/mockData";
import type { AdminNavigationItem } from "@/components/layouts/AdminShell/types";

type AdminBreadcrumbsProps = {
  items: AdminNavigationItem[];
  pathname: string;
};

export default function AdminBreadcrumbs({ items, pathname }: AdminBreadcrumbsProps) {
  const currentItem = items.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));

  return (
    <Breadcrumb
      className="!mb-4"
      items={[
        { title: <Link aria-label="Tổng quan" href={adminHomeHref}><HomeOutlined /></Link> },
        { title: currentItem?.label ?? "Quản trị" },
      ]}
    />
  );
}
