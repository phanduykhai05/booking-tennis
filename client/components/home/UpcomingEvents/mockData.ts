import type { EventPeriod, EventPeriodConfig, UpcomingEvent } from "@/components/home/UpcomingEvents/types";

export const upcomingEventsMockData = {
  periods: [
    { id: "this-weekend", label: "Cuối tuần này" },
    { id: "this-month", label: "Tháng này" },
  ] satisfies EventPeriodConfig[],
  seeMoreLabel: "Xem thêm",
  itemsByPeriod: {
    "this-weekend": [
      {
        date: "12 tháng 08, 2026",
        id: "la-maison-du-chocolat",
        imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/61/57/13/8a5bc37dc7801c6b63b40c8f16c1ea1e.jpg",
        price: "Từ 299.000đ",
        title: "Vé Tham Quan Bảo Tàng Sô Cô La Việt Nam - La Maison du Chocolat",
      },
      {
        date: "12 tháng 08, 2026",
        id: "chao-show",
        imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/04/ae/18/9ee650dff5237d8bcfdb2f92aa049e1c.jpg",
        price: "Từ 1.300.000đ",
        title: "Chào Show - The Sound of Vietnam",
      },
      {
        date: "14 tháng 08, 2026",
        id: "lemlab-workshop-lam-gom",
        imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/b6/69/c8/41b6ee0ed16efb1ec69b8941da39d70c.jpg",
        price: "Từ 350.000đ",
        title: "[LEMLAB] Workshop TRẢI NGHIỆM LÀM GỐM TRẺ EM",
      },
      {
        date: "14 tháng 08, 2026",
        id: "ben-thanh-tang-phuc-hoang-ton",
        imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/67/a8/e0/2e853b995a12adeee874e8fa25711539.jpg",
        price: "Từ 300.000đ",
        title: "[BẾN THÀNH] Đêm nhạc Tăng Phúc - Hoàng Tôn",
      },
    ],
    "this-month": [
      {
        date: "15 tháng 08, 2026",
        id: "carrot-day-2026",
        imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/36/96/87/21a83b95223417e3b005cb71de02c687.jpg",
        price: "Từ 0đ",
        title: "CARROT DAY 2026",
      },
      {
        date: "14 tháng 08, 2026",
        id: "lemlab-workshop-lam-gom-month",
        imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/b6/69/c8/41b6ee0ed16efb1ec69b8941da39d70c.jpg",
        price: "Từ 350.000đ",
        title: "[LEMLAB] Workshop TRẢI NGHIỆM LÀM GỐM TRẺ EM",
      },
      {
        date: "14 tháng 08, 2026",
        id: "ben-thanh-tang-phuc-hoang-ton-month",
        imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/67/a8/e0/2e853b995a12adeee874e8fa25711539.jpg",
        price: "Từ 300.000đ",
        title: "[BẾN THÀNH] Đêm nhạc Tăng Phúc - Hoàng Tôn",
      },
      {
        date: "12 tháng 08, 2026",
        id: "chao-show-month",
        imageUrl: "https://images.tkbcdn.com/2/608/332/ts/ds/04/ae/18/9ee650dff5237d8bcfdb2f92aa049e1c.jpg",
        price: "Từ 1.300.000đ",
        title: "Chào Show - The Sound of Vietnam",
      },
    ],
  } satisfies Record<EventPeriod, UpcomingEvent[]>,
};
