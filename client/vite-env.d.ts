interface ImportMetaEnv {
  /** Gốc API NestJS; build production đặt "/api" vì web được phục vụ cùng origin. */
  readonly VITE_API_URL?: string;
  /** Nguồn tile bản đồ, mặc định Esri World Street Map (xem components/map/CourtMap/mapPin.ts). */
  readonly VITE_MAP_TILE_URL?: string;
  readonly VITE_MAP_TILE_ATTRIBUTION?: string;
}
