import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ChevronRight, Crown, LockKeyhole, LogOut, X } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import DashboardList from "@/components/account/AccountDashboard/components/DashboardList";
import {
  accountDashboardContent,
  accountShortcuts,
  activityItems,
  systemItems,
} from "@/components/account/AccountDashboard/content";
import images from "@/components/assets/images";
import PublicFooter from "@/components/layouts/PublicFooter";
import Touch from "@/components/ui/Pressable";
import Screen from "@/components/ui/Screen";
import { shadow } from "@/components/ui/theme";
import { useSession } from "@/lib/api/session";

const shortcutHrefs: Partial<Record<string, string>> = {
  booking: "/bookings",
  notification: "/notifications",
};

export default function AccountDashboard() {
  const router = useRouter();
  const { session, signOut } = useSession();
  const [isAlertVisible, setAlertVisible] = useState(true);
  const profile = session?.user;

  return (
    <Screen backgroundColor="#027a45" statusBarStyle="light">
      <View className="flex-1 bg-[#eaf8f1]">
        <ScrollView contentContainerClassName="pb-32">
          <View className="h-[146px] overflow-hidden bg-[#027a45] px-6 pt-5">
            <Image
              contentFit="cover"
              source={images.alobo.homeHeader}
              style={{ bottom: 0, left: 0, opacity: 0.4, position: "absolute", right: 0, top: 0 }}
            />

            <Touch
              className="w-full flex-row items-center gap-3 rounded-lg border border-[#edaf17] bg-white/15 p-3"
              onPress={() => router.push(profile ? "/account/profile" : "/login")}
            >
              <View className="h-10 w-10 items-center justify-center rounded-full bg-[#656ad5]">
                <Text className="text-[22px] uppercase text-white">
                  {profile?.avatarInitial ?? accountDashboardContent.guestInitial}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-[15px] font-bold text-white">{profile?.fullName ?? accountDashboardContent.guestName}</Text>
                <Text className="mt-1 text-[13px] text-white/90">{profile?.email ?? accountDashboardContent.emailPrompt}</Text>
              </View>
              <ChevronRight color="#ffffff" size={20} />
            </Touch>

            <Touch className="mt-5 flex-row items-center gap-2">
              <Crown color="#ffe141" fill="#ffe141" size={23} />
              <Text className="text-[15px] font-bold text-white">{accountDashboardContent.membership}</Text>
              <ChevronRight color="#ffffff" size={17} />
            </Touch>
          </View>

          <View className="-mt-3 rounded-t-[18px] bg-[#eaf8f1] px-6 pt-6">
            <View className="flex-row gap-2 rounded-xl border border-[#d3e9de] bg-[#effaf4] p-3">
              {accountShortcuts.map((shortcut) => (
                <Touch
                  className="min-h-[62px] flex-1 items-center justify-center gap-1 rounded-lg border border-[#349c6c] bg-white"
                  key={shortcut.id}
                  onPress={() => {
                    const href = shortcutHrefs[shortcut.id];
                    if (href) router.push(href);
                  }}
                  style={shadow.card}
                >
                  <Image source={images.alobo.profileShortcuts[shortcut.id]} style={{ height: 28, width: 28 }} />
                  <Text className="text-center text-[12px] font-medium text-[#075038]">{shortcut.label}</Text>
                </Touch>
              ))}
            </View>

            <View className="mt-5">
              <Text className="mb-3 text-[16px] font-bold text-[#008447]">{accountDashboardContent.activityTitle}</Text>
              <DashboardList items={activityItems} />
            </View>

            <View className="mt-5">
              <Text className="mb-3 text-[16px] font-bold text-[#008447]">{accountDashboardContent.systemTitle}</Text>
              <DashboardList items={systemItems} />
            </View>

            {isAlertVisible ? (
              <View className="mt-5 overflow-hidden rounded-lg border border-[#ffe0a0] bg-white p-3">
                <Image
                  contentFit="cover"
                  source={images.alobo.alertBackground}
                  style={{ bottom: 0, left: 0, opacity: 0.45, position: "absolute", right: 0, top: 0 }}
                />
                <Touch accessibilityLabel="Đóng cảnh báo" className="absolute right-2 top-2 p-1" onPress={() => setAlertVisible(false)}>
                  <X color="#007544" size={16} />
                </Touch>
                <View className="flex-row gap-2 pr-6">
                  <LockKeyhole color="#e8a900" size={22} />
                  <View className="flex-1">
                    <Text className="text-[13px] font-bold text-[#007544]">{accountDashboardContent.securityTitle}</Text>
                    <Text className="mt-1 text-[12px] text-[#486459]">{accountDashboardContent.securityDescription}</Text>
                    <Touch className="mt-1 self-start rounded border border-[#ecac1c] px-2 py-1">
                      <Text className="text-[12px] text-[#de9700]">{accountDashboardContent.setupNow}</Text>
                    </Touch>
                  </View>
                </View>
              </View>
            ) : null}

            <Touch
              className="mt-5 h-11 w-full flex-row items-center justify-center gap-2 rounded-lg border border-[#e0574f]"
              onPress={() => {
                if (profile) signOut();
                router.push("/login");
              }}
            >
              <LogOut color="#e0574f" size={17} />
              <Text className="text-[14px] font-semibold text-[#e0574f]">
                {profile ? accountDashboardContent.signOut : accountDashboardContent.signIn}
              </Text>
            </Touch>

            <Text className="mt-2 text-right text-[12px] text-[#929a96]">{accountDashboardContent.version}</Text>
          </View>
        </ScrollView>

        <PublicFooter activeItemId="account" />
      </View>
    </Screen>
  );
}
