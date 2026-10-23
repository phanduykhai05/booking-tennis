export type ProfileDetailItem = {
  icon: "goal" | "location" | "schedule" | "sport";
  id: string;
  label: string;
};

/** Nhóm trường đang được sửa trong ProfileEditSheet. */
export type ProfileEditSection = "note" | "personal" | "physical";
