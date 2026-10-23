
import type { CourtScheduleContent } from "@/components/booking/CourtScheduleBooking/types";
import { formatCurrency } from "@/components/booking/CourtScheduleBooking/utils";
import Button from "@/components/ui/Button";
import { ErrorMessage, SuccessMessage } from "@/components/ui/Feedback";

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
    <div className="px-4 pb-4">
      {errorMessage ? (
        <div className="mb-2">
          <ErrorMessage text={errorMessage} />
        </div>
      ) : null}

      {successMessage ? (
        <div className="mb-2">
          <SuccessMessage text={successMessage} />
        </div>
      ) : null}

      <div className="mb-2 flex-row items-center justify-between">
        <span className="text-[13px] text-[#124a31]">
          {selectedCount === 0 ? content.emptySelection : `${selectedCount} ${content.selectedSummary}`}
        </span>
        {selectedCount > 0 ? (
          <span className="text-[13px] font-semibold text-[#124a31]">
            {content.totalLabel} <span className="text-[15px] font-bold text-[#c0392b]">{formatCurrency(total)}</span>
          </span>
        ) : null}
      </div>

      <Button
        disabled={selectedCount === 0}
        fullWidth
        label={content.nextLabel}
        onPress={onNext}
        size="large"
        tone="warning"
      />
    </div>
  );
}
