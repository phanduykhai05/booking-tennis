import type { ReactNode } from "react";

import { useWindowDimensions } from "@/lib/useWindowDimensions";

type MetricGridProps = {
  children: ReactNode[];
  /** Bề rộng tối thiểu mỗi ô; số cột tính từ bề rộng màn hình để thẻ không bị bóp. */
  minItemWidth?: number;
};

/** Lưới co giãn: số cột tính theo bề rộng màn hình, mỗi ô một tỉ lệ bề rộng cố định. */
export default function MetricGrid({ children, minItemWidth = 220 }: MetricGridProps) {
  const { width } = useWindowDimensions();
  const columns = Math.max(1, Math.min(children.length, Math.floor((width - 32) / minItemWidth)));

  return (
    <div className="flex-row flex-wrap" style={{ marginInline: -6 }}>
      {children.map((child, index) => (
        <div key={index} style={{ padding: 6, width: `${100 / columns}%` }}>
          {child}
        </div>
      ))}
    </div>
  );
}
