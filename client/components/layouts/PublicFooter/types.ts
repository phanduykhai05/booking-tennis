export type BottomNavigationIcon = "account" | "discover" | "home" | "map" | "popular";

export type BottomNavigationItem = {
  href: string;
  icon: BottomNavigationIcon;
  id: string;
  isActive?: boolean;
  isPrimary?: boolean;
  label: string;
};
