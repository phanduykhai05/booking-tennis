export type AppNotification = {
  createdAt: string;
  id: string;
  isRead: boolean;
  kind: "booking" | "promotion" | "system";
  message: string;
  time: string;
  title: string;
};
