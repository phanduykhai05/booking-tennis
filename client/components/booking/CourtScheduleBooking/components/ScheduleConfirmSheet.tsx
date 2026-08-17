"use client";

import { CalendarDays, Clock } from "lucide-react";

import ScheduleSheet from "@/components/booking/CourtScheduleBooking/components/ScheduleSheet";
import type { CourtScheduleContent, SelectedSlot } from "@/components/booking/CourtScheduleBooking/types";
import { formatCurrency, formatDateLabel, formatMinutes } from "@/components/booking/CourtScheduleBooking/utils";

type ScheduleConfirmSheetProps = {
  content: CourtScheduleContent;
  date: string;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
  ranges: SelectedSlot[];
  requiresSignIn: boolean;
  total: number;
};

export default function ScheduleConfirmSheet({ content, date, isSubmitting, onClose, onConfirm, ranges, requiresSignIn, total }: ScheduleConfirmSheetProps) {
  return (
    <ScheduleSheet
      closeLabel={content.confirmSheet.backLabel}
      footer={
        <div className="flex gap-3">
          <button className="h-11 flex-1 rounded-lg border border-[#008447] text-[15px] font-semibold text-[#008447]" onClick={onClose} type="button">
            {content.confirmSheet.backLabel}
          </button>
          <button className="h-11 flex-[2] rounded-lg bg-[#008447] text-[15px] font-semibold text-white disabled:bg-[#e7e7e8] disabled:text-[#b7b8bb]" disabled={ranges.length === 0 || isSubmitting} onClick={onConfirm} type="button">
            {content.confirmSheet.confirmLabel}
          </button>
        </div>
      }
      onClose={onClose}
      title={content.confirmSheet.title}
    >
      <p className="mb-3 flex items-center gap-1.5 text-[14px] font-medium text-[#124a31]">
        <CalendarDays aria-hidden="true" className="text-[#8a9690]" size={16} />
        {formatDateLabel(date)}
      </p>

      {ranges.length === 0 ? (
        <p className="py-6 text-center text-[14px] text-[#68716d]">{content.confirmSheet.emptyMessage}</p>
      ) : (
        <ul className="space-y-2">
          {ranges.map((range) => (
            <li className="flex items-center gap-2 rounded-lg border border-[#d9e8e0] bg-[#f7fdfa] px-3 py-2" key={`${range.courtId}-${range.startMinute}`}>
              <Clock aria-hidden="true" className="text-[#8a9690]" size={16} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-[#0b5133]">{range.courtName}</p>
                <p className="text-[13px] text-[#49544f]">{formatMinutes(range.startMinute)} - {formatMinutes(range.endMinute)}</p>
              </div>
              <span className="text-[14px] font-semibold text-[#124a31]">{formatCurrency(range.price)}</span>
            </li>
          ))}
        </ul>
      )}

      {requiresSignIn && (
        <p className="mt-3 rounded-md bg-[#fff6e2] px-3 py-2 text-[13px] text-[#8a5b00]">{content.confirmSheet.signInMessage}</p>
      )}

      <div className="mt-3 flex items-center border-t border-[#e1e6e3] pt-3 text-[15px] font-medium">
        <span>{content.totalLabel}</span>
        <strong className="ml-auto text-[18px] font-bold text-[#007b45]">{formatCurrency(total)}</strong>
      </div>
    </ScheduleSheet>
  );
}
