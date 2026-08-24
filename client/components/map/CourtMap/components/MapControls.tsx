import { Crosshair, Layers3 } from "lucide-react-native";
import { View } from "react-native";

import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type MapControlsProps = {
  currentLocationLabel: string;
  isVenueLayerVisible: boolean;
  layersLabel: string;
  onLocate: () => void;
  onToggleVenueLayer: () => void;
};

export default function MapControls({
  currentLocationLabel,
  isVenueLayerVisible,
  layersLabel,
  onLocate,
  onToggleVenueLayer,
}: MapControlsProps) {
  return (
    <View className="absolute bottom-28 right-4 gap-3">
      <Touch
        accessibilityLabel={layersLabel}
        accessibilityState={{ selected: isVenueLayerVisible }}
        className={`h-12 w-12 items-center justify-center rounded-full ${isVenueLayerVisible ? "bg-white" : "bg-slate-700"}`}
        onPress={onToggleVenueLayer}
        style={shadow.raised}
      >
        <Layers3 color={isVenueLayerVisible ? "#334155" : "#ffffff"} size={24} strokeWidth={2} />
      </Touch>
      <Touch
        accessibilityLabel={currentLocationLabel}
        className="h-12 w-12 items-center justify-center rounded-full bg-emerald-600"
        onPress={onLocate}
        style={shadow.raised}
      >
        <Crosshair color="#ffffff" size={24} strokeWidth={2.2} />
      </Touch>
    </View>
  );
}
