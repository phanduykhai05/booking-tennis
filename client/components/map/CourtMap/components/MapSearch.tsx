import { Search } from "lucide-react";

import HeaderLogo from "@/components/layouts/PublicHeader/components/HeaderLogo";

type MapSearchProps = {
  brandName: string;
  inputLabel: string;
  placeholder: string;
  submitLabel: string;
};

export default function MapSearch({ brandName, inputLabel, placeholder, submitLabel }: MapSearchProps) {
  return (
    <form action="/map" className="absolute left-3 right-3 top-3 z-[1001] flex h-12 items-center rounded-full bg-white px-3 shadow-[0_3px_12px_rgba(15,23,42,0.2)]">
      <span className="mr-2 scale-[0.56] origin-left"><HeaderLogo brandName={brandName} /></span>
      <label className="sr-only" htmlFor="map-search">{inputLabel}</label>
      <input className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" id="map-search" name="search" placeholder={placeholder} type="search" />
      <button aria-label={submitLabel} className="flex size-8 items-center justify-center rounded-full text-emerald-700 transition-colors hover:bg-emerald-50" type="submit">
        <Search aria-hidden="true" className="size-5" strokeWidth={2.5} />
      </button>
    </form>
  );
}
