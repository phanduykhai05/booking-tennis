import type { ReactNode } from "react";

type ScreenProps = {
  backgroundColor: string;
  children: ReactNode;
  /** Cạnh nào cần chừa vùng an toàn; mặc định chỉ chừa phía trên vì đáy đã có thanh điều hướng riêng. */
  edges?: ("bottom" | "left" | "right" | "top")[];
  statusBarStyle?: "dark" | "light";
};

/** Khung màn hình: nền phủ kín, chừa tai thỏ bằng env(safe-area-inset-*) khi chạy như PWA. */
export default function Screen({ backgroundColor, children, edges = ["top"] }: ScreenProps) {
  const inset = (edge: "bottom" | "left" | "right" | "top") => (edges.includes(edge) ? `env(safe-area-inset-${edge})` : undefined);

  return (
    <div
      className="flex-1"
      style={{
        backgroundColor,
        paddingBottom: inset("bottom"),
        paddingLeft: inset("left"),
        paddingRight: inset("right"),
        paddingTop: inset("top"),
      }}
    >
      {children}
    </div>
  );
}
