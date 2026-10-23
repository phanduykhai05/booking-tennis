import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { countries } from "@/components/auth/CountryPicker/countries";
import type { Country } from "@/components/auth/CountryPicker/types";
import CountryFlag from "@/components/ui/CountryFlag";
import Touch from "@/components/ui/Pressable";
import { matchesQuery } from "@/lib/format";
import { useEscapeKey } from "@/lib/useEscapeKey";

type CountryPickerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  selectedCode: string;
};

export default function CountryPicker({ isOpen, onClose, onSelect, selectedCode }: CountryPickerProps) {
  useEscapeKey(isOpen, onClose);
  const [query, setQuery] = useState("");

  const filteredCountries = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return countries;

    return countries.filter((country) => matchesQuery(country.name, trimmed) || country.dialCode.includes(trimmed));
  }, [query]);

  return isOpen ? (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[2000] justify-end bg-black/45"
      role="dialog"
    >
      <Touch accessibilityLabel="Đóng" className="flex-1" onPress={onClose} />

      <div className="max-h-[75%] overflow-hidden rounded-t-2xl bg-[#0c703f] pb-3">
        <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-white/40" />

        <div className="flex-row items-center gap-2 px-4 pt-3">
          <div className="h-11 flex-1 flex-row items-center gap-2 rounded-full bg-white/15 px-4">
            <Search color="rgba(255,255,255,0.7)" size={17} strokeWidth={2.5} />
            <input
              autoFocus
              className="min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/60"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm kiếm quốc gia"
              value={query}
            />
          </div>
          <Touch accessibilityLabel="Đóng" className="h-11 w-11 items-center justify-center rounded-full" onPress={onClose}>
            <X color="rgba(255,255,255,0.8)" size={20} strokeWidth={2.5} />
          </Touch>
        </div>

        <div className="mt-2 grow shrink overflow-y-auto overflow-x-hidden px-2">
          <div>
            {filteredCountries.map((item) => (
              <Touch
                className={`flex-row items-center gap-3 rounded-lg px-2.5 py-2.5 ${item.code === selectedCode ? "bg-white/15" : ""}`}
                key={item.code}
                onPress={() => onSelect(item)}
              >
                <CountryFlag code={item.code} size={22} />
                <div className="min-w-0 flex-1">
                  <span className="truncate text-[16px] font-semibold text-white">{item.name}</span>
                  <span className="text-[14px] text-white/65">{item.dialCode}</span>
                </div>
              </Touch>
            ))}
            {filteredCountries.length === 0 ? (
              <span className="px-2.5 py-6 text-center text-[14px] text-white/70">Không tìm thấy quốc gia phù hợp</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
