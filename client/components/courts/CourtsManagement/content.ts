import type { CourtStatus, CourtSurface } from "@/components/admin/AdminData/types";

export const courtsContent = {
  activeLabel: "Đang hoạt động",
  allStatusesLabel: "Tất cả trạng thái",
  createLabel: "Thêm sân",
  description: "Quản lý cấu hình, giá thuê và trạng thái vận hành của từng sân tennis.",
  editLabel: "Chỉnh sửa sân",
  emptyLabel: "Không tìm thấy sân phù hợp.",
  indoorLabel: "Trong nhà",
  inactiveLabel: "Tạm ngưng",
  maintenanceLabel: "Bảo trì",
  outdoorLabel: "Ngoài trời",
  saveLabel: "Lưu thông tin",
  searchPlaceholder: "Tìm theo tên sân",
  statusLabels: {
    available: "Đang hoạt động",
    inactive: "Tạm ngưng",
    maintenance: "Bảo trì",
  } satisfies Record<CourtStatus, string>,
  surfaceLabels: {
    clay: "Đất nện",
    hard: "Sân cứng",
    synthetic: "Cỏ nhân tạo",
  } satisfies Record<CourtSurface, string>,
  title: "Quản lý sân",
};
