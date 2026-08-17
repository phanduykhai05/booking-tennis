"use client";

import ScheduleSheet from "@/components/booking/CourtScheduleBooking/components/ScheduleSheet";
import type {
  CourtScheduleContent,
  ScheduleCourtGroup,
  SchedulePriceRule,
} from "@/components/booking/CourtScheduleBooking/types";
import { formatCurrency } from "@/components/booking/CourtScheduleBooking/utils";

type CourtPriceSheetProps = {
  content: CourtScheduleContent;
  groups: ScheduleCourtGroup[];
  onClose: () => void;
  priceRules: SchedulePriceRule[];
};

export default function CourtPriceSheet({ content, groups, onClose, priceRules }: CourtPriceSheetProps) {
  return (
    <ScheduleSheet closeLabel={content.priceSheet.closeLabel} onClose={onClose} title={content.priceSheet.title}>
      <section>
        <h3 className="mb-2 text-[15px] font-semibold text-[#007b45]">{content.priceSheet.courtsTitle}</h3>
        <ul className="space-y-2">
          {groups.map((group) => (
            <li key={group.id}>
              <p className="text-[13px] font-semibold text-[#124a31]">{group.name}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {group.courts.map((court) => (
                  <span className="rounded-md border border-[#c8e6d6] bg-[#f0fbf4] px-2 py-1 text-[12px] text-[#0b5133]" key={court.id}>{court.name}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h3 className="mb-2 text-[15px] font-semibold text-[#007b45]">{content.priceSheet.priceTitle}</h3>
        <dl className="divide-y divide-[#e7ece9] rounded-md border border-[#e0e8e4]">
          {priceRules.map((rule) => (
            <div className="flex items-center justify-between px-3 py-2 text-[14px]" key={rule.id}>
              <dt className="text-[#49544f]">{rule.label}</dt>
              <dd className="font-semibold text-[#0b5133]">{formatCurrency(rule.pricePerHour)}{content.priceSheet.priceUnit}</dd>
            </div>
          ))}
        </dl>
      </section>
    </ScheduleSheet>
  );
}
