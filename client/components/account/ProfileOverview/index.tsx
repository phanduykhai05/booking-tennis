import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ArrowLeft, BadgeCheck, CalendarDays, Camera, CircleDot, Dumbbell, Ruler, Target, Trophy } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";

import ProfileEditSheet from "@/components/account/ProfileOverview/components/ProfileEditSheet";
import { profileContent, profileDetailItems } from "@/components/account/ProfileOverview/content";
import type { ProfileDetailItem, ProfileEditSection } from "@/components/account/ProfileOverview/types";
import aloboIcons from "@/components/assets/icons";
import images from "@/components/assets/images";
import { LoadingState } from "@/components/ui/Feedback";
import Touch from "@/components/ui/Pressable";
import Screen from "@/components/ui/Screen";
import { shadow } from "@/components/ui/theme";
import { getProfile, updateProfile } from "@/lib/api/endpoints";
import { useSession } from "@/lib/api/session";
import type { ApiProfileUpdate } from "@/lib/api/types";

const personalIcons: Record<ProfileDetailItem["icon"], LucideIcon> = {
  goal: Target,
  location: CircleDot,
  schedule: CalendarDays,
  sport: Trophy,
};

export default function ProfileOverview() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"links" | "overview">("overview");
  const [editSection, setEditSection] = useState<ProfileEditSection | null>(null);
  const { isReady, session, token, updateUser } = useSession();
  const profile = session?.user;

  // Hồ sơ trong phiên là bản chụp lúc đăng nhập; tải lại từ API để thấy thay đổi mới nhất.
  // setState nằm trong callback của promise để effect không cập nhật state ngay trong thân hàm.
  useEffect(() => {
    if (!isReady || !token) return;

    let isActive = true;

    getProfile(token)
      .then((fresh) => {
        if (isActive) updateUser(fresh);
      })
      .catch(() => undefined);

    return () => {
      isActive = false;
    };
  }, [isReady, token, updateUser]);

  const saveProfile = async (body: ApiProfileUpdate) => {
    if (!token) return;
    updateUser(await updateProfile(token, body));
  };

  const orDash = (value: number | string | null | undefined) =>
    value === null || value === undefined || value === "" ? profileContent.notProvided : String(value);

  if (!profile) {
    return (
      <Screen backgroundColor="#008447" statusBarStyle="light">
        <View className="flex-1 bg-[#f7f7f7]">
          {isReady && !token ? (
            <Text className="px-6 pt-24 text-center text-[15px] text-[#68716d]">{profileContent.signInRequired}</Text>
          ) : (
            <LoadingState label={profileContent.loading} />
          )}
        </View>
      </Screen>
    );
  }

  return (
    <Screen backgroundColor="#008447" statusBarStyle="light">
      <ScrollView className="flex-1 bg-[#f7f7f7]" contentContainerClassName="pb-6">
        <View className="h-[185px] overflow-hidden rounded-b-[25px] bg-[#008447]">
          <Image
            contentFit="cover"
            source={images.alobo.homeHeader}
            style={{ bottom: 0, left: 0, opacity: 0.55, position: "absolute", right: 0, top: 0 }}
          />

          <Touch
            accessibilityLabel="Quay lại tài khoản"
            className="absolute left-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-[#005b36]/80"
            onPress={() => router.navigate("/account")}
          >
            <ArrowLeft color="#ffffff" size={21} strokeWidth={2.5} />
          </Touch>

          <Touch
            accessibilityLabel="Đổi ảnh đại diện"
            className="absolute right-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-[#005b36]/80"
          >
            <Camera color="#ffffff" size={18} />
          </Touch>

          <View className="absolute inset-x-3 bottom-3 rounded-[18px] bg-white/90 px-4 py-3" style={shadow.card}>
            <View className="flex-row items-start gap-3">
              <View className="h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6471d9]">
                <Text className="text-[26px] uppercase text-white">{profile?.avatarInitial ?? profileContent.avatarInitial}</Text>
                <View className="absolute -bottom-1 -right-1 h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#5360ad]">
                  <Camera color="#ffffff" size={11} />
                </View>
              </View>
              <View className="min-w-0 flex-1">
                <View className="flex-row items-center gap-1">
                  <Text className="text-[18px] font-semibold text-[#18221e]" numberOfLines={1}>
                    {profile?.fullName ?? profileContent.name}
                  </Text>
                  <BadgeCheck color="#7d8581" size={16} />
                </View>
                <View className="mt-1 flex-row items-center gap-1 self-start rounded bg-white px-2 py-1">
                  <aloboIcons.email color="#57625c" height={14} width={14} />
                  <Text className="text-[12px] text-[#57625c]">{profile?.email ?? profileContent.emailPrompt}</Text>
                </View>
              </View>
            </View>

            <View className="mt-2 flex-row">
              <View className="flex-1 flex-row items-center justify-center gap-1">
                <aloboIcons.phoneOutline color="#56605b" height={15} width={15} />
                <Text className="text-[12px] text-[#56605b]">{profile?.phone ?? profileContent.phone}</Text>
              </View>
              <View className="flex-1 flex-row items-center justify-center gap-1">
                <aloboIcons.calendar color="#56605b" height={15} width={15} />
                <View>
                  <Text className="text-[12px] text-[#56605b]">{profileContent.yearLabel}</Text>
                  <Text className="text-[14px] font-bold text-[#1c2822]">{orDash(profile?.birthYear)}</Text>
                </View>
              </View>
              <View className="flex-1 flex-row items-center justify-center gap-1">
                <aloboIcons.gender color="#56605b" height={15} width={15} />
                <View>
                  <Text className="text-[12px] text-[#56605b]">{profileContent.genderLabel}</Text>
                  <Text className="text-[14px] font-bold text-[#1c2822]">{orDash(profile?.gender)}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="px-3 pt-4">
          <View className="flex-row overflow-hidden rounded-[10px] bg-[#008447] p-1">
            {(["overview", "links"] as const).map((tab) => (
              <Touch
                className={`h-8 flex-1 items-center justify-center rounded-[7px] ${activeTab === tab ? "bg-white" : ""}`}
                key={tab}
                onPress={() => setActiveTab(tab)}
              >
                <Text className={`text-[15px] font-semibold ${activeTab === tab ? "text-[#008447]" : "text-white"}`}>
                  {tab === "overview" ? profileContent.overview : "Liên kết"}
                </Text>
              </Touch>
            ))}
          </View>

          {activeTab === "overview" ? (
            <View className="mt-3 min-h-[520px] rounded-[10px] bg-white px-3 py-3">
              <View className="flex-row items-center">
                <Text className="flex-1 text-[15px] font-medium text-[#008447]">{profileContent.physicalTitle}</Text>
                <Touch accessibilityLabel="Chỉnh sửa thông tin thể chất" onPress={() => setEditSection("physical")}>
                  <aloboIcons.edit color="#008447" height={20} width={20} />
                </Touch>
              </View>

              <View className="mt-3 flex-row overflow-hidden rounded-[11px] border border-[#dce2df] py-2">
                <View className="flex-1 items-center border-r border-[#e7ebe9]">
                  <View className="flex-row items-center gap-1">
                    <Ruler color="#626b66" size={15} />
                    <Text className="text-[12px] text-[#626b66]">{profileContent.heightLabel}</Text>
                  </View>
                  <Text className="mt-1 text-[14px] font-bold text-[#1b2721]">{orDash(profile?.heightCm)}</Text>
                </View>
                <View className="flex-1 items-center">
                  <View className="flex-row items-center gap-1">
                    <Dumbbell color="#626b66" size={15} />
                    <Text className="text-[12px] text-[#626b66]">{profileContent.weightLabel}</Text>
                  </View>
                  <Text className="mt-1 text-[14px] font-bold text-[#1b2721]">{orDash(profile?.weightKg)}</Text>
                </View>
              </View>

              <Touch className="mt-3 flex-row items-start gap-1" onPress={() => setEditSection("note")}>
                <aloboIcons.note color="#18221e" height={17} width={17} />
                <View className="min-w-0 flex-1">
                  <Text className="text-[14px] font-medium text-[#18221e]">{profileContent.specialNote}</Text>
                  {profile.note ? <Text className="mt-0.5 text-[13px] text-[#68716d]">{profile.note}</Text> : null}
                </View>
              </Touch>

              <View className="mt-3 flex-row items-center">
                <Text className="flex-1 text-[15px] font-medium text-[#008447]">{profileContent.personalTitle}</Text>
                <Touch accessibilityLabel="Chỉnh sửa thông tin cá nhân" onPress={() => setEditSection("personal")}>
                  <aloboIcons.edit color="#008447" height={20} width={20} />
                </Touch>
              </View>

              <View className="mt-4 gap-3.5">
                {profileDetailItems.map((item) => {
                  const Icon = personalIcons[item.icon];

                  return (
                    <Touch className="flex-row items-center gap-1.5" key={item.id}>
                      <Icon color="#18221e" size={16} />
                      <Text className="text-[14px] text-[#18221e]">{item.label}</Text>
                    </Touch>
                  );
                })}
              </View>
            </View>
          ) : (
            <View className="mt-3 min-h-[520px] rounded-[10px] bg-white px-3 py-5">
              <Text className="text-center text-[14px] text-[#7d8581]">Chưa có tài khoản liên kết.</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {editSection ? (
        <ProfileEditSheet
          key={editSection}
          onClose={() => setEditSection(null)}
          onSave={saveProfile}
          profile={profile}
          section={editSection}
        />
      ) : null}
    </Screen>
  );
}
