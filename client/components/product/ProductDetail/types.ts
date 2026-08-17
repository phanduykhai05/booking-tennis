export type BookingEvent = {
  available: string;
  court: string;
  date: string;
  id: string;
  isLive?: boolean;
  price: string;
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
  ticket: string;
  title: string;
  total: string;
  userInfo: string;
};

export type ProductDetailData = {
  actions: {
    addTicket: string;
    addedTicket: string;
    details: string;
    payment: string;
    paymentComplete: string;
  };
  address: string;
  book: string;
  checkout: CheckoutLabels;
  events: BookingEvent[];
  liveTitle: string;
  slug: string;
  directionsHref: string;
  upcomingTitle: string;
  venue: string;
};
