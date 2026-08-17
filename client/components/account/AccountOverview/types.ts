export type AccountMenuIcon = "calendar" | "info" | "language" | "refresh" | "shield";

export type AccountMenuItem = {
  href?: string;
  icon: AccountMenuIcon;
  id: string;
  label: string;
};
