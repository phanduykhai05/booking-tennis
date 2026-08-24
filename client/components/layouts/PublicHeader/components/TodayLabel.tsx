import { Text } from "react-native";

import { formatWeekdayDate, todayInAppTimezone } from "@/lib/date";

/** Ngày hiện tại theo giờ Việt Nam, dạng "Thứ năm, 20/08/2026". */
export default function TodayLabel() {
  return <Text className="text-[16px] font-semibold text-white">{formatWeekdayDate(todayInAppTimezone())}</Text>;
}
