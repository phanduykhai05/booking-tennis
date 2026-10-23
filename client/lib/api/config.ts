/** Gốc của API NestJS. Đổi bằng biến môi trường VITE_API_URL khi build (production dùng "/api"). */
export const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export const sessionStorageKey = "tennishub.session";
