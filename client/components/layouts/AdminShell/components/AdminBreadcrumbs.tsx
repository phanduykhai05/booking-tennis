import { useRouter } from "expo-router";
import { ChevronRight, Home } from "lucide-react-native";
import { Text, View } from "react-native";

import { adminHomeHref } from "@/components/layouts/AdminShell/mockData";
import type { AdminNavigationItem } from "@/components/layouts/AdminShell/types";
import Touch from "@/components/ui/Pressable";

type AdminBreadcrumbsProps = {
  items: AdminNavigationItem[];
  pathname: string;
};

export default function AdminBreadcrumbs({ items, pathname }: AdminBreadcrumbsProps) {
  const router = useRouter();
  const currentItem = items.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));

  return (
    <View className="mb-4 flex-row items-center gap-1">
      <Touch accessibilityLabel="Tổng quan" className="p-1" onPress={() => router.navigate(adminHomeHref)}>
        <Home color="#64748b" size={15} />
      </Touch>
      <ChevronRight color="#cbd5e1" size={14} />
      <Text className="text-[13px] text-slate-600">{currentItem?.label ?? "Quản trị"}</Text>
    </View>
  );
}
