"use client";

import { App, ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";

import { adminTheme } from "@/components/admin/AdminTheme/theme";

dayjs.locale("vi");

type AdminThemeProps = {
  children: React.ReactNode;
};

export default function AdminTheme({ children }: AdminThemeProps) {
  return (
    <ConfigProvider locale={viVN} theme={adminTheme}>
      <App>{children}</App>
    </ConfigProvider>
  );
}
