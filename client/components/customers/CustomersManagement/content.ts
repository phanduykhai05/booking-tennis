import type { CustomerStatus } from "@/components/admin/AdminData/types";

export const customersContent = {
  allStatusesLabel: "Tất cả trạng thái",
  description: "Theo dõi lịch sử đặt sân, mức chi tiêu và trạng thái của khách hàng TennisHub.",
  emptyLabel: "Không tìm thấy khách hàng phù hợp.",
  searchPlaceholder: "Tìm tên, email hoặc số điện thoại",
  statusLabels: {
    active: "Đang hoạt động",
    inactive: "Tạm ngưng",
  } satisfies Record<CustomerStatus, string>,
  title: "Khách hàng",
};
