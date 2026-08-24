/**
 * Định dạng số theo kiểu Việt Nam (dấu chấm ngăn nghìn). Tự viết thay vì dùng
 * Intl.NumberFormat vì Hermes trên Android có thể thiếu dữ liệu locale.
 */
export function formatNumber(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  return sign + Math.abs(rounded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatCurrency(value: number): string {
  return `${formatNumber(value)} ₫`;
}

/** 930 -> "15:30". */
export function formatMinutes(minute: number): string {
  const hours = Math.floor(minute / 60);
  const minutes = minute % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

/** Bỏ dấu tiếng Việt để "cau giay" khớp "Cầu Giấy". */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

/** So khớp không dấu, không phân biệt hoa thường. */
export function matchesQuery(value: string, query: string): boolean {
  return normalizeText(value).includes(normalizeText(query));
}
