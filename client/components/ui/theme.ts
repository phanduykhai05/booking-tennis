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

/** Đổ bóng dùng lại được: RN cần shadow* trên iOS và elevation trên Android. */
export const shadow = {
  card: {
    elevation: 2,
    shadowColor: "#0f172a",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  raised: {
    elevation: 6,
    shadowColor: "#0f172a",
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
  },
  sheet: {
    elevation: 14,
    shadowColor: "#002416",
    shadowOffset: { height: -8, width: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
  },
} as const;
