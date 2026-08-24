import { useRef, useState } from "react";
import { View } from "react-native";
import type { GestureResponderEvent, LayoutChangeEvent } from "react-native";

import { shadow } from "@/components/ui/theme";

type ScheduleScrollSliderProps = {
  label: string;
  onSeek: (ratio: number) => void;
  ratio: number;
};

const THUMB_SIZE = 18;

/**
 * Thanh trượt điều khiển vị trí cuộn ngang của lưới. Lưới vẫn vuốt trực tiếp được,
 * thanh này cho biết đang ở đâu trong dải giờ và nhảy nhanh tới khung giờ xa.
 * Dùng thẳng responder props của View thay cho PanResponder cho gọn.
 */
export default function ScheduleScrollSlider({ label, onSeek, ratio }: ScheduleScrollSliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const trackWidthRef = useRef(0);

  const seekFromEvent = (event: GestureResponderEvent) => {
    const usable = Math.max(trackWidthRef.current - THUMB_SIZE, 1);
    onSeek(Math.max(0, Math.min(1, (event.nativeEvent.locationX - THUMB_SIZE / 2) / usable)));
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    trackWidthRef.current = event.nativeEvent.layout.width;
    setTrackWidth(event.nativeEvent.layout.width);
  };

  return (
    <View className="px-4 py-2">
      <View className="rounded-full border border-[#dbe7e0] bg-white px-4 py-2" style={shadow.card}>
        <View
          accessibilityLabel={label}
          accessibilityRole="adjustable"
          accessibilityValue={{ max: 100, min: 0, now: Math.round(ratio * 100) }}
          className="h-[22px] justify-center"
          onLayout={handleLayout}
          onMoveShouldSetResponder={() => true}
          onResponderGrant={seekFromEvent}
          onResponderMove={seekFromEvent}
          onStartShouldSetResponder={() => true}
        >
          <View className="h-1 w-full rounded-full bg-[#e3ebe7]" />
          <View
            className="absolute h-[18px] w-[18px] rounded-full border-[3px] border-white bg-[#22a45d]"
            style={[{ left: Math.max(trackWidth - THUMB_SIZE, 0) * ratio }, shadow.card]}
          />
        </View>
      </View>
    </View>
  );
}
