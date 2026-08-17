import type {
  CourtScheduleConfig,
  ScheduleCourtGroup,
  ScheduleEntry,
  SchedulePriceRule,
  SelectedSlot,
  SlotStatus,
} from "@/components/booking/CourtScheduleBooking/types";

export const slotKey = (courtId: string, startMinute: number) => `${courtId}|${startMinute}`;

export function getTimeSlots(config: CourtScheduleConfig) {
  const slots: number[] = [];

  for (let minute = config.startMinute; minute < config.endMinute; minute += config.slotMinutes) {
    slots.push(minute);
  }

  return slots;
}

export function formatMinutes(minute: number) {
  const hours = Math.floor(minute / 60);
  const minutes = minute % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

export function formatDateLabel(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

export function findEntry(entries: ScheduleEntry[], courtId: string, startMinute: number, endMinute: number) {
  return entries.find((entry) => entry.courtId === courtId && entry.startMinute < endMinute && entry.endMinute > startMinute);
}

export function getSlotStatus(entry?: ScheduleEntry): SlotStatus {
  return entry ? entry.status : "available";
}

export function getSlotPrice(priceRules: SchedulePriceRule[], startMinute: number, slotMinutes: number) {
  const rule = priceRules.find((priceRule) => startMinute >= priceRule.startMinute && startMinute < priceRule.endMinute) ?? priceRules.at(-1);
  return rule ? Math.round((rule.pricePerHour * slotMinutes) / 60) : 0;
}

// Khoá chọn được lưu dạng "courtId|startMinute"; tên sân và giá luôn tính lại từ nguồn dữ liệu để không lệch khi mock thay đổi.
export function getSelectedSlots(
  selectedKeys: string[],
  courtGroups: ScheduleCourtGroup[],
  priceRules: SchedulePriceRule[],
  slotMinutes: number,
): SelectedSlot[] {
  const courts = courtGroups.flatMap((group) => group.courts);

  return selectedKeys
    .flatMap((key) => {
      const [courtId, startMinute] = key.split("|");
      const court = courts.find((item) => item.id === courtId);
      if (!court) return [];

      const start = Number(startMinute);
      return [{
        courtId: court.id,
        courtName: court.name,
        endMinute: start + slotMinutes,
        price: getSlotPrice(priceRules, start, slotMinutes),
        startMinute: start,
      }];
    })
    .sort((first, second) => {
      const courtOrder = courts.findIndex((court) => court.id === first.courtId) - courts.findIndex((court) => court.id === second.courtId);
      return courtOrder === 0 ? first.startMinute - second.startMinute : courtOrder;
    });
}

// Gộp các ô liền nhau của cùng một sân thành một khung giờ để phần tóm tắt đọc được như lịch thật.
export function getSelectionRanges(slots: SelectedSlot[]): SelectedSlot[] {
  return slots.reduce<SelectedSlot[]>((ranges, slot) => {
    const previous = ranges.at(-1);

    if (previous && previous.courtId === slot.courtId && previous.endMinute === slot.startMinute) {
      previous.endMinute = slot.endMinute;
      previous.price += slot.price;
      return ranges;
    }

    return [...ranges, { ...slot }];
  }, []);
}

export function getSelectionTotal(slots: SelectedSlot[]) {
  return slots.reduce((total, slot) => total + slot.price, 0);
}
