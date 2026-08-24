export const appTimezone = "Asia/Bangkok";

/** Lệch múi giờ Việt Nam so với UTC, tính bằng mili giây. Việt Nam không đổi giờ theo mùa. */
const appTimezoneOffsetMs = 7 * 60 * 60 * 1000;

const pad = (value: number) => value.toString().padStart(2, "0");

/**
 * "Hôm nay" theo giờ Việt Nam. Dùng UTC sẽ lệch một ngày trong khoảng 00:00-07:00
 * giờ địa phương, khiến lịch sân mở sai ngày. Tự cộng offset thay vì dùng Intl vì
 * Hermes trên Android không luôn kèm dữ liệu múi giờ đầy đủ.
 */
export function todayInAppTimezone(): string {
  const now = new Date(Date.now() + appTimezoneOffsetMs);
  return `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())}`;
}

/** Cộng thêm số ngày vào chuỗi "YYYY-MM-DD". */
export function shiftDate(value: string, days: number): string {
  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export const weekdayNames = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

export const shortWeekdayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

/** Thứ trong tuần của chuỗi "YYYY-MM-DD", đọc theo UTC nên không lệch theo máy người dùng. */
export function weekdayIndex(value: string): number {
  return new Date(`${value}T12:00:00.000Z`).getUTCDay();
}

/** "2026-08-15" -> "15/08/2026". */
export function formatDayMonthYear(value: string): string {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

/** "2026-08-15" -> "Thứ sáu, 15/08/2026". */
export function formatWeekdayDate(value: string): string {
  return `${weekdayNames[weekdayIndex(value)]}, ${formatDayMonthYear(value)}`;
}

/** "2026-08-15" -> "Thứ sáu, 15 tháng 8, 2026" — bản dài dùng cho panel chi tiết của admin. */
export function formatLongDate(value: string): string {
  const [year, month, day] = value.split("-");
  return `${weekdayNames[weekdayIndex(value)]}, ${day} tháng ${Number(month)}, ${year}`;
}
