import { ChevronRight } from "lucide-react-native";
import { Text, View } from "react-native";

import aloboIcons from "@/components/assets/icons";
import type { DashboardItem } from "@/components/account/AccountDashboard/types";
import Touch from "@/components/ui/Pressable";

const icons: Record<DashboardItem["icon"], typeof aloboIcons.home> = {
  calendar: aloboIcons.calendar,
  graduation: aloboIcons.profileClass,
  group: aloboIcons.profileGroup,
  member: aloboIcons.profileMembership,
  settings: aloboIcons.profileSetting,
  version: aloboIcons.profileInfo,
};

type DashboardListProps = {
  items: DashboardItem[];
};

export default function DashboardList({ items }: DashboardListProps) {
  return (
    <View className="overflow-hidden rounded-xl bg-white">
      {items.map((item, index) => {
        const Icon = icons[item.icon];

        return (
          <Touch
            className={`h-[45px] flex-row items-center gap-3 px-3 ${index + 1 < items.length ? "border-b border-[#edf0ee]" : ""}`}
            key={item.id}
          >
            <Icon color="#4e5154" height={20} width={20} />
            <Text className="flex-1 text-[15px] text-[#4e5154]">{item.label}</Text>
            <ChevronRight color="#373c3a" size={18} />
          </Touch>
        );
      })}
    </View>
  );
}
