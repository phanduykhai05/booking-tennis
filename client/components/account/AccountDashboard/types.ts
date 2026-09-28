export type DashboardItem = {
  icon: "calendar" | "graduation" | "group" | "member" | "settings" | "ticket" | "version" | "wallet";
  id: string;
  label: string;
};
export type DashboardShortcut = { id: "booking" | "course" | "notification" | "offer"; label: string };
