import { useRouter } from "expo-router";
import { ScrollView, Text } from "react-native";

import type { BookingDateItem } from "@/components/product/ProductDetail/types";
import Touch from "@/components/ui/Pressable";

type BookingDateStripProps = {
  dates: BookingDateItem[];
};

export default function BookingDateStrip({ dates }: BookingDateStripProps) {
  const router = useRouter();

  return (
    <ScrollView
      accessibilityLabel="Chọn ngày đặt"
      className="border-b border-[#e3e3e3] bg-white"
      contentContainerClassName="flex-row gap-1 px-2 py-1.5"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {dates.map((item, index) => (
        <Touch
          accessibilityRole="link"
          className={`h-[31px] min-w-[51px] items-center justify-center rounded-md border px-2 ${index === 0 ? "border-[#008248] bg-[#007d45]" : "border-[#e2e2e2] bg-white"}`}
          key={item.id}
          onPress={() => router.push(item.href)}
        >
          <Text className={`text-[11px] leading-3 ${index === 0 ? "font-bold text-white" : "text-[#202124]"}`}>{item.date}</Text>
          {item.day ? (
            <Text className={`text-[11px] leading-3 ${index === 0 ? "font-bold text-white" : "text-[#202124]"}`}>{item.day}</Text>
          ) : null}
        </Touch>
      ))}
    </ScrollView>
  );
}
