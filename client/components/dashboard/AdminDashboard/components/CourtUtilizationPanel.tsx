import { Text, View } from "react-native";

import { getCourtUtilization } from "@/components/admin/AdminData/selectors";
import type { Booking, Court, Venue } from "@/components/admin/AdminData/types";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import Tag from "@/components/ui/Tag";
import type { StatusTone } from "@/components/ui/Tag";

type CourtUtilizationPanelProps = {
  bookings: Booking[];
  courts: Court[];
  date: string;
  dateLabel: string;
  venue: Venue;
};

// Ngưỡng đọc nhanh: kín quá thì thiếu sân, vắng quá thì lãng phí khung giờ.
function getUtilizationStyle(utilization: number): { color: string; label: string; tone: StatusTone } {
  if (utilization >= 75) return { color: "#f43f5e", label: "Kín", tone: "rose" };
  if (utilization >= 40) return { color: "#0f9b58", label: "Ổn định", tone: "emerald" };
  return { color: "#f59e0b", label: "Còn trống", tone: "orange" };
}

export default function CourtUtilizationPanel({ bookings, courts, date, dateLabel, venue }: CourtUtilizationPanelProps) {
  const rankedCourts = courts
    .map((court) => ({ court, utilization: getCourtUtilization(court, bookings, date, venue.openingMinute, venue.closingMinute) }))
    .sort((first, second) => second.utilization - first.utilization);

  return (
    <Card className="h-full" description={`Tỷ lệ thời gian được đặt trong ngày ${dateLabel}`} title="Công suất theo sân">
      <View className="gap-4">
        {rankedCourts.map(({ court, utilization }) => {
          const style = getUtilizationStyle(utilization);

          return (
            <View key={court.id}>
              <View className="mb-1 flex-row items-center justify-between gap-2">
                <Text className="text-[14px] font-bold text-slate-900">{court.name}</Text>
                <Tag label={style.label} tone={style.tone} />
              </View>
              <ProgressBar color={style.color} height={8} percent={utilization} />
            </View>
          );
        })}
      </View>
    </Card>
  );
}
