"use client";

import { useSyncExternalStore } from "react";

type TodayLabelProps = {
  fallbackLabel: string;
};

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "Asia/Ho_Chi_Minh",
  weekday: "long",
  year: "numeric",
});

// vi-VN trả về "Thứ Năm"; giao diện dùng dạng "Thứ năm".
function getTodayLabel() {
  return dateFormatter.format(new Date()).replace(/\s(\p{Lu})/u, (match, letter: string) => ` ${letter.toLowerCase()}`);
}

// Ngày chỉ đọc một lần khi hiển thị nên không cần subscribe nguồn bên ngoài.
function subscribe() {
  return () => undefined;
}

export default function TodayLabel({ fallbackLabel }: TodayLabelProps) {
  const dateLabel = useSyncExternalStore(subscribe, getTodayLabel, () => fallbackLabel);

  return <span className="block text-[16px] font-semibold leading-none text-white">{dateLabel}</span>;
}
