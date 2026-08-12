import type { Metadata } from "next";

import StarsHeader from "@/components/layouts/StarsHeader";

export const metadata: Metadata = {
  title: "Ticketbox Stars",
};

export default function StarsPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <StarsHeader />
    </div>
  );
}
