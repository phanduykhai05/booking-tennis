import { useNavigate } from "react-router";
import { ArrowLeft, BellRing, CalendarDays, CheckCheck, Gift, Settings2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

import { notificationContent } from "@/components/notifications/NotificationCenter/content";
import type { AppNotification } from "@/components/notifications/NotificationCenter/types";
import { LoadingState } from "@/components/ui/Feedback";
import Touch from "@/components/ui/Pressable";
import Screen from "@/components/ui/Screen";
import { shadow } from "@/components/ui/theme";
import { getNotifications, markNotificationRead, markNotificationsRead } from "@/lib/api/endpoints";
import { useSession } from "@/lib/api/session";
import { todayInAppTimezone } from "@/lib/date";

const notificationIcons: Record<AppNotification["kind"], LucideIcon> = {
  booking: CalendarDays,
  promotion: Gift,
  system: BellRing,
};

const isToday = (value: string) => value.slice(0, 10) === todayInAppTimezone();

/** Trong ngày hiển thị giờ, ngày cũ hiển thị ngày/tháng. */
function formatTime(createdAt: string) {
  const date = new Date(createdAt);
  const pad = (value: number) => value.toString().padStart(2, "0");

  return isToday(createdAt)
    ? `${pad(date.getHours())}:${pad(date.getMinutes())}`
    : `${pad(date.getDate())}/${pad(date.getMonth() + 1)}`;
}

export default function NotificationCenter() {
  const navigate = useNavigate();
  const { isReady, token } = useSession();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  // setState nằm trong callback của promise để effect không cập nhật state ngay trong thân hàm.
  useEffect(() => {
    if (!isReady || !token) return;

    let isActive = true;

    getNotifications(token)
      .then((items) => {
        if (!isActive) return;
        setNotifications(
          items.map((item) => ({
            createdAt: item.createdAt,
            id: item.id,
            isRead: item.isRead,
            kind: item.kind,
            message: item.message,
            time: formatTime(item.createdAt),
            title: item.title,
          })),
        );
      })
      .catch(() => undefined)
      .finally(() => {
        if (isActive) setIsFetching(false);
      });

    return () => {
      isActive = false;
    };
  }, [isReady, token]);

  const isLoading = token ? isFetching : !isReady;
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const markAllRead = async () => {
    if (!token) return;
    setNotifications((items) => items.map((item) => ({ ...item, isRead: true })));
    await markNotificationsRead(token);
  };

  const markRead = async (id: string) => {
    if (!token) return;
    setNotifications((items) => items.map((item) => (item.id === id ? { ...item, isRead: true } : item)));
    await markNotificationRead(token, id);
  };

  const groups = [
    { heading: notificationContent.today, items: notifications.filter((item) => isToday(item.createdAt)) },
    { heading: notificationContent.earlier, items: notifications.filter((item) => !isToday(item.createdAt)) },
  ].filter((group) => group.items.length > 0);

  const emptyMessage = token ? notificationContent.empty : notificationContent.signInRequired;

  return (
    <Screen backgroundColor="#007b42" statusBarStyle="light">
      <div className="flex-1 bg-[#007b42]">
        {/* z-10 để menu cài đặt tràn xuống dưới không bị danh sách bên dưới vẽ đè. */}
        <div className="z-10 h-14 flex-row items-center justify-between px-3">
          <Touch accessibilityLabel="Quay lại" className="p-2" onPress={() => navigate("/home")}>
            <ArrowLeft color="#ffffff" size={22} />
          </Touch>
          <span className="text-[17px] font-semibold text-white">{notificationContent.title}</span>
          <div className="flex-row items-center gap-1">
            <Touch
              accessibilityLabel={notificationContent.allRead}
              className="p-2"
              disabled={unreadCount === 0}
              onPress={() => void markAllRead()}
            >
              <CheckCheck color="#ffffff" size={21} />
            </Touch>
            <Touch
              accessibilityLabel={notificationContent.settings}
              className="p-2"
              onPress={() => setSettingsOpen((isOpen) => !isOpen)}
            >
              <Settings2 color="#ffffff" size={20} />
            </Touch>
          </div>

          {isSettingsOpen ? (
            <div className="absolute right-3 top-12 z-10 w-52 rounded-lg bg-white p-3" style={shadow.raised}>
              <span className="text-[13px] font-bold text-[#007b42]">{notificationContent.settings}</span>
              <span className="mt-1 text-[13px] text-[#66736c]">Nhận thông báo lịch đặt sân và ưu đãi mới.</span>
            </div>
          ) : null}
        </div>

        {isLoading ? (
          <LoadingState label={notificationContent.loading} />
        ) : notifications.length === 0 ? (
          <span className="px-6 pt-24 text-center text-[15px] text-white">{emptyMessage}</span>
        ) : (
          <div className="grow shrink overflow-y-auto overflow-x-hidden">
            <div className="gap-5 px-3 pb-8 pt-3">
              {groups.map((group) => (
                <div key={group.heading}>
                  <span className="mb-2 px-1 text-[14px] font-semibold text-white/85">{group.heading}</span>
                  <div className="overflow-hidden rounded-xl bg-white" style={shadow.card}>
                    {group.items.map((notification, index) => {
                      const Icon = notificationIcons[notification.kind];

                      return (
                        <Touch
                          className={`flex-row gap-3 px-3 py-3 ${index + 1 < group.items.length ? "border-b border-[#e7eeea]" : ""}`}
                          key={notification.id}
                          onPress={() => void markRead(notification.id)}
                        >
                          <div
                            className={`h-10 w-10 shrink-0 items-center justify-center rounded-full ${notification.kind === "promotion" ? "bg-[#fff3d7]" : notification.kind === "booking" ? "bg-[#e1f7eb]" : "bg-[#eaf0ff]"}`}
                          >
                            <Icon
                              color={notification.kind === "promotion" ? "#df9000" : notification.kind === "booking" ? "#008447" : "#5269c7"}
                              size={20}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="pr-4 text-[14px] font-bold text-[#1b2f25]">{notification.title}</span>
                            <span className="mt-1 text-[12px] leading-4 text-[#65726b]">{notification.message}</span>
                            <span className="mt-1.5 text-[11px] text-[#87918c]">{notification.time}</span>
                          </div>
                          {!notification.isRead ? (
                            <div aria-label="Chưa đọc" className="absolute right-3 top-4 h-2 w-2 rounded-full bg-[#ef3d55]" />
                          ) : null}
                        </Touch>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Screen>
  );
}
