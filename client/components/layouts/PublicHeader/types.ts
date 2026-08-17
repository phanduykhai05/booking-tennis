export type HeaderAction = {
  href?: string;
  id: "login" | "register";
  label: string;
};

export type HeaderShortcutIcon = "booked" | "favorite" | "map";

export type HeaderShortcut = {
  icon: HeaderShortcutIcon;
  id: string;
  label: string;
};

export type PublicHeaderContent = {
  brandName: string;
  favoriteLabel: string;
  languageLabel: string;
  searchInputLabel: string;
  searchPlaceholder: string;
  searchSubmitLabel: string;
  todayFallbackLabel: string;
};
