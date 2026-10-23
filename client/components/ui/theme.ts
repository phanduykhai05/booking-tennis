/** Bảng màu dùng chung, gom một chỗ để component không lặp lại mã hex. */
export const colors = {
  brand: "#0f9b58",
  brandDark: "#087640",
  brandDeep: "#005b36",
  brandInk: "#0b5133",
  accent: "#e7af1c",
  danger: "#e0574f",
  slate: "#64748b",
  border: "#e2e8f0",
  surface: "#ffffff",
  canvas: "#f5f7f9",
};

/** Đổ bóng dùng lại được, truyền thẳng vào prop `style`. */
export const shadow = {
  card: { boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)" },
  raised: { boxShadow: "0 6px 14px rgba(15, 23, 42, 0.16)" },
  sheet: { boxShadow: "0 -8px 20px rgba(0, 36, 22, 0.22)" },
} as const;
