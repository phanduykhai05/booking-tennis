import { nearbyFilters, nearbyFiltersLabel } from "@/components/home/NearbyFilters/mockData";

export default function NearbyFilters() {
  return (
    <nav aria-label={nearbyFiltersLabel} className="overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <ul className="flex w-max min-w-full items-center gap-2.5 px-3 pb-1 pt-4 sm:px-4">
        {nearbyFilters.map((filter) => (
          <li key={filter.id}>
            <button
              className="h-9 whitespace-nowrap rounded-[10px] bg-white px-4 text-sm font-medium text-slate-600 shadow-[0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.05] transition-all duration-200 hover:text-slate-900 hover:shadow-[0_4px_10px_-4px_rgba(15,23,42,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f9b58]/45 active:scale-[0.97]"
              type="button"
            >
              {filter.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
