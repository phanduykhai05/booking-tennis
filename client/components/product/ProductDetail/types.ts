export type BookingEvent = {
  available: string;
  court: string;
  date: string;
  id: string;
  isLive?: boolean;
  price: string;
  priceValue: number;
  status: string;
  timeEnd: string;
  timeStart: string;
  title: string;
};

export type CheckoutLabels = {
  addPhone: string;
  cancel: string;
  confirm: string;
  event: string;
  phone: string;
  phonePlaceholder: string;
  signInMessage: string;
  ticket: string;
  title: string;
  total: string;
  userInfo: string;
};

/** Phần chữ cố định của trang chi tiết sân. */
export type ProductDetailContent = {
  actions: {
    addTicket: string;
    addedTicket: string;
    details: string;
    payment: string;
    paymentComplete: string;
  };
  book: string;
  checkout: CheckoutLabels;
  emptyEvents: string;
  eventCountLabel: string;
  liveTitle: string;
  upcomingTitle: string;
};

/** Phần dữ liệu lấy từ `GET /venues/:id`. */
export type ProductDetailData = {
  address: string;
  directionsHref: string;
  events: BookingEvent[];
  openingLabel: string;
  phone: string;
  slug: string;
  venue: string;
};

export type BookingDateItem = {
  date: string;
  day: string;
  href: string;
  id: string;
};
