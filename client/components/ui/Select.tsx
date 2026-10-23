import { Check, ChevronDown } from "lucide-react";
import { useCallback, useState } from "react";

import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";
import { useEscapeKey } from "@/lib/useEscapeKey";

export type SelectOption<T extends string> = { label: string; value: T };

type SelectProps<T extends string> = {
  accessibilityLabel: string;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  size?: "large" | "medium" | "small";
  value: T;
  width?: number;
};

/** Dropdown: nút hiện nhãn đang chọn, chạm mở danh sách nổi giữa màn hình. */
export default function Select<T extends string>({
  accessibilityLabel,
  onChange,
  options,
  size = "medium",
  value,
  width,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const active = options.find((option) => option.value === value);
  const close = useCallback(() => setIsOpen(false), []);
  useEscapeKey(isOpen, close);

  return (
    <>
      <Touch
        accessibilityLabel={accessibilityLabel}
        className={`flex-row items-center justify-between gap-2 rounded-md border border-[#d6d6d6] bg-white px-3 ${size === "large" ? "h-12" : size === "small" ? "h-9" : "h-11"}`}
        onPress={() => setIsOpen(true)}
        style={width ? { width } : undefined}
      >
        <span className="flex-1 truncate text-[14px] text-[#25352f]">{active?.label ?? ""}</span>
        <ChevronDown color="#64748b" size={16} />
      </Touch>

      {isOpen ? (
        <div aria-label={accessibilityLabel} aria-modal="true" className="fixed inset-0 z-[2000] justify-center bg-black/40 px-6" role="dialog">
          <Touch accessibilityLabel="Đóng danh sách" className="absolute inset-0" onPress={() => setIsOpen(false)} />
          <div className="mx-auto max-h-[60%] w-full max-w-[420px] overflow-hidden rounded-xl bg-white" style={shadow.raised}>
            <span className="border-b border-[#eef0ef] px-4 py-3 text-[15px] font-bold text-[#0b5133]">{accessibilityLabel}</span>
            <div className="shrink overflow-y-auto" role="listbox">
              {options.map((item) => (
                <Touch
                  aria-selected={item.value === value}
                  className={`flex-row items-center gap-2 px-4 py-3 ${item.value === value ? "bg-[#f1fbf5]" : ""}`}
                  key={item.value}
                  onPress={() => {
                    onChange(item.value);
                    setIsOpen(false);
                  }}
                  role="option"
                >
                  <span className="flex-1 text-[15px] text-[#25352f]">{item.label}</span>
                  {item.value === value ? <Check color="#008447" size={17} /> : null}
                </Touch>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
