import { CircleUserRound, MessageSquare } from "lucide-react";

type SupportActionsProps = {
  fanpageLabel: string;
  zaloLabel: string;
};

export default function SupportActions({ fanpageLabel, zaloLabel }: SupportActionsProps) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-3">
      <button className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#2994eb] text-sm font-semibold text-white transition hover:bg-[#1685dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80" type="button">
        <CircleUserRound aria-hidden="true" fill="currentColor" size={20} />
        {fanpageLabel}
      </button>
      <button className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#1fc499] text-sm font-semibold text-white transition hover:bg-[#16ae86] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80" type="button">
        <MessageSquare aria-hidden="true" fill="currentColor" size={20} />
        {zaloLabel}
      </button>
    </div>
  );
}
