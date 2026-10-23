import { Search, X } from "lucide-react";

import Touch from "@/components/ui/Pressable";

type SearchFieldProps = {
  accessibilityLabel: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
  width?: number;
};

export default function SearchField({ accessibilityLabel, onChange, placeholder, value, width }: SearchFieldProps) {
  return (
    <div
      className="h-11 flex-row items-center gap-2 rounded-md border border-slate-200 bg-white px-3"
      style={width ? { width } : { flex: 1, minWidth: 200 }}
    >
      <Search color="#94a3b8" size={17} />
      <input
        aria-label={accessibilityLabel}
        className="min-w-0 flex-1 bg-transparent text-[14px] text-slate-800 outline-none placeholder:text-[#94a3b8]"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="search"
        value={value}
      />
      {value ? (
        <Touch accessibilityLabel="Xoá từ khoá" onPress={() => onChange("")}>
          <X color="#94a3b8" size={16} />
        </Touch>
      ) : null}
    </div>
  );
}
