import type { DiscoverFilter, DiscoverFilterId, DiscoverPost } from "@/components/discover/DiscoverFeed/types";

export const discoverContent = {
  all: "Tất cả",
  contact: "Liên hệ ngay",
  courseTitle: "Huấn luyện viên chuyên nghiệp tại sân",
  discover: "KHÁM PHÁ",
  empty: "Chưa có bài viết nào",
  emptyCourtTitle: "Sân trống trong hôm nay",
  errorMessage: "Không tải được bài viết khám phá",
  loading: "Đang tải bài viết…",
  memberPackage: "Gói hội viên",
  more: "Xem thêm (2)",
  title: "Khám phá",
};

export const discoverFilters: DiscoverFilter[] = [
  { id: "all", label: "Tất cả" },
  { id: "member", label: "Gói hội viên" },
  { id: "course", label: "Khóa học" },
  { id: "notifications", label: "Thông báo" },
  { id: "offers", label: "Ưu đãi" },
  { id: "events", label: "Sự kiện" },
];

/**
 * Bộ lọc trên giao diện quy về `type` mà `GET /discover/posts` hiểu.
 * `undefined` nghĩa là lấy tất cả rồi lọc tiếp ở client.
 */
export const filterToApiType: Record<DiscoverFilterId, DiscoverPost["type"] | undefined> = {
  all: undefined,
  course: "course",
  events: "event",
  member: "member",
  notifications: undefined,
  offers: "offer",
};

/** Deep link `/discover?type=offer` chọn sẵn đúng tab tương ứng. */
export const apiTypeToFilter: Record<string, DiscoverFilterId> = {
  course: "course",
  event: "events",
  member: "member",
  offer: "offers",
};
