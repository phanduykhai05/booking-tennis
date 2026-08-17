import type { ProfileDetailItem } from "@/components/account/ProfileOverview/types";

export const profileContent = {
  avatarInitial: "k",
  birthYear: "2026",
  emailPrompt: "Chưa cập nhật email",
  gender: "Khác",
  genderLabel: "Giới tính",
  height: "-",
  heightLabel: "Chiều cao (cm)",
  name: "khải duy",
  overview: "Tổng quan",
  personalTitle: "Cá nhân hoá",
  phone: "Điện thoại",
  physicalTitle: "Thông tin thể chất",
  specialNote: "Ghi chú đặc biệt",
  weight: "-",
  weightLabel: "Cân nặng (kg)",
  yearLabel: "Năm sinh",
};

export const profileDetailItems: ProfileDetailItem[] = [
  { icon: "location", id: "location", label: "Vị trí yêu thích" },
  { icon: "sport", id: "sport", label: "Môn thể thao và trình độ" },
  { icon: "goal", id: "goal", label: "Mục tiêu" },
  { icon: "schedule", id: "schedule", label: "Tần suất chơi" },
];
