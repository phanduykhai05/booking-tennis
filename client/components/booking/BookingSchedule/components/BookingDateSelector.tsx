"use client";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, DatePicker, Space } from "antd";
import dayjs from "dayjs";

import type { BookingScheduleContent } from "@/components/booking/BookingSchedule/types";

type BookingDateSelectorProps = {
  content: BookingScheduleContent;
  date: string;
  onChange: (date: string) => void;
  onNext: () => void;
  onPrevious: () => void;
};

const DATE_FORMAT = "YYYY-MM-DD";

export default function BookingDateSelector({ content, date, onChange, onNext, onPrevious }: BookingDateSelectorProps) {
  return (
    <Space.Compact>
      <Button aria-label={content.previousDateLabel} icon={<LeftOutlined />} onClick={onPrevious} size="large" />
      <DatePicker
        allowClear={false}
        aria-label={content.selectedDateLabel}
        className="!w-[240px]"
        format="dddd, DD/MM/YYYY"
        onChange={(value) => {
          if (value) onChange(value.format(DATE_FORMAT));
        }}
        size="large"
        value={dayjs(date, DATE_FORMAT)}
      />
      <Button aria-label={content.nextDateLabel} icon={<RightOutlined />} onClick={onNext} size="large" />
    </Space.Compact>
  );
}
