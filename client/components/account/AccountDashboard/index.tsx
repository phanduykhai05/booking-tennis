import { ChevronRight, Crown, LockKeyhole, LogOut, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import DashboardList from "@/components/account/AccountDashboard/components/DashboardList";
import {
  accountDashboardContent,
  accountShortcuts,
  activityItems,
  systemItems,
} from "@/components/account/AccountDashboard/content";
import images from "@/components/assets/images";
import BookingHistory from "@/components/booking/BookingHistory";
import PublicFooter from "@/components/layouts/PublicFooter";
import Touch from "@/components/ui/Pressable";
import Screen from "@/components/ui/Screen";
import { shadow } from "@/components/ui/theme";
import { getProfile } from "@/lib/api/endpoints";
import { useSession } from "@/lib/api/session";

const shortcutHrefs: Record<string, string> = {
  booking: "/bookings",
  course: "/discover?type=course",
  notification: "/notifications",
  offer: "/discover?type=offer",
};

/** Mục nào đã có màn hình thật thì điều hướng; mục còn lại chờ contract dữ liệu. */
const activityHrefs: Record<string, string> = {
  payments: "/account/payments",
  tickets: "/account/tickets",
};

export default function AccountDashboard() {
  const navigate = useNavigate();
  const { isReady, session, signOut, token, updateUser } = useSession();
  const [isAlertVisible, setAlertVisible] = useState(true);
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

  return (
    <Screen backgroundColor="#027a45" statusBarStyle="light">
      <div className="flex-1 bg-[#eaf8f1]">
        {/* Desktop như bản gốc: panel tài khoản 470px bên trái, danh sách đặt lịch bên phải. */}
        <div className="flex-1 lg:flex-row">
        <div className="grow shrink overflow-y-auto overflow-x-hidden lg:w-[470px] lg:flex-none">
          <div className="pb-32">
            <div className="h-[146px] overflow-hidden bg-[#027a45] px-6 pt-5">
              <img
                alt=""
                className="object-cover"
                src={images.alobo.homeHeader}
                style={{ bottom: 0, height: "100%", left: 0, opacity: 0.4, position: "absolute", right: 0, top: 0, width: "100%" }}
              />

              <Touch
                className="w-full flex-row items-center gap-3 rounded-lg border border-[#edaf17] bg-white/15 p-3"
                onPress={() => navigate(profile ? "/account/profile" : "/login")}
              >
                <div className="h-10 w-10 items-center justify-center rounded-full bg-[#656ad5]">
                  <span className="text-[22px] uppercase text-white">
                    {profile?.avatarInitial ?? accountDashboardContent.guestInitial}
                  </span>
                </div>
                <div className="flex-1">
                  <span className="text-[15px] font-bold text-white">{profile?.fullName ?? accountDashboardContent.guestName}</span>
                  <span className="mt-1 text-[13px] text-white/90">{profile?.email ?? accountDashboardContent.emailPrompt}</span>
                </div>
                <ChevronRight color="#ffffff" size={20} />
              </Touch>

              <Touch className="mt-5 flex-row items-center gap-2">
                <Crown color="#ffe141" fill="#ffe141" size={23} />
                <span className="text-[15px] font-bold text-white">{accountDashboardContent.membership}</span>
                <ChevronRight color="#ffffff" size={17} />
              </Touch>
            </div>

            <div className="-mt-3 rounded-t-[18px] bg-[#eaf8f1] px-6 pt-6">
              <div className="flex-row gap-2 rounded-xl border border-[#d3e9de] bg-[#effaf4] p-3">
                {accountShortcuts.map((shortcut) => (
                  <Touch
                    className="min-h-[62px] flex-1 items-center justify-center gap-1 rounded-lg border border-[#349c6c] bg-white"
                    key={shortcut.id}
                    onPress={() => {
                      const href = shortcutHrefs[shortcut.id];
                      if (href) navigate(href);
                    }}
                    style={shadow.card}
                  >
                    <img alt="" className="object-cover" src={images.alobo.profileShortcuts[shortcut.id]} style={{ height: 28, width: 28 }} />
                    <span className="text-center text-[12px] font-medium text-[#075038]">{shortcut.label}</span>
                  </Touch>
                ))}
              </div>

              <div className="mt-5">
                <span className="mb-3 text-[16px] font-bold text-[#008447]">{accountDashboardContent.activityTitle}</span>
                <DashboardList
                  items={activityItems}
                  onSelect={(itemId) => {
                    const href = activityHrefs[itemId];
                    if (href) navigate(href);
                  }}
                />
              </div>

              <div className="mt-5">
                <span className="mb-3 text-[16px] font-bold text-[#008447]">{accountDashboardContent.systemTitle}</span>
                <DashboardList items={systemItems} />
              </div>

              {isAlertVisible ? (
                <div className="mt-5 overflow-hidden rounded-lg border border-[#ffe0a0] bg-white p-3">
                  <img
                    alt=""
                    className="object-cover"
                    src={images.alobo.alertBackground}
                    style={{ bottom: 0, height: "100%", left: 0, opacity: 0.45, position: "absolute", right: 0, top: 0, width: "100%" }}
                  />
                  <Touch accessibilityLabel="Đóng cảnh báo" className="absolute right-2 top-2 p-1" onPress={() => setAlertVisible(false)}>
                    <X color="#007544" size={16} />
                  </Touch>
                  <div className="flex-row gap-2 pr-6">
                    <LockKeyhole color="#e8a900" size={22} />
                    <div className="flex-1">
                      <span className="text-[13px] font-bold text-[#007544]">{accountDashboardContent.securityTitle}</span>
                      <span className="mt-1 text-[12px] text-[#486459]">{accountDashboardContent.securityDescription}</span>
                      <Touch className="mt-1 self-start rounded border border-[#ecac1c] px-2 py-1">
                        <span className="text-[12px] text-[#de9700]">{accountDashboardContent.setupNow}</span>
                      </Touch>
                    </div>
                  </div>
                </div>
              ) : null}

              <Touch
                className="mt-5 h-11 w-full flex-row items-center justify-center gap-2 rounded-lg border border-[#e0574f]"
                onPress={() => {
                  if (profile) signOut();
                  navigate("/login");
                }}
              >
                <LogOut color="#e0574f" size={17} />
                <span className="text-[14px] font-semibold text-[#e0574f]">
                  {profile ? accountDashboardContent.signOut : accountDashboardContent.signIn}
                </span>
              </Touch>

              <span className="mt-2 text-right text-[12px] text-[#929a96]">{accountDashboardContent.version}</span>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-1">
          <BookingHistory embedded />
        </div>
        </div>

        <PublicFooter activeItemId="account" />
      </div>
    </Screen>
  );
}
