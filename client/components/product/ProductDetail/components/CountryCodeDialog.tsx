"use client";

import { Search } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

import images from "@/components/assets/images";
import { countries } from "@/components/auth/CountryPicker/countries";
import type { Country } from "@/components/auth/CountryPicker/types";

type CountryCodeDialogProps = {
  onClose: () => void;
  onSelect: (country: Country) => void;
};

const flagsByCode = images.flags as Record<string, StaticImageData>;

export default function CountryCodeDialog({ onClose, onSelect }: CountryCodeDialogProps) {
  const [query, setQuery] = useState("");
  const matchingCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi-VN");
    if (!normalizedQuery) return countries;
    return countries.filter((country) => country.name.toLocaleLowerCase("vi-VN").includes(normalizedQuery) || country.dialCode.includes(normalizedQuery));
  }, [query]);

  return createPortal(
    <div aria-label="Chọn mã quốc gia" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-6" onMouseDown={onClose} role="dialog">
      <section className="flex h-[55dvh] w-full max-w-[325px] flex-col overflow-hidden rounded-[11px] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.25)]" onMouseDown={(event) => event.stopPropagation()}>
        <div className="border-b border-[#eef0ef] px-3 py-3">
          <label className="flex h-9 items-center gap-2 rounded-[9px] border border-[#d9dedc] px-3 focus-within:border-[#008447]">
            <Search aria-hidden="true" className="text-[#26342f]" size={17} />
            <input autoFocus className="min-w-0 flex-1 text-[14px] text-[#26342f] outline-none placeholder:text-[#9a9f9d]" onChange={(event) => setQuery(event.target.value)} placeholder="Tìm kiếm quốc gia..." type="search" value={query} />
          </label>
        </div>
        <ul className="min-h-0 flex-1 overflow-y-auto pb-1">
          {matchingCountries.map((country) => (
            <li key={country.code}>
              <button className="flex h-[50px] w-full items-center gap-3 px-3 text-left transition hover:bg-[#f4f7f6]" onClick={() => onSelect(country)} type="button">
                <Image alt="" className="h-4 w-6 object-cover" height={16} src={flagsByCode[country.code]} width={24} />
                <span className="flex-1 text-[14px] text-[#27342e]">{country.name}</span>
                <span className="text-[13px] text-[#60706a]">{country.dialCode}</span>
              </button>
            </li>
          ))}
          {matchingCountries.length === 0 && <li className="px-3 py-8 text-center text-[14px] text-[#7c8581]">Không tìm thấy quốc gia phù hợp</li>}
        </ul>
      </section>
    </div>,
    document.body,
  );
}
