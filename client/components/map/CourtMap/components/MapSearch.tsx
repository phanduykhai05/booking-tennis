"use client";

import { Search } from "lucide-react";

import HeaderLogo from "@/components/layouts/PublicHeader/components/HeaderLogo";

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
    <form
      className="absolute left-3 right-3 top-3 z-[1001] flex h-12 items-center rounded-full bg-white px-3 shadow-[0_3px_12px_rgba(15,23,42,0.2)]"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <span className="mr-2 scale-[0.56] origin-left"><HeaderLogo brandName={brandName} /></span>
      <label className="sr-only" htmlFor="map-search">{inputLabel}</label>
      <input
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
        id="map-search"
        name="search"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="search"
        value={value}
      />
      <button aria-label={submitLabel} className="flex size-8 items-center justify-center rounded-full text-emerald-700 transition-colors hover:bg-emerald-50" type="submit">
        <Search aria-hidden="true" className="size-5" strokeWidth={2.5} />
      </button>
    </form>
  );
}
