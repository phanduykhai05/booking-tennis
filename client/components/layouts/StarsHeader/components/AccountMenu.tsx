import { ChevronDown } from "lucide-react";

import { starsHeaderMockData } from "@/components/layouts/StarsHeader/mockData";

export default function AccountMenu() {
  const { account } = starsHeaderMockData;

  return (
    <button
      aria-label={account.label}
      className="flex h-8 items-center gap-2 rounded-lg px-2 transition-colors hover:bg-white/10 md:h-10 md:px-4"
      type="button"
    >
      <span
        aria-hidden="true"
        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#4a4a52] text-xs font-semibold text-white md:size-5"
      >
        {account.initial}
      </span>
      <span className="hidden text-sm font-medium text-white md:inline">{account.label}</span>
      <ChevronDown aria-hidden="true" className="hidden size-4 text-white md:block" />
    </button>
  );
}
