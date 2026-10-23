
type ProgressBarProps = {
  color?: string;
  height?: number;
  percent: number;
  showValue?: boolean;
};

export default function ProgressBar({ color = "#0f9b58", height = 6, percent, showValue = true }: ProgressBarProps) {
  const safePercent = Math.max(0, Math.min(100, Math.round(percent)));

  return (
    <div className="flex-row items-center gap-2">
      <div className="flex-1 overflow-hidden rounded-full bg-slate-100" style={{ height }}>
        <div style={{ backgroundColor: color, height, width: `${safePercent}%` }} />
      </div>
      {showValue ? <span className="text-[11px] text-slate-500">{safePercent}%</span> : null}
    </div>
  );
}
