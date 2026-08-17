"use client";

import { Search, X } from "lucide-react";
import type { StaticImageData } from "next/image";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

import images from "@/components/assets/images";
import styles from "@/components/auth/CountryPicker/CountryPicker.module.scss";
import { countries } from "@/components/auth/CountryPicker/countries";
import type { Country } from "@/components/auth/CountryPicker/types";

type CountryPickerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  selectedCode: string;
};

const flagsByCode = images.flags as Record<string, StaticImageData>;

export default function CountryPicker({ isOpen, onClose, onSelect, selectedCode }: CountryPickerProps) {
  const [query, setQuery] = useState("");

  const filteredCountries = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi-VN");
    if (!normalizedQuery) return countries;
    return countries.filter(
      (country) => country.name.toLocaleLowerCase("vi-VN").includes(normalizedQuery) || country.dialCode.includes(normalizedQuery),
    );
  }, [query]);

  if (!isOpen) return null;

  return createPortal(
    <div aria-label="Chọn quốc gia" aria-modal="true" className="fixed inset-0 z-50" role="dialog">
      <button aria-label="Đóng" className={`absolute inset-0 bg-black/45 ${styles.backdropEnter}`} onClick={onClose} type="button" />
      <div
        className={`absolute inset-x-0 bottom-0 flex max-h-[75vh] flex-col rounded-t-2xl bg-[linear-gradient(180deg,#1c8a52_0%,#0c703f_100%)] pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-12px_30px_rgba(0,0,0,0.3)] ${styles.sheetEnter}`}
      >
        <span aria-hidden="true" className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-white/40" />
        <div className="flex shrink-0 items-center gap-2 px-4 pt-3">
          <label className="flex h-11 flex-1 items-center gap-2 rounded-full bg-white/15 px-4 ring-1 ring-white/25 focus-within:ring-white/50">
            <Search aria-hidden="true" className="text-white/70" size={17} strokeWidth={2.5} />
            <input
              autoFocus
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/60"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm kiếm quốc gia"
              type="search"
              value={query}
            />
          </label>
          <button
            aria-label="Đóng"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={20} strokeWidth={2.5} />
          </button>
        </div>
        <ul className="mt-2 flex-1 overflow-y-auto px-2 pb-2">
          {filteredCountries.map((country) => (
            <li key={country.code}>
              <button
                aria-pressed={country.code === selectedCode}
                className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition hover:bg-white/10 ${country.code === selectedCode ? "bg-white/15" : ""}`}
                onClick={() => onSelect(country)}
                type="button"
              >
                <span className="h-6 w-6 shrink-0 overflow-hidden rounded-full ring-1 ring-white/30">
                  <img alt="" className="h-full w-full object-cover" src={flagsByCode[country.code].src} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[16px] font-semibold text-white">{country.name}</span>
                  <span className="block text-[14px] text-white/65">{country.dialCode}</span>
                </span>
              </button>
            </li>
          ))}
          {filteredCountries.length === 0 && <li className="px-2.5 py-6 text-center text-sm text-white/70">Không tìm thấy quốc gia phù hợp</li>}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
