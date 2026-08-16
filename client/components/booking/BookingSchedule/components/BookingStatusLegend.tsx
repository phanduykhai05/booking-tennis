"use client";

import { Typography } from "antd";

import { bookingStatusStyles } from "@/components/booking/BookingSchedule/components/bookingStatusStyles";
import type { BookingScheduleContent, BookingStatus } from "@/components/booking/BookingSchedule/types";

type BookingStatusLegendProps = {
  content: BookingScheduleContent;
  statuses: BookingStatus[];
};

export default function BookingStatusLegend({ content, statuses }: BookingStatusLegendProps) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {statuses.map((status) => (
        <li className="flex items-center gap-1.5" key={status}>
          <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: bookingStatusStyles[status].accent }} />
          <Typography.Text className="!text-xs" type="secondary">{content.bookingStatusLabels[status]}</Typography.Text>
        </li>
      ))}
    </ul>
  );
}
