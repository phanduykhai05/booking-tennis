export type SportCategoryIcon =
  | "athletics"
  | "badminton"
  | "basketball"
  | "football"
  | "pickleball"
  | "swimming"
  | "tableTennis"
  | "taekwondo"
  | "tennis"
  | "volleyball";

export type SportCategoryId =
  | "athletics"
  | "badminton"
  | "basketball"
  | "football"
  | "pickleball"
  | "swimming"
  | "table-tennis"
  | "taekwondo"
  | "tennis"
  | "volleyball";

export type SportCategory = {
  icon: SportCategoryIcon;
  id: SportCategoryId;
  label: string;
};
