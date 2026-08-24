/** Gốc của API NestJS. Đổi bằng biến môi trường EXPO_PUBLIC_API_URL khi deploy. */
export const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000/api";

export const sessionStorageKey = "tennishub.session";
