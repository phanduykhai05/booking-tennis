import { Ticket } from "lucide-react";
import Link from "next/link";

import { starsHeaderMockData } from "@/components/layouts/StarsHeader/mockData";

export default function MyTicketsLink() {
  return (
    <Link
      className="hidden h-10 items-center gap-2 rounded-lg px-3 transition-colors hover:bg-white/10 md:flex"
      href={starsHeaderMockData.myTicketsHref}
    >
      <Ticket aria-hidden="true" className="size-5 text-white" />
      <span className="text-sm font-medium text-white">{starsHeaderMockData.myTicketsLabel}</span>
    </Link>
  );
}
