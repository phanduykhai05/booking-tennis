import { CalendarDays } from "lucide-react";

export type DateFieldProps = {
  accessibilityLabel: string;
  displayValue: string;
  onChange: (date: string) => void;
  tone?: "light" | "solid";
  value: string;
};

/**
 * Input date của trình duyệt phủ trong suốt lên pill để giữ nguyên giao diện mà vẫn mở được
 * lịch hệ thống; giá trị trao đổi luôn ở dạng "YYYY-MM-DD".
 */
export default function DateField({ accessibilityLabel, displayValue, onChange, tone = "solid", value }: DateFieldProps) {
  return (
    <div
      className={`h-9 flex-row items-center gap-2 rounded-md px-3 ${tone === "solid" ? "bg-[#4a9d7f]" : "border border-slate-200 bg-white"}`}
    >
      <span className={`text-[14px] font-semibold ${tone === "solid" ? "text-white" : "text-slate-700"}`}>{displayValue}</span>
      <CalendarDays color={tone === "solid" ? "#ffffff" : "#0f9b58"} size={17} />
      <input
        aria-label={accessibilityLabel}
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={(event) => event.target.value && onChange(event.target.value)}
        type="date"
        value={value}
      />
    </div>
  );
}
