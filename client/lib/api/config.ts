/** Gốc của API NestJS. Đổi bằng biến môi trường khi deploy. */
export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export const sessionStorageKey = "tennishub.session";
