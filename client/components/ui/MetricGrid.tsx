import { View, useWindowDimensions } from "react-native";
import type { ReactNode } from "react";

type MetricGridProps = {
  children: ReactNode[];
  /** Bề rộng tối thiểu mỗi ô; số cột tính từ bề rộng màn hình để thẻ không bị bóp. */
  minItemWidth?: number;
};

/**
 * Lưới co giãn thay cho Row/Col 24 cột của antd: RN không có CSS grid nên tự tính
 * số cột rồi cho mỗi ô một tỉ lệ bề rộng cố định.
 */
export default function MetricGrid({ children, minItemWidth = 220 }: MetricGridProps) {
  const { width } = useWindowDimensions();
  const columns = Math.max(1, Math.min(children.length, Math.floor((width - 32) / minItemWidth)));

  return (
    <View className="flex-row flex-wrap" style={{ marginHorizontal: -6 }}>
      {children.map((child, index) => (
        <View key={index} style={{ paddingHorizontal: 6, paddingVertical: 6, width: `${100 / columns}%` }}>
          {child}
        </View>
      ))}
    </View>
  );
}
