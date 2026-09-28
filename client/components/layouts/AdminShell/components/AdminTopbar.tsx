import { useRouter } from "expo-router";
import { Bell, Menu } from "lucide-react-native";
import { Text, View } from "react-native";

import AdminGlobalSearch from "@/components/layouts/AdminShell/components/AdminGlobalSearch";
import type { AdminShellContent } from "@/components/layouts/AdminShell/types";
import Avatar from "@/components/ui/Avatar";
import Touch from "@/components/ui/Pressable";

type AdminTopbarProps = {
  content: AdminShellContent;
  isCompact: boolean;
  onMenuOpen: () => void;
  /** Số thông báo chưa đọc; 0 thì không chấm đỏ. */
  unreadCount: number;
};

export default function AdminTopbar({ content, isCompact, onMenuOpen, unreadCount }: AdminTopbarProps) {
  const router = useRouter();

  return (
    /* z-50: dropdown kết quả tìm kiếm tràn xuống dưới, không nâng thanh này lên thì
       phần nội dung bên dưới (anh em cùng cha, render sau) sẽ vẽ đè lên nó. */
    <View className="z-50 h-16 flex-row items-center gap-3 border-b border-slate-200 bg-white px-4">
      {isCompact ? (
        <Touch
          accessibilityLabel={content.menuLabel}
          className="h-11 w-11 items-center justify-center rounded-md border border-slate-200"
          onPress={onMenuOpen}
        >
          <Menu color="#334155" size={20} />
        </Touch>
      ) : (
        <AdminGlobalSearch placeholder={content.commandPlaceholder} />
      )}

      <View className="ml-auto flex-row items-center gap-3">
        {/* Trước đây nút này không có onPress nên bấm mãi không ra gì. */}
        <Touch
          accessibilityLabel={content.notificationLabel}
          className="h-11 w-11 items-center justify-center rounded-md border border-slate-200"
          onPress={() => router.push("/notifications")}
        >
          <Bell color="#334155" size={19} />
          {unreadCount > 0 ? <View className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500" /> : null}
        </Touch>

        <View className="flex-row items-center gap-2">
          <Avatar background="#0f9b58" color="#ffffff" label={content.userInitials} size={36} />
          {isCompact ? null : (
            <View>
              <Text className="text-[13px] font-bold text-slate-900">{content.userName}</Text>
              <Text className="text-[11px] text-slate-500">{content.roleLabel}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
