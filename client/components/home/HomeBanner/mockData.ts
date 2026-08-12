export type HomeBannerItem = {
  ctaLabel: string;
  href: string;
  id: string;
  imageUrl: string;
  title: string;
  videoUrl?: string;
};

export const homeBannerMockData: HomeBannerItem[] = [
  {
    ctaLabel: "Xem chi tiết",
    href: "https://ticketbox.vn/ben-thanh-harmony-26360?utm_medium=hero-banner&utm_source=tkb-homepage",
    id: "summer-concert",
    imageUrl: "https://images.tkbcdn.com/2/614/350/ts/ds/96/8e/f7/8d2ebdfa2947ec1cbbcebece74df891b.jpg",
    title: "Chạm nhịp mùa hè cùng những giai điệu rực rỡ",
    videoUrl: "https://salt.tkbcdn.com/ts/ds/2c/a3/a0/feadd16c49e4b0b2a3fec489126bc85e.mp4",
  },
  {
    ctaLabel: "Xem chi tiết",
    href: "/su-kien/ben-thanh-harmony",
    id: "ben-thanh-harmony",
    imageUrl: "https://images.tkbcdn.com/2/614/350/ts/ds/96/8e/f7/8d2ebdfa2947ec1cbbcebece74df891b.jpg",
    title: "Bến Thành Harmony — nơi âm nhạc gặp gỡ cảm xúc",
  },
  {
    ctaLabel: "Xem chi tiết",
    href: "/su-kien/creative-weekend",
    id: "creative-weekend",
    imageUrl: "https://images.tkbcdn.com/2/614/350/ts/ds/96/8e/f7/8d2ebdfa2947ec1cbbcebece74df891b.jpg",
    title: "Cuối tuần sáng tạo, khám phá điều mới mẻ cùng bạn bè",
  },
  {
    ctaLabel: "Xem chi tiết",
    href: "/su-kien/weekend-festival",
    id: "weekend-festival",
    imageUrl: "https://images.tkbcdn.com/2/614/350/ts/ds/96/8e/f7/8d2ebdfa2947ec1cbbcebece74df891b.jpg",
    title: "Hẹn bạn tại lễ hội cuối tuần nhiều sắc màu",
  },
];
