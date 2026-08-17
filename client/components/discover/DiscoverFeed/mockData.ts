import type { DiscoverFilter, DiscoverPost } from "@/components/discover/DiscoverFeed/types";

export const discoverContent = { all: "Tất cả", contact: "Liên hệ ngay", courseTitle: "Huấn luyện viên chuyên nghiệp tại sân", discover: "KHÁM PHÁ", emptyCourtTitle: "Sân trống trong hôm nay", memberPackage: "Gói hội viên", more: "Xem thêm (2)", title: "Khám phá" };
export const discoverFilters: DiscoverFilter[] = [{ id: "all", label: "Tất cả" }, { id: "member", label: "Gói hội viên" }, { id: "course", label: "Khóa học" }, { id: "notifications", label: "Thông báo" }, { id: "offers", label: "Ưu đãi" }, { id: "events", label: "Sự kiện" }];
export const discoverPosts: DiscoverPost[] = [
  { date: "14:42 • 29/06/2026", id: "course", labels: ["#thongbaokhoahoc", "#academy"], type: "course", venue: "Sân Cầu Lông H3" },
  { date: "10:43 • 07/07/2026", id: "member", labels: ["#uudaigohoivien"], type: "member", venue: "Piko House" },
  { date: "12:55 • 17/08/2026", id: "offer", labels: ["#uudaosantrong"], type: "offer", venue: "SixtyNine Pickleball" },
  { date: "08:25 • 17/08/2026", id: "event", labels: ["#sukiensocial"], type: "event", venue: "Balanca Pickleball Club Hội An" },
];
