import { useRouter } from "expo-router";
import { FileText, Flame, Home, Map, User } from "lucide-react-native";
import { Text, View } from "react-native";

import aloboIcons from "@/components/assets/icons";
import type { BottomNavigationIcon, BottomNavigationItem } from "@/components/layouts/PublicFooter/types";
import Touch from "@/components/ui/Pressable";

type BottomNavigationProps = {
  items: BottomNavigationItem[];
};

// Khớp đúng bộ icon alobo dùng (đối chiếu path trong assets/icons/*.svg của họ).
const icons: Record<BottomNavigationIcon, { active?: typeof aloboIcons.home; normal: typeof aloboIcons.home }> = {
  account: { active: aloboIcons.personActive, normal: aloboIcons.person },
  discover: { normal: aloboIcons.sport },
  home: { active: aloboIcons.homeActive, normal: aloboIcons.home },
  map: { active: aloboIcons.mapActive, normal: aloboIcons.map },
  popular: { active: aloboIcons.hotNewsActive, normal: aloboIcons.hotNews },
};

const activeIcons: Partial<Record<BottomNavigationIcon, typeof Home>> = {
  account: User,
  home: Home,
  map: Map,
  popular: Flame,
};

type EntryProps = {
  item: BottomNavigationItem;
  onPress: () => void;
};

function PrimaryEntry({ item, onPress }: EntryProps) {
  const Icon = item.icon === "discover" ? FileText : icons[item.icon].normal;

  return (
    <Touch accessibilityRole="link" className="min-w-0 flex-1 items-center gap-1" onPress={onPress}>
      {/* Đĩa trắng đồng tâm, cùng màu đặc với thanh nav nên hoà vào nhau thành vòm. */}
      <View className="-mt-7 h-[54px] w-[54px] items-center justify-center">
        <View className="absolute -inset-2 rounded-full bg-white" />
        <View className="h-full w-full items-center justify-center rounded-full border-2 border-[#22c55e] bg-white">
          <Icon color="#22c55e" height={25} width={25} />
        </View>
      </View>
      <Text className="text-[12px] font-medium text-[#616161]" numberOfLines={1}>
        {item.label}
      </Text>
    </Touch>
  );
}

function StandardEntry({ item, onPress }: EntryProps) {
  const Icon = (item.isActive ? activeIcons[item.icon] : undefined) ?? icons[item.icon].normal;

  return (
    <Touch accessibilityRole="link" className="min-w-0 flex-1 items-center gap-1" onPress={onPress}>
      <View className="h-6 items-center justify-center">
        <Icon color={item.isActive ? "#16a34a" : "#b4b4b4"} height={22} width={22} />
      </View>
      <Text
        className={`text-[12px] ${item.isActive ? "font-semibold text-[#16a34a]" : "font-medium text-[#a3a3a3]"}`}
        numberOfLines={1}
      >
        {item.label}
      </Text>
    </Touch>
  );
}

export default function BottomNavigation({ items }: BottomNavigationProps) {
  const router = useRouter();

  return (
    // Nền trắng đặc: đĩa vòm chồng lên nền nav sẽ lộ vệt tròn nếu nền trong suốt.
    <View className="h-[58px] w-full rounded-t-[12px] bg-white">
      <View className="h-full w-full flex-row items-center px-5">
        {items.map((item) =>
          item.isPrimary ? (
            <PrimaryEntry item={item} key={item.id} onPress={() => router.navigate(item.href)} />
          ) : (
            <StandardEntry item={item} key={item.id} onPress={() => router.navigate(item.href)} />
          ),
        )}
      </View>
    </View>
  );
}
