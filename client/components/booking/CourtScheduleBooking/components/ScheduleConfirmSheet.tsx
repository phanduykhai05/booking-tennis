import { CalendarDays, Clock } from "lucide-react-native";
import { Text, View } from "react-native";

import type { CourtScheduleContent, SelectedSlot } from "@/components/booking/CourtScheduleBooking/types";
import { formatCurrency, formatDateLabel, formatMinutes } from "@/components/booking/CourtScheduleBooking/utils";
import Button from "@/components/ui/Button";
import { NoticeMessage } from "@/components/ui/Feedback";
import Sheet from "@/components/ui/Sheet";

type ScheduleConfirmSheetProps = {
  content: CourtScheduleContent;
  date: string;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
  ranges: SelectedSlot[];
  requiresSignIn: boolean;
  total: number;
};

export default function ScheduleConfirmSheet({
  content,
  date,
  isOpen,
  isSubmitting,
  onClose,
  onConfirm,
  ranges,
  requiresSignIn,
  total,
}: ScheduleConfirmSheetProps) {
  return (
    <Sheet
      closeLabel={content.confirmSheet.backLabel}
      footer={
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Button fullWidth label={content.confirmSheet.backLabel} onPress={onClose} tone="outline" />
          </View>
          <View className="flex-[2]">
            <Button
              disabled={ranges.length === 0}
              fullWidth
              isLoading={isSubmitting}
              label={content.confirmSheet.confirmLabel}
              onPress={onConfirm}
            />
          </View>
        </View>
      }
      isOpen={isOpen}
      onClose={onClose}
      title={content.confirmSheet.title}
    >
      <View className="mb-3 flex-row items-center gap-1.5">
        <CalendarDays color="#8a9690" size={16} />
        <Text className="text-[14px] font-medium text-[#124a31]">{formatDateLabel(date)}</Text>
      </View>

      {ranges.length === 0 ? (
        <Text className="py-6 text-center text-[14px] text-[#68716d]">{content.confirmSheet.emptyMessage}</Text>
      ) : (
        <View className="gap-2">
          {ranges.map((range) => (
            <View
              className="flex-row items-center gap-2 rounded-lg border border-[#d9e8e0] bg-[#f7fdfa] px-3 py-2"
              key={`${range.courtId}-${range.startMinute}`}
            >
              <Clock color="#8a9690" size={16} />
              <View className="min-w-0 flex-1">
                <Text className="text-[14px] font-semibold text-[#0b5133]" numberOfLines={1}>
                  {range.courtName}
                </Text>
                <Text className="text-[13px] text-[#49544f]">
                  {formatMinutes(range.startMinute)} - {formatMinutes(range.endMinute)}
                </Text>
              </View>
              <Text className="text-[14px] font-semibold text-[#124a31]">{formatCurrency(range.price)}</Text>
            </View>
          ))}
        </View>
      )}

      {requiresSignIn ? (
        <View className="mt-3">
          <NoticeMessage text={content.confirmSheet.signInMessage} />
        </View>
      ) : null}

      <View className="mt-3 flex-row items-center border-t border-[#e1e6e3] pt-3">
        <Text className="flex-1 text-[15px] font-medium text-[#172720]">{content.totalLabel}</Text>
        <Text className="text-[18px] font-bold text-[#007b45]">{formatCurrency(total)}</Text>
      </View>
    </Sheet>
  );
}
