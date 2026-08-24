import { CalendarCheck, Heart, Map, Search } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Text, TextInput, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";

import type { HeaderShortcut, HeaderShortcutIcon } from "@/components/layouts/PublicHeader/types";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type HeaderSearchProps = {
  favoriteLabel: string;
  onChange: (value: string) => void;
  placeholder: string;
  shortcuts: HeaderShortcut[];
  submitLabel: string;
  value: string;
};

const shortcutIcons: Record<HeaderShortcutIcon, LucideIcon> = {
  booked: CalendarCheck,
  favorite: Heart,
  map: Map,
};

const shortcutHrefs: Record<HeaderShortcutIcon, string> = {
  booked: "/bookings",
  favorite: "/account",
  map: "/map",
};

export default function HeaderSearch({ favoriteLabel, onChange, placeholder, shortcuts, submitLabel, value }: HeaderSearchProps) {
  const router = useRouter();

  return (
    <View className="overflow-hidden rounded-2xl bg-white" style={shadow.raised}>
      <View className="h-11 flex-row items-center gap-2.5 pl-4 pr-2">
        <Search color="#0f9b58" size={18} strokeWidth={2.6} />
        <TextInput
          className="min-w-0 flex-1 text-[16px] text-slate-800"
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          returnKeyType="search"
          value={value}
        />
        <Touch accessibilityLabel={favoriteLabel} className="h-8 w-8 items-center justify-center rounded-full" onPress={() => router.push("/account")}>
          <Heart color="#0f9b58" size={20} strokeWidth={2} />
        </Touch>
      </View>

      <View accessibilityLabel={submitLabel} className="flex-row border-t border-slate-200/80">
        {shortcuts.map((shortcut) => {
          const Icon = shortcutIcons[shortcut.icon];

          return (
            <Touch
              className="h-11 flex-1 flex-row items-center justify-center gap-2"
              key={shortcut.id}
              onPress={() => router.push(shortcutHrefs[shortcut.icon])}
            >
              <Icon color="#0f8f53" size={18} strokeWidth={2} />
              <Text className="text-[13px] font-medium text-[#0f8f53]">{shortcut.label}</Text>
            </Touch>
          );
        })}
      </View>
    </View>
  );
}
