"use client";

import { CalendarOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Segmented } from "antd";

import type { BookingViewMode } from "@/components/booking/BookingSchedule/types";

type BookingViewSwitcherProps = {
  onChange: (view: BookingViewMode) => void;
  value: BookingViewMode;
};

const options = [
  { icon: <CalendarOutlined />, label: "Dòng thời gian", value: "timeline" as const },
  { icon: <UnorderedListOutlined />, label: "Danh sách", value: "list" as const },
];

export default function BookingViewSwitcher({ onChange, value }: BookingViewSwitcherProps) {
  return (
    <Segmented<BookingViewMode>
      aria-label="Kiểu hiển thị lịch đặt sân"
      onChange={onChange}
      options={options.map((option) => ({
        label: <span className="flex items-center gap-2">{option.icon}<span className="hidden sm:inline">{option.label}</span></span>,
        value: option.value,
      }))}
      size="large"
      value={value}
    />
  );
}
