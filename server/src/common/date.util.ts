import { BadRequestException } from '@nestjs/common';

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

/** "2026-08-17" -> Date ở UTC midnight, khớp với cột `@db.Date` của Prisma. */
export function toDbDate(value: string): Date {
  if (!datePattern.test(value)) {
    throw new BadRequestException('Ngày phải theo định dạng YYYY-MM-DD');
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    throw new BadRequestException('Ngày không hợp lệ');
  }

  return date;
}

/** Date -> "2026-08-17" để trả về client. */
export function toDateString(value: Date): string {
  return value.toISOString().slice(0, 10);
}

export const appTimezone = 'Asia/Bangkok';

/**
 * "Hôm nay" theo giờ Việt Nam. Dùng UTC sẽ lệch một ngày trong khoảng 00:00-07:00
 * giờ địa phương, khiến lịch sân nhảy sang ngày hôm trước.
 */
export function todayInAppTimezone(): string {
  return new Intl.DateTimeFormat('en-CA', {
    day: '2-digit',
    month: '2-digit',
    timeZone: appTimezone,
    year: 'numeric',
  }).format(new Date());
}

export function formatMinutes(minute: number): string {
  const hours = Math.floor(minute / 60);
  const minutes = minute % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function shiftDate(value: string, days: number): string {
  const date = toDbDate(value);
  date.setUTCDate(date.getUTCDate() + days);
  return toDateString(date);
}

/** Hai khoảng phút có giao nhau hay không (chạm mép không tính là trùng). */
export function overlaps(
  firstStart: number,
  firstEnd: number,
  secondStart: number,
  secondEnd: number,
): boolean {
  return firstStart < secondEnd && firstEnd > secondStart;
}
