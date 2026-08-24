import { Bell, Menu, Search } from "lucide-react-native";
import { Text, TextInput, View } from "react-native";

import type { AdminShellContent } from "@/components/layouts/AdminShell/types";
import Avatar from "@/components/ui/Avatar";
import Touch from "@/components/ui/Pressable";

type AdminTopbarProps = {
  content: AdminShellContent;
  isCompact: boolean;
  onMenuOpen: () => void;
};

export default function AdminTopbar({ content, isCompact, onMenuOpen }: AdminTopbarProps) {
  return (
    <View className="h-16 flex-row items-center gap-3 border-b border-slate-200 bg-white px-4">
      {isCompact ? (
        <Touch
          accessibilityLabel={content.menuLabel}
          className="h-11 w-11 items-center justify-center rounded-md border border-slate-200"
          onPress={onMenuOpen}
        >
          <Menu color="#334155" size={20} />
        </Touch>
      ) : (
        <View className="h-11 max-w-md flex-1 flex-row items-center gap-2 rounded-md border border-slate-200 px-3">
          <Search color="#94a3b8" size={17} />
          <TextInput
            accessibilityLabel={content.commandPlaceholder}
            className="min-w-0 flex-1 text-[14px] text-slate-800"
            placeholder={content.commandPlaceholder}
            placeholderTextColor="#94a3b8"
          />
        </View>
      )}

      <View className="ml-auto flex-row items-center gap-3">
        <Touch
          accessibilityLabel={content.notificationLabel}
          className="h-11 w-11 items-center justify-center rounded-md border border-slate-200"
        >
          <Bell color="#334155" size={19} />
          <View className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500" />
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
