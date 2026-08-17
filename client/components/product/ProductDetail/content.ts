import type { ProductDetailContent } from "@/components/product/ProductDetail/types";
import { shiftDate } from "@/lib/date";

export const productDetailContent: ProductDetailContent = {
  actions: {
    addTicket: "Mua vé",
    addedTicket: "Đã thêm vé",
    details: "Xem chi tiết",
    payment: "Thanh toán",
    paymentComplete: "Đã thanh toán",
  },
  book: "Đặt lịch",
  checkout: {
    addPhone: "Thêm số điện thoại này vào tài khoản của tôi",
    cancel: "Huỷ",
    confirm: "Xác nhận thanh toán",
    event: "Sự kiện",
    phone: "Số điện thoại",
    phonePlaceholder: "(+84) 0912345678",
    signInMessage: "Bạn cần đăng nhập để mua vé.",
    ticket: "Số vé",
    title: "Xác nhận mua vé",
    total: "Tổng tiền",
    userInfo: "Thông tin của bạn",
  },
  emptyEvents: "Sân chưa mở sự kiện nào",
  eventCountLabel: "sự kiện",
  liveTitle: "Đang diễn ra",
  upcomingTitle: "Sắp tới",
};

const weekdayLabels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

/** Dải 7 ngày tính từ ngày truyền vào; mỗi ngày mở thẳng lưới lịch của ngày đó. */
export function buildBookingDates(slug: string, from: string) {
  return Array.from({ length: 7 }, (_, offset) => {
    const value = shiftDate(from, offset);
    const date = new Date(`${value}T00:00:00.000Z`);
    const day = `${date.getUTCDate().toString().padStart(2, "0")}/${(date.getUTCMonth() + 1).toString().padStart(2, "0")}`;

    return {
      date: offset === 0 ? "Hôm nay" : weekdayLabels[date.getUTCDay()],
      day: offset === 0 ? "" : day,
      href: `/product/${slug}/schedule?date=${value}`,
      id: value,
    };
  });
}
