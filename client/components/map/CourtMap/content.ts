import type { CourtMapContent, CourtMapFilter } from "@/components/map/CourtMap/types";

export const courtMapContent: CourtMapContent = {
  currentLocationLabel: "Vị trí hiện tại",
  geolocationUnavailableMessage: "Không thể lấy vị trí. Hãy cho phép quyền vị trí cho ứng dụng rồi thử lại.",
  layersLabel: "Lớp bản đồ",
  mapAttribution: "© OpenStreetMap contributors · Vị trí sân lấy từ API TennisHub",
  searchInputLabel: "Tìm sân quanh đây",
  searchPlaceholder: "Tìm kiếm sân quanh đây.",
  searchSubmitLabel: "Tìm kiếm",
  unavailableMapMessage: "Không thể tải bản đồ. Kiểm tra kết nối mạng rồi thử lại.",
};

export const courtMapFilters: CourtMapFilter[] = [
  { id: "pickleball", label: "Pickleball" },
  { id: "badminton", label: "Cầu lông" },
  { id: "football", label: "Bóng đá" },
  { id: "basketball", label: "Bóng rổ" },
];
