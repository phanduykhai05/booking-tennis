import type { NearbyVenuesContent } from "@/components/home/NearbyVenues/types";

export const nearbyVenuesContent: NearbyVenuesContent = {
  bookLabel: "Đặt lịch",
  favoriteLabel: "Yêu thích",
  matchLabel: "Ghép trận",
  offerLabel: "Ưu đãi",
  previewBookLabel: "Đặt lịch",
  previewCategories: ["Pickleball", "Quần vợt", "Đa năng"],
  previewOpenLabel: "06:00 - 22:00",
  previewPhone: "0847968368",
  previewRatingLabel: "Chưa có đánh giá",
  previewImages: ["Không gian sân", "Khu vực chờ", "Dụng cụ tại sân"],
  previewMemberships: [
    { description: "Ưu đãi giá sân và quyền lợi dành riêng cho hội viên.", id: "standard", title: "Gói hội viên tiêu chuẩn" },
    { description: "Phù hợp khách chơi thường xuyên, ưu đãi nhiều khung giờ.", id: "premium", title: "Gói hội viên nâng cao" },
  ],
  previewServices: [
    { description: "Dụng cụ được chuẩn bị sẵn tại quầy lễ tân.", id: "equipment", title: "Thuê dụng cụ thể thao" },
    { description: "Nước uống và khu vực nghỉ ngơi cho người chơi.", id: "refreshments", title: "Tiện ích tại sân" },
  ],
  previewTabs: [
    { id: "information", label: "Thông tin" },
    { id: "membership", label: "Gói hội viên" },
    { id: "services", label: "Dịch vụ" },
    { id: "images", label: "Hình ảnh" },
  ],
  previewVenueMark: "ĐTG",
  sectionLabel: "Sân gần bạn",
};
