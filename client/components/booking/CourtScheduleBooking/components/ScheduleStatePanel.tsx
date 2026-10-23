
import Touch from "@/components/ui/Pressable";

type ScheduleStatePanelProps = {
  actionLabel?: string;
  message: string;
  onAction?: () => void;
};

export default function ScheduleStatePanel({ actionLabel, message, onAction }: ScheduleStatePanelProps) {
  return (
    <div className="min-h-[220px] items-center justify-center gap-3 border-y border-[#cfe6d8] bg-white px-6">
      <span className="text-center text-[14px] text-[#124a31]">{message}</span>
      {actionLabel && onAction ? (
        <Touch className="h-9 justify-center rounded-md border border-[#008447] px-4" onPress={onAction}>
          <span className="text-[14px] font-semibold text-[#008447]">{actionLabel}</span>
        </Touch>
      ) : null}
    </div>
  );
}
