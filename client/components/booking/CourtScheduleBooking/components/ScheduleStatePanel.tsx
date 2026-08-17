type ScheduleStatePanelProps = {
  actionLabel?: string;
  message: string;
  onAction?: () => void;
};

export default function ScheduleStatePanel({ actionLabel, message, onAction }: ScheduleStatePanelProps) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 border-y border-[#cfe6d8] bg-white px-6 text-center">
      <p className="text-[14px] text-[#124a31]">{message}</p>
      {actionLabel && onAction && (
        <button className="h-9 rounded-md border border-[#008447] px-4 text-[14px] font-semibold text-[#008447]" onClick={onAction} type="button">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
