import Link from "next/link";

import { starsHeaderMockData } from "@/components/layouts/StarsHeader/mockData";

export default function StarsHeaderLogo() {
  return (
    <Link
      aria-label={starsHeaderMockData.logoLabel}
      className="shrink-0 text-2xl font-semibold leading-none tracking-[-1.6px] text-white sm:text-[32px] sm:tracking-[-2.2px]"
      href={starsHeaderMockData.homeHref}
    >
      {starsHeaderMockData.logoLabel}
    </Link>
  );
}
