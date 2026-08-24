import { Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

import type { BookingStatus } from "@/components/admin/AdminData/types";
import { bookingScheduleContent } from "@/components/booking/BookingSchedule/mockData";
import Card from "@/components/ui/Card";

type StatusBreakdownProps = {
  counts: Record<BookingStatus, number>;
  total: number;
};

const RADIUS = 52;
const STROKE_WIDTH = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const statusColor: Record<BookingStatus, string> = {
  cancelled: "#f43f5e",
  "checked-in": "#0ea5e9",
  completed: "#8b5cf6",
  confirmed: "#10b981",
  pending: "#f59e0b",
};

const statusOrder: BookingStatus[] = ["confirmed", "pending", "checked-in", "completed", "cancelled"];

export default function StatusBreakdown({ counts, total }: StatusBreakdownProps) {
  const getSegmentLength = (status: BookingStatus) => (total > 0 ? (counts[status] / total) * CIRCUMFERENCE : 0);

  // Offset cộng dồn từ các lát trước; tính lại thay vì gán biến ngoài để hàm render thuần khiết.
  const segments = statusOrder.map((status, index) => ({
    color: statusColor[status],
    length: getSegmentLength(status),
    offset: statusOrder.slice(0, index).reduce((sum, previous) => sum + getSegmentLength(previous), 0),
    status,
    value: counts[status],
  }));

  return (
    <Card className="h-full" description="Phân bổ toàn bộ lịch đặt sân" title="Cơ cấu trạng thái">
      <View className="items-center gap-5">
        <View className="h-[152px] w-[152px] items-center justify-center">
          <Svg height={152} viewBox="0 0 140 140" width={152}>
            <G rotation={-90} origin="70, 70">
              <Circle cx="70" cy="70" fill="none" r={RADIUS} stroke="#f1f5f9" strokeWidth={STROKE_WIDTH} />
              {segments.map((segment) => (
                <Circle
                  cx="70"
                  cy="70"
                  fill="none"
                  key={segment.status}
                  r={RADIUS}
                  stroke={segment.color}
                  strokeDasharray={`${segment.length} ${CIRCUMFERENCE - segment.length}`}
                  strokeDashoffset={-segment.offset}
                  strokeLinecap="butt"
                  strokeWidth={STROKE_WIDTH}
                />
              ))}
            </G>
          </Svg>
          <View className="absolute items-center justify-center">
            <Text className="text-[28px] font-bold text-slate-900">{total}</Text>
            <Text className="text-[12px] text-slate-500">lịch đặt</Text>
          </View>
        </View>

        <View className="w-full gap-2">
          {segments.map((segment) => (
            <View className="flex-row items-center gap-2" key={segment.status}>
              <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: segment.color }} />
              <Text className="flex-1 text-[12px] text-slate-600">
                {bookingScheduleContent.bookingStatusLabels[segment.status]}
              </Text>
              <Text className="text-[12px] font-bold text-slate-900">{segment.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
}
