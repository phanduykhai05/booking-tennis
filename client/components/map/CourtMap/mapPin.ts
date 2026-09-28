import type { CourtMapMarker } from "@/components/map/CourtMap/types";

/** Mặc định trung tâm Hà Nội — nơi tập trung nhiều sân nhất; tìm kiếm có thể bay sang tỉnh khác. */
export const mapCenter = { latitude: 21.0285, longitude: 105.81 };

export const defaultZoom = 12;
export const focusZoom = 15;

export const tileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
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
