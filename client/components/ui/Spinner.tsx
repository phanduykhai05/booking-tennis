type SpinnerProps = { color?: string; size?: "large" | "small" };

/** Vòng xoay chờ, thay cho ActivityIndicator. */
export default function Spinner({ color = "#0f9b58", size = "small" }: SpinnerProps) {
  const px = size === "large" ? 36 : 20;

  return (
    <span
      aria-label="Đang tải"
      className="inline-block shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
      role="status"
      style={{ color, height: px, width: px }}
    />
  );
}
