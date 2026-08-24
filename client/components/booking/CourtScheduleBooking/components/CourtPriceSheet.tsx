import { Text, View } from "react-native";

import type {
  CourtScheduleContent,
  ScheduleCourtGroup,
  SchedulePriceRule,
} from "@/components/booking/CourtScheduleBooking/types";
import { formatCurrency } from "@/components/booking/CourtScheduleBooking/utils";
import Sheet from "@/components/ui/Sheet";

type CourtPriceSheetProps = {
  content: CourtScheduleContent;
  groups: ScheduleCourtGroup[];
  isOpen: boolean;
  onClose: () => void;
  priceRules: SchedulePriceRule[];
};

export default function CourtPriceSheet({ content, groups, isOpen, onClose, priceRules }: CourtPriceSheetProps) {
  return (
    <Sheet closeLabel={content.priceSheet.closeLabel} isOpen={isOpen} onClose={onClose} title={content.priceSheet.title}>
      <View>
        <Text className="mb-2 text-[15px] font-semibold text-[#007b45]">{content.priceSheet.courtsTitle}</Text>
        <View className="gap-2">
          {groups.map((group) => (
            <View key={group.id}>
              <Text className="text-[13px] font-semibold text-[#124a31]">{group.name}</Text>
              <View className="mt-1 flex-row flex-wrap gap-1.5">
                {group.courts.map((court) => (
                  <Text
                    className="rounded-md border border-[#c8e6d6] bg-[#f0fbf4] px-2 py-1 text-[12px] text-[#0b5133]"
                    key={court.id}
                  >
                    {court.name}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className="mt-4">
        <Text className="mb-2 text-[15px] font-semibold text-[#007b45]">{content.priceSheet.priceTitle}</Text>
        <View className="overflow-hidden rounded-md border border-[#e0e8e4]">
          {priceRules.map((rule, index) => (
            <View
              className={`flex-row items-center justify-between px-3 py-2 ${index > 0 ? "border-t border-[#e7ece9]" : ""}`}
              key={rule.id}
            >
              <Text className="text-[14px] text-[#49544f]">{rule.label}</Text>
              <Text className="text-[14px] font-semibold text-[#0b5133]">
                {formatCurrency(rule.pricePerHour)}
                {content.priceSheet.priceUnit}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Sheet>
  );
}
