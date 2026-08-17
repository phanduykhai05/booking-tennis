"use client";

import { ChevronDown } from "lucide-react";
import type { StaticImageData } from "next/image";
import { useState } from "react";

import images from "@/components/assets/images";
import CountryPicker from "@/components/auth/CountryPicker";
import { defaultCountry } from "@/components/auth/CountryPicker/countries";
import type { Country } from "@/components/auth/CountryPicker/types";

type PhoneFieldProps = {
  label: string;
  onChange: (value: string) => void;
  value: string;
};

const flagsByCode = images.flags as Record<string, StaticImageData>;

export default function PhoneField({ label, onChange, value }: PhoneFieldProps) {
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [isPickerOpen, setPickerOpen] = useState(false);

  return (
    <label className="block">
      <span className="mb-2.5 block text-[16px] font-bold text-[#034f30]">{label}</span>
      <span className="flex h-12 overflow-hidden rounded-md border border-[#d6d6d6] bg-white focus-within:border-[#087b49] focus-within:ring-2 focus-within:ring-[#087b49]/15">
        <button
          aria-label={`Chọn quốc gia, hiện tại ${country.name}`}
          className="flex shrink-0 items-center gap-2 border-r border-[#e1e1e1] px-3 text-xs text-[#064c31] transition hover:bg-[#f5f7f6]"
          onClick={() => setPickerOpen(true)}
          type="button"
        >
          <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center overflow-hidden rounded-full">
            <img alt="" className="h-full w-full object-cover" src={flagsByCode[country.code].src} />
          </span>
          {country.dialCode}
          <ChevronDown aria-hidden="true" size={13} strokeWidth={2.5} />
        </button>
        <input
          autoComplete="tel-national"
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#25352f] outline-none placeholder:text-[#777]"
          inputMode="tel"
          onChange={(event) => onChange(event.target.value)}
          placeholder="Nhập số điện thoại"
          type="tel"
          value={value}
        />
      </span>
      <CountryPicker
        isOpen={isPickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(selected) => {
          setCountry(selected);
          setPickerOpen(false);
        }}
        selectedCode={country.code}
      />
    </label>
  );
}
