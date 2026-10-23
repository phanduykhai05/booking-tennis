import { Search } from "lucide-react";

import HeaderLogo from "@/components/layouts/PublicHeader/components/HeaderLogo";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type MapSearchProps = {
  brandName: string;
  inputLabel: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
  submitLabel: string;
  value: string;
};

export default function MapSearch({ brandName, inputLabel, onChange, onSubmit, placeholder, submitLabel, value }: MapSearchProps) {
  return (
    <div className="absolute left-3 right-3 top-3 h-12 flex-row items-center rounded-full bg-white px-3" style={shadow.raised}>
      <div className="mr-2">
        <HeaderLogo brandName={brandName} size={28} />
      </div>
      <input
        aria-label={inputLabel}
        className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-[#94a3b8]"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSubmit();
        }}
        placeholder={placeholder}
        value={value}
      />
      <Touch accessibilityLabel={submitLabel} className="h-8 w-8 items-center justify-center rounded-full" onPress={onSubmit}>
        <Search color="#047857" size={20} strokeWidth={2.5} />
      </Touch>
    </div>
  );
}
