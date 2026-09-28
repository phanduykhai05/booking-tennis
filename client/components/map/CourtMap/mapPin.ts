import type { CourtMapMarker } from "@/components/map/CourtMap/types";

/** Mặc định trung tâm Hà Nội — nơi tập trung nhiều sân nhất; tìm kiếm có thể bay sang tỉnh khác. */
export const mapCenter = { latitude: 21.0285, longitude: 105.81 };

export const defaultZoom = 12;
export const focusZoom = 15;

/**
 * Ảnh nền bản đồ.
 *
 * Không dùng `tile.openstreetmap.org`: máy chủ tile gốc của OSM không tới được từ nhiều
 * mạng, khiến bản đồ chỉ còn ghim trên nền trống (đúng lỗi đang gặp ở production).
 * Cũng không dùng Carto: `basemaps.cartocdn.com` vẫn trả HTTP 200 nhưng nội dung là ảnh
 * "API KEY REQUIRED" — nhìn mã trạng thái thì tưởng chạy được.
 *
 * Esri World Street Map: CDN toàn cầu, không cần API key, nhãn theo tiếng địa phương.
 * Lưu ý thứ tự toạ độ là {z}/{y}/{x}, khác chuẩn {z}/{x}/{y} của các nguồn còn lại.
 *
 * Đổi nhà cung cấp bằng `EXPO_PUBLIC_MAP_TILE_URL` (và `EXPO_PUBLIC_MAP_TILE_ATTRIBUTION`)
 * mà không phải sửa code — nhớ build lại vì biến EXPO_PUBLIC_* nhúng cứng lúc build.
 * Các nguồn không cần key khác đã đo được: `tile.openstreetmap.de/{z}/{x}/{y}.png`,
 * `a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png`.
 */
export const tileUrl =
  process.env.EXPO_PUBLIC_MAP_TILE_URL ??
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";

/** Chỉ dùng khi URL có `{s}`; nguồn không có placeholder này thì Leaflet bỏ qua. */
export const tileSubdomains = "abc";

export const tileAttribution =
  process.env.EXPO_PUBLIC_MAP_TILE_ATTRIBUTION ?? "Tiles © Esri";

export const maxZoom = 19;

export const sportColors: Record<CourtMapMarker["sport"], string> = {
  athletics: "#e11d48",
  badminton: "#0f9b58",
  basketball: "#d97706",
  football: "#16a34a",
  pickleball: "#2563eb",
  swimming: "#0891b2",
  tableTennis: "#db2777",
  taekwondo: "#4f46e5",
  tennis: "#ea580c",
  volleyball: "#7c3aed",
};

export const markerColor = (marker: CourtMapMarker) =>
  marker.isFeatured ? "#e11d48" : sportColors[marker.sport];

/**
 * Ghim bản đồ dạng chuỗi HTML, dùng chung cho bản native (Leaflet trong WebView)
 * và bản web (Leaflet chạy thẳng trên DOM) để hai nền tảng không lệch giao diện.
 */
export const pinHtml = (color: string) =>
  '<span style="display:flex;align-items:center;justify-content:center;width:30px;height:38px;filter:drop-shadow(0 2px 2px rgba(15,23,42,.28))">' +
  '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="38" viewBox="0 0 30 38">' +
  `<path fill="${color}" stroke="#fff" stroke-width="1.4" d="M15 1C7.3 1 1 7.3 1 15c0 10.2 12.2 20.9 13.2 21.7.5.4 1.1.4 1.6 0C16.8 35.9 29 25.2 29 15 29 7.3 22.7 1 15 1Z"/>` +
  '<circle cx="15" cy="14.7" r="8.1" fill="#fff"/>' +
  `<path fill="${color}" d="M10.6 9.3h8.8V11h-8.8zm0 3.2h8.8v1.7h-8.8zm0 3.2h5.6v1.7h-5.6z"/>` +
  "</svg></span>";
