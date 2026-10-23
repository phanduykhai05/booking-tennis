import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

import ScheduleLegend from "@/components/booking/CourtScheduleBooking/components/ScheduleLegend";
import type { CourtScheduleContent } from "@/components/booking/CourtScheduleBooking/types";
import { formatDateLabel } from "@/components/booking/CourtScheduleBooking/utils";
import DateField from "@/components/ui/DateField";
import Touch from "@/components/ui/Pressable";

type ScheduleHeaderProps = {
  backHref: string;
  content: CourtScheduleContent;
  date: string;
  onDateChange: (date: string) => void;
  onPriceListOpen: () => void;
  venueName: string;
};

export default function ScheduleHeader({ backHref, content, date, onDateChange, onPriceListOpen, venueName }: ScheduleHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0b6b3e] pb-3">
      <div className="h-[52px] flex-row items-center justify-center px-12">
        <Touch accessibilityLabel={content.backLabel} className="absolute left-3 rounded p-1" onPress={() => navigate(backHref)}>
          <ArrowLeft color="#ffffff" size={21} strokeWidth={2.6} />
        </Touch>
        <span className="text-[16px] font-bold uppercase text-white truncate">
          {content.title}
        </span>
      </div>

      <div className="flex-row items-center justify-between gap-3 px-3 pb-3">
        <span className="min-w-0 flex-1 text-[14px] font-semibold text-white/90 truncate">
          {venueName}
        </span>
        <DateField
          accessibilityLabel={content.datePickerLabel}
          displayValue={formatDateLabel(date)}
          onChange={onDateChange}
          value={date}
        />
      </div>

      <div className="px-3">
        <ScheduleLegend labels={content.slotStatusLabels} />
        <Touch className="mt-3 self-start" onPress={onPriceListOpen}>
          <span className="text-[14px] font-semibold text-[#ffe141] underline">{content.priceListLabel}</span>
        </Touch>
      </div>
    </div>
  );
}
