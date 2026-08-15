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

export type SportCategory = {
  icon: SportCategoryIcon;
  id: string;
  label: string;
};
