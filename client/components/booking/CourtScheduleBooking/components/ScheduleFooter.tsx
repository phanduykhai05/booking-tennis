"use client";

import { CircleAlert, CircleCheck } from "lucide-react";

import type { CourtScheduleContent } from "@/components/booking/CourtScheduleBooking/types";
import { formatCurrency } from "@/components/booking/CourtScheduleBooking/utils";

type ScheduleFooterProps = {
  content: CourtScheduleContent;
  errorMessage: string;
  onNext: () => void;
  selectedCount: number;
  successMessage: string;
  total: number;
};

export default function ScheduleFooter({ content, errorMessage, onNext, selectedCount, successMessage, total }: ScheduleFooterProps) {
  return (
    <footer className="px-4 pb-4">
      {errorMessage && (
        <p className="mb-2 flex items-center gap-1.5 rounded-md bg-[#fdecec] px-3 py-2 text-[13px] font-medium text-[#b3261e]" role="alert">
          <CircleAlert aria-hidden="true" size={16} />
          {errorMessage}
        </p>
      )}

      {successMessage && (
        <p className="mb-2 flex items-center gap-1.5 rounded-md bg-[#e6f8ee] px-3 py-2 text-[13px] font-medium text-[#0b5133]" role="status">
          <CircleCheck aria-hidden="true" size={16} />
          {successMessage}
        </p>
      )}

      <div className="mb-2 flex items-center justify-between text-[13px] text-[#124a31]">
        <span>{selectedCount === 0 ? content.emptySelection : `${selectedCount} ${content.selectedSummary}`}</span>
        {selectedCount > 0 && (
          <span className="font-semibold">{content.totalLabel} <b className="text-[15px] text-[#c0392b]">{formatCurrency(total)}</b></span>
        )}
      </div>

      <button
        className="h-12 w-full rounded-md bg-[#e3b32a] text-[17px] font-bold uppercase text-white transition-colors hover:bg-[#d1a41f] disabled:bg-[#e2e5e3] disabled:text-[#a2aaa5]"
        disabled={selectedCount === 0}
        onClick={onNext}
        type="button"
      >
        {content.nextLabel}
      </button>
    </footer>
  );
}
