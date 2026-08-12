export type EventPeriod = "this-month" | "this-weekend";

export type UpcomingEvent = {
  date: string;
  id: string;
  imageUrl: string;
  price: string;
  title: string;
};

export type EventPeriodConfig = {
  id: EventPeriod;
  label: string;
};
