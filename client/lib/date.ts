export const appTimezone = "Asia/Bangkok";

/**
 * "Hôm nay" theo giờ Việt Nam. Dùng UTC sẽ lệch một ngày trong khoảng 00:00-07:00
 * giờ địa phương, khiến lịch sân mở sai ngày.
 */
export function todayInAppTimezone(): string {
  return new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: appTimezone,
    year: "numeric",
  }).format(new Date());
}

/** Cộng thêm số ngày vào chuỗi "YYYY-MM-DD". */
export function shiftDate(value: string, days: number): string {
  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
