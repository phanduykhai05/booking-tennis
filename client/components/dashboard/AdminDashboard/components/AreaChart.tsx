"use client";

import { Tooltip } from "antd";

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

const accentStyles: Record<AreaChartAccent, { dot: string; gradientId: string; stroke: string }> = {
  emerald: { dot: "bg-emerald-500", gradientId: "area-chart-emerald", stroke: "#10b981" },
  violet: { dot: "bg-violet-500", gradientId: "area-chart-violet", stroke: "#8b5cf6" },
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
  const maximum = Math.max(...data.map((item) => item.value), 1);
  const points = toPoints(data, maximum);
  const linePath = toSmoothPath(points);
  const areaPath = linePath ? `${linePath} L ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT} L 0 ${VIEWBOX_HEIGHT} Z` : "";
  const styles = accentStyles[accent];

  return (
    <div className="relative h-[240px] w-full">
      {/* preserveAspectRatio none + non-scaling-stroke: vùng tô co giãn theo bề ngang
          mà nét vẽ vẫn giữ đúng độ dày. */}
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
        <defs>
          <linearGradient id={styles.gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={styles.stroke} stopOpacity="0.28" />
            <stop offset="100%" stopColor={styles.stroke} stopOpacity="0" />
          </linearGradient>
        </defs>

        {Array.from({ length: GRID_LINES + 1 }, (_, index) => {
          const y = PADDING_TOP + ((VIEWBOX_HEIGHT - PADDING_TOP - PADDING_BOTTOM) / GRID_LINES) * index;
          return <line key={index} stroke="#e2e8f0" strokeDasharray="4 6" strokeWidth="1" vectorEffect="non-scaling-stroke" x1="0" x2={VIEWBOX_WIDTH} y1={y} y2={y} />;
        })}

        <path d={areaPath} fill={`url(#${styles.gradientId})`} />
        <path d={linePath} fill="none" stroke={styles.stroke} strokeLinecap="round" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Chấm và nhãn dựng bằng HTML định vị theo phần trăm nên không bị kéo méo như SVG. */}
      {points.map((point, index) => (
        <Tooltip key={data[index].label} title={`${data[index].label}: ${formatValue(data[index].value)}`}>
          <button
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 focus-visible:outline-none"
            style={{ left: `${point.percentLeft}%`, top: `${point.percentTop}%` }}
            type="button"
          >
            <span className={`block size-2.5 rounded-full ring-2 ring-white transition-transform hover:scale-150 ${styles.dot}`} />
          </button>
        </Tooltip>
      ))}

      <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10px] text-slate-400 sm:text-xs">
        {data.map((item) => <span key={item.label}>{item.label}</span>)}
      </div>
    </div>
  );
}
