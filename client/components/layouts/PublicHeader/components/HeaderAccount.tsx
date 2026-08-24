import { useRouter } from "expo-router";
import { ChevronDown, LogOut, User } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";

import HeaderActions from "@/components/layouts/PublicHeader/components/HeaderActions";
import { headerActions } from "@/components/layouts/PublicHeader/mockData";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";
import { useSession } from "@/lib/api/session";

export default function HeaderAccount() {
  const router = useRouter();
  const { isReady, session, signOut } = useSession();
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Chưa đọc xong AsyncStorage hoặc chưa đăng nhập thì hiện nút khách.
  if (!isReady || !session) {
    return <HeaderActions actions={headerActions} />;
  }

  const { user } = session;

  return (
    <View className="w-full max-w-[300px]">
      <Touch
        accessibilityRole="button"
        className="h-9 w-full flex-row items-center gap-2 rounded-lg bg-white px-3"
        onPress={() => setMenuOpen((open) => !open)}
        style={shadow.card}
      >
        <View className="h-6 w-6 items-center justify-center rounded-full bg-[#656ad5]">
          <Text className="text-[13px] font-semibold uppercase text-white">{user.avatarInitial}</Text>
        </View>
        <Text className="min-w-0 flex-1 text-[14px] font-semibold text-[#0b7a4a]" numberOfLines={1}>
          {user.fullName}
        </Text>
        <ChevronDown color="#0b7a4a" size={16} style={{ transform: [{ rotate: isMenuOpen ? "180deg" : "0deg" }] }} />
      </Touch>

      {isMenuOpen ? (
        <View className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl bg-white" style={shadow.raised}>
          <Touch
            className="flex-row items-center gap-2 px-4 py-3"
            onPress={() => {
              setMenuOpen(false);
              router.push("/account");
            }}
          >
            <User color="#0b7a4a" size={17} />
            <Text className="text-[14px] text-[#1b2f25]">Tài khoản của tôi</Text>
          </Touch>
          <Touch
            className="flex-row items-center gap-2 border-t border-[#eef3f0] px-4 py-3"
            onPress={() => {
              signOut();
              setMenuOpen(false);
              router.push("/login");
            }}
          >
            <LogOut color="#c0392b" size={17} />
            <Text className="text-[14px] text-[#c0392b]">Đăng xuất</Text>
          </Touch>
        </View>
      ) : null}
    </View>
  );
}
