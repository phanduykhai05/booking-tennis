import type { CourtMapContent, CourtMapFilter, CourtMapMarker } from "@/components/map/CourtMap/types";

export const courtMapContent: CourtMapContent = {
  currentLocationLabel: "Vị trí hiện tại",
  geolocationUnavailableMessage: "Không thể lấy vị trí. Hãy cho phép quyền vị trí trên trình duyệt rồi thử lại.",
  layersLabel: "Lớp bản đồ",
  mapAttribution: "© OpenStreetMap contributors · Vị trí sân dùng mock data",
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

const markerCoordinates: Array<[number, number]> = [
  [8, 53], [13, 37], [18, 65], [22, 48], [26, 72], [29, 31], [33, 56], [36, 43],
  [39, 63], [42, 51], [45, 28], [47, 73], [49, 44], [52, 61], [54, 35], [56, 52],
  [58, 69], [61, 40], [63, 57], [65, 31], [67, 75], [69, 48], [71, 63], [73, 37],
  [75, 55], [77, 29], [79, 70], [81, 45], [83, 59], [85, 35], [87, 51], [89, 66],
  [91, 41], [93, 57], [95, 31], [97, 71], [12, 78], [16, 58], [20, 45], [24, 67],
  [28, 52], [32, 74], [35, 34], [38, 59], [41, 47], [44, 66], [48, 38], [51, 55],
  [55, 73], [59, 46], [62, 64], [66, 42], [70, 58], [74, 35], [78, 69], [82, 49],
  [86, 61], [90, 38], [94, 54], [98, 46], [6, 63], [10, 43], [15, 70], [19, 34],
];

const sports = ["pickleball", "badminton", "football", "basketball", "tennis"] as const;

export const courtMapMarkers: CourtMapMarker[] = markerCoordinates.map(([latitude, longitude], index) => ({
  id: `court-marker-${index + 1}`,
  isFeatured: index % 17 === 0,
  latitude: 10.662 + (latitude * 0.002),
  longitude: 106.635 + (longitude * 0.0018),
  sport: sports[index % sports.length],
}));
