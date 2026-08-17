import type { BookingEvent, ProductDetailData } from "@/components/product/ProductDetail/types";

const eventTemplates: BookingEvent[] = [
  { available: "0/10", court: "Pickleball 3 - 4", date: "T7 17/08", id: "live", price: "60.000 ₫", status: "Còn 18:40:56", timeEnd: "12:00", timeStart: "09:00", title: "SOCIAL SÁNG" },
  { available: "0/10", court: "Pickleball 3 - 4", date: "T7 17/08", id: "upcoming", price: "70.000 ₫", status: "Còn 01:13:54", timeEnd: "16:00", timeStart: "13:00", title: "SOCIAL CHIỀU" },
];

const productLabels = {
  actions: { addTicket: "Mua vé", addedTicket: "Đã thêm vé", details: "Xem chi tiết", payment: "Thanh toán", paymentComplete: "Đã thanh toán" },
  book: "Đặt lịch",
  checkout: { addPhone: "Thêm số điện thoại này vào tài khoản của tôi", cancel: "Huỷ", confirm: "Xác nhận thanh toán", event: "Sự kiện", phone: "Số điện thoại", phonePlaceholder: "(+84) 0912345678", ticket: "Số vé", title: "Xác nhận mua vé", total: "Tổng tiền", userInfo: "Thông tin của bạn" },
  liveTitle: "Đang diễn ra",
  upcomingTitle: "Sắp tới",
};

export const products: ProductDetailData[] = [
  { ...productLabels, address: "198 Phố Ngọc Hà, phường Ba Đình, Hà Nội", directionsHref: "https://www.google.com/maps/search/?api=1&query=198+Pho+Ngoc+Ha+Ha+Noi", events: eventTemplates, slug: "muse-pickle", venue: "MUSE PICKLE" },
  { ...productLabels, address: "50 ngách 31 ngõ 135 Đội Cấn", directionsHref: "https://www.google.com/maps/search/?api=1&query=50+Ngo+31+Doi+Can+Ha+Noi", events: eventTemplates, slug: "nhf-pickleball", venue: "NHF PICKLEBALL" },
  { ...productLabels, address: "20 Đ. Thụy Khuê, Tây Hồ, Hà Nội", directionsHref: "https://www.google.com/maps/search/?api=1&query=20+Thuy+Khue+Ha+Noi", events: eventTemplates, slug: "pickleball-20-thuy-khue", venue: "PICKLEBALL 20 THỤY KHUÊ" },
  { ...productLabels, address: "Số 6/215 P Lê Lai, Ngô Quyền, Hải Phòng", directionsHref: "https://www.google.com/maps/search/?api=1&query=6+Le+Lai+Hai+Phong", events: eventTemplates, slug: "family-pickleball", venue: "FAMILY PICKLEBALL" },
  { ...productLabels, address: "Ngõ 100 Trung Kính, Cầu Giấy, Hà Nội", directionsHref: "https://www.google.com/maps/search/?api=1&query=100+Trung+Kinh+Ha+Noi", events: eventTemplates, slug: "trung-kinh-arena", venue: "TRUNG KÍNH ARENA" },
  { ...productLabels, address: "Số 12 Nguyễn Khánh Toàn, Cầu Giấy, Hà Nội", directionsHref: "https://www.google.com/maps/search/?api=1&query=12+Nguyen+Khanh+Toan+Ha+Noi", events: eventTemplates, slug: "smash-badminton", venue: "SMASH BADMINTON CENTER" },
];

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug);

export const bookingDates = [
  { date: "Hôm nay", day: "", id: "today" },
  { date: "T3", day: "18/08", id: "18" },
  { date: "T4", day: "19/08", id: "19" },
  { date: "T5", day: "20/08", id: "20" },
  { date: "T6", day: "21/08", id: "21" },
  { date: "T7", day: "22/08", id: "22" },
  { date: "CN", day: "23/08", id: "23" },
];
