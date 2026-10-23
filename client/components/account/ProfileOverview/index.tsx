import { ArrowLeft, BadgeCheck, CalendarDays, Camera, CircleDot, Dumbbell, Ruler, Target, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { LucideIcon } from "lucide-react";

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
  const navigate = useNavigate();
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
        <div className="flex-1 bg-[#f7f7f7]">
          {isReady && !token ? (
            <span className="px-6 pt-24 text-center text-[15px] text-[#68716d]">{profileContent.signInRequired}</span>
          ) : (
            <LoadingState label={profileContent.loading} />
          )}
        </div>
      </Screen>
    );
  }

  return (
    <Screen backgroundColor="#008447" statusBarStyle="light">
      <div className="grow shrink overflow-y-auto overflow-x-hidden flex-1 bg-[#f7f7f7]">
        <div className="pb-6">
          <div className="h-[185px] overflow-hidden rounded-b-[25px] bg-[#008447]">
            <img
              alt=""
              className="object-cover"
              src={images.alobo.homeHeader}
              style={{ bottom: 0, height: "100%", left: 0, opacity: 0.55, position: "absolute", right: 0, top: 0, width: "100%" }}
            />

            <Touch
              accessibilityLabel="Quay lại tài khoản"
              className="absolute left-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-[#005b36]/80"
              onPress={() => navigate("/account")}
            >
              <ArrowLeft color="#ffffff" size={21} strokeWidth={2.5} />
            </Touch>

            <Touch
              accessibilityLabel="Đổi ảnh đại diện"
              className="absolute right-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-[#005b36]/80"
            >
              <Camera color="#ffffff" size={18} />
            </Touch>

            <div className="absolute inset-x-3 bottom-3 rounded-[18px] bg-white/90 px-4 py-3" style={shadow.card}>
              <div className="flex-row items-start gap-3">
                <div className="h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#6471d9]">
                  <span className="text-[26px] uppercase text-white">{profile?.avatarInitial ?? profileContent.avatarInitial}</span>
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#5360ad]">
                    <Camera color="#ffffff" size={11} />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex-row items-center gap-1">
                    <span className="truncate text-[18px] font-semibold text-[#18221e]">
                      {profile?.fullName ?? profileContent.name}
                    </span>
                    <BadgeCheck color="#7d8581" size={16} />
                  </div>
                  <div className="mt-1 flex-row items-center gap-1 self-start rounded bg-white px-2 py-1">
                    <aloboIcons.email color="#57625c" height={14} width={14} />
                    <span className="text-[12px] text-[#57625c]">{profile?.email ?? profileContent.emailPrompt}</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 flex-row">
                <div className="flex-1 flex-row items-center justify-center gap-1">
                  <aloboIcons.phoneOutline color="#56605b" height={15} width={15} />
                  <span className="text-[12px] text-[#56605b]">{profile?.phone ?? profileContent.phone}</span>
                </div>
                <div className="flex-1 flex-row items-center justify-center gap-1">
                  <aloboIcons.calendar color="#56605b" height={15} width={15} />
                  <div>
                    <span className="text-[12px] text-[#56605b]">{profileContent.yearLabel}</span>
                    <span className="text-[14px] font-bold text-[#1c2822]">{orDash(profile?.birthYear)}</span>
                  </div>
                </div>
                <div className="flex-1 flex-row items-center justify-center gap-1">
                  <aloboIcons.gender color="#56605b" height={15} width={15} />
                  <div>
                    <span className="text-[12px] text-[#56605b]">{profileContent.genderLabel}</span>
                    <span className="text-[14px] font-bold text-[#1c2822]">{orDash(profile?.gender)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-3 pt-4">
            <div className="flex-row overflow-hidden rounded-[10px] bg-[#008447] p-1">
              {(["overview", "links"] as const).map((tab) => (
                <Touch
                  className={`h-8 flex-1 items-center justify-center rounded-[7px] ${activeTab === tab ? "bg-white" : ""}`}
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                >
                  <span className={`text-[15px] font-semibold ${activeTab === tab ? "text-[#008447]" : "text-white"}`}>
                    {tab === "overview" ? profileContent.overview : "Liên kết"}
                  </span>
                </Touch>
              ))}
            </div>

            {activeTab === "overview" ? (
              <div className="mt-3 min-h-[520px] rounded-[10px] bg-white px-3 py-3">
                <div className="flex-row items-center">
                  <span className="flex-1 text-[15px] font-medium text-[#008447]">{profileContent.physicalTitle}</span>
                  <Touch accessibilityLabel="Chỉnh sửa thông tin thể chất" onPress={() => setEditSection("physical")}>
                    <aloboIcons.edit color="#008447" height={20} width={20} />
                  </Touch>
                </div>

                <div className="mt-3 flex-row overflow-hidden rounded-[11px] border border-[#dce2df] py-2">
                  <div className="flex-1 items-center border-r border-[#e7ebe9]">
                    <div className="flex-row items-center gap-1">
                      <Ruler color="#626b66" size={15} />
                      <span className="text-[12px] text-[#626b66]">{profileContent.heightLabel}</span>
                    </div>
                    <span className="mt-1 text-[14px] font-bold text-[#1b2721]">{orDash(profile?.heightCm)}</span>
                  </div>
                  <div className="flex-1 items-center">
                    <div className="flex-row items-center gap-1">
                      <Dumbbell color="#626b66" size={15} />
                      <span className="text-[12px] text-[#626b66]">{profileContent.weightLabel}</span>
                    </div>
                    <span className="mt-1 text-[14px] font-bold text-[#1b2721]">{orDash(profile?.weightKg)}</span>
                  </div>
                </div>

                <Touch className="mt-3 flex-row items-start gap-1" onPress={() => setEditSection("note")}>
                  <aloboIcons.note color="#18221e" height={17} width={17} />
                  <div className="min-w-0 flex-1">
                    <span className="text-[14px] font-medium text-[#18221e]">{profileContent.specialNote}</span>
                    {profile.note ? <span className="mt-0.5 text-[13px] text-[#68716d]">{profile.note}</span> : null}
                  </div>
                </Touch>

                <div className="mt-3 flex-row items-center">
                  <span className="flex-1 text-[15px] font-medium text-[#008447]">{profileContent.personalTitle}</span>
                  <Touch accessibilityLabel="Chỉnh sửa thông tin cá nhân" onPress={() => setEditSection("personal")}>
                    <aloboIcons.edit color="#008447" height={20} width={20} />
                  </Touch>
                </div>

                <div className="mt-4 gap-3.5">
                  {profileDetailItems.map((item) => {
                    const Icon = personalIcons[item.icon];

                    return (
                      <Touch className="flex-row items-center gap-1.5" key={item.id}>
                        <Icon color="#18221e" size={16} />
                        <span className="text-[14px] text-[#18221e]">{item.label}</span>
                      </Touch>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mt-3 min-h-[520px] rounded-[10px] bg-white px-3 py-5">
                <span className="text-center text-[14px] text-[#7d8581]">Chưa có tài khoản liên kết.</span>
              </div>
            )}
          </div>
        </div>
      </div>

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
