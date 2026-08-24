import { useState } from "react";
import { Text, View } from "react-native";
import Svg, { Defs, Line, LinearGradient, Path, Stop } from "react-native-svg";

import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

export type AreaChartAccent = "emerald" | "violet";

type AreaChartDatum = {
  label: string;
  value: number;
};

type AreaChartProps = {
  accent?: AreaChartAccent;
  data: AreaChartDatum[];
  formatValue: (value: number) => string;
};

const VIEWBOX_WIDTH = 720;
const VIEWBOX_HEIGHT = 240;
const PADDING_TOP = 24;
const PADDING_BOTTOM = 28;
const GRID_LINES = 4;

const accentStyles: Record<AreaChartAccent, { gradientId: string; stroke: string }> = {
  emerald: { gradientId: "area-chart-emerald", stroke: "#10b981" },
  violet: { gradientId: "area-chart-violet", stroke: "#8b5cf6" },
};

type Point = { percentLeft: number; percentTop: number; x: number; y: number };

function toPoints(data: AreaChartDatum[], maximum: number): Point[] {
  const usableHeight = VIEWBOX_HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const lastIndex = Math.max(data.length - 1, 1);

  return data.map((item, index) => {
    const x = (index / lastIndex) * VIEWBOX_WIDTH;
    const y = PADDING_TOP + usableHeight - (item.value / maximum) * usableHeight;
    return { percentLeft: (x / VIEWBOX_WIDTH) * 100, percentTop: (y / VIEWBOX_HEIGHT) * 100, x, y };
  });
}

// Bezier với điểm điều khiển ở giữa hai mốc: đường cong mượt mà không vọt quá giá trị thật.
function toSmoothPath(points: Point[]) {
  if (points.length === 0) return "";

  return points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const previous = points[index - 1];
    const controlX = (previous.x + point.x) / 2;
    return `${path} C ${controlX} ${previous.y} ${controlX} ${point.y} ${point.x} ${point.y}`;
  }, "");
}

export default function AreaChart({ accent = "emerald", data, formatValue }: AreaChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const maximum = Math.max(...data.map((item) => item.value), 1);
  const points = toPoints(data, maximum);
  const linePath = toSmoothPath(points);
  const areaPath = linePath ? `${linePath} L ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT} L 0 ${VIEWBOX_HEIGHT} Z` : "";
  const styles = accentStyles[accent];

  return (
    <View className="h-[240px] w-full">
      {/* preserveAspectRatio none: vùng tô co giãn theo bề ngang, nét vẽ vẫn giữ độ dày nhờ vectorEffect. */}
      <Svg
        height="100%"
        preserveAspectRatio="none"
        style={{ bottom: 0, left: 0, position: "absolute", right: 0, top: 0 }}
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        width="100%"
      >
        <Defs>
          <LinearGradient id={styles.gradientId} x1="0" x2="0" y1="0" y2="1">
            <Stop offset="0%" stopColor={styles.stroke} stopOpacity="0.28" />
            <Stop offset="100%" stopColor={styles.stroke} stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {Array.from({ length: GRID_LINES + 1 }, (_, index) => {
          const y = PADDING_TOP + ((VIEWBOX_HEIGHT - PADDING_TOP - PADDING_BOTTOM) / GRID_LINES) * index;

          return (
            <Line
              key={index}
              stroke="#e2e8f0"
              strokeDasharray="4 6"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="0"
              x2={VIEWBOX_WIDTH}
              y1={y}
              y2={y}
            />
          );
        })}

        <Path d={areaPath} fill={`url(#${styles.gradientId})`} />
        <Path
          d={linePath}
          fill="none"
          stroke={styles.stroke}
          strokeLinecap="round"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </Svg>

      {/* Chấm và nhãn dựng bằng View định vị theo phần trăm nên không bị kéo méo như SVG. */}
      {points.map((point, index) => (
        <Touch
          accessibilityLabel={`${data[index].label}: ${formatValue(data[index].value)}`}
          className="absolute p-2"
          key={data[index].label}
          onPress={() => setActiveIndex((current) => (current === index ? null : index))}
          style={{ left: `${point.percentLeft}%`, marginLeft: -14, marginTop: -14, top: `${point.percentTop}%` }}
        >
          <View
            className="h-2.5 w-2.5 rounded-full border-2 border-white"
            style={{ backgroundColor: styles.stroke }}
          />
        </Touch>
      ))}

      {activeIndex !== null ? (
        <View
          className="absolute rounded-md bg-slate-900 px-2 py-1"
          style={[
            { left: `${points[activeIndex].percentLeft}%`, marginLeft: -50, top: `${points[activeIndex].percentTop}%`, marginTop: -38 },
            shadow.card,
          ]}
        >
          <Text className="text-center text-[11px] text-white">
            {data[activeIndex].label}: {formatValue(data[activeIndex].value)}
          </Text>
        </View>
      ) : null}

      <View className="absolute inset-x-0 bottom-0 flex-row justify-between">
        {data.map((item) => (
          <Text className="text-[11px] text-slate-400" key={item.label}>
            {item.label}
          </Text>
        ))}
      </View>
    </View>
  );
}
