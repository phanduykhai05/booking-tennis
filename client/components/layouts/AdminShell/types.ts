export type AdminNavigationIcon = "bookings" | "courts" | "customers" | "dashboard" | "payments";

export type AdminNavigationItem = {
  href: string;
  icon: AdminNavigationIcon;
  id: string;
  label: string;
};

export type AdminShellContent = {
  brandName: string;
  commandPlaceholder: string;
  menuLabel: string;
  navigationLabel: string;
  notificationLabel: string;
  roleLabel: string;
  userInitials: string;
  userName: string;
};
