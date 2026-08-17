"use client";

import { ArrowLeft, BellRing, CalendarDays, CheckCheck, Gift, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { notificationContent } from "@/components/notifications/NotificationCenter/content";
import type { AppNotification } from "@/components/notifications/NotificationCenter/types";
import { getNotifications, markNotificationRead, markNotificationsRead } from "@/lib/api/endpoints";
import { useSession } from "@/lib/api/session";

const notificationIcons = {
  booking: CalendarDays,
  promotion: Gift,
  system: BellRing,
};

const isToday = (value: string) => value.slice(0, 10) === new Date().toISOString().slice(0, 10);

/** Trong ngày hiển thị giờ, ngày cũ hiển thị ngày/tháng. */
function formatTime(createdAt: string) {
  const date = new Date(createdAt);

  return isToday(createdAt)
    ? `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    : `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}`;
}

export default function NotificationCenter() {
  const router = useRouter();
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

  const groups: { heading: string; items: AppNotification[] }[] = [
    { heading: notificationContent.today, items: notifications.filter((item) => isToday(item.createdAt)) },
    { heading: notificationContent.earlier, items: notifications.filter((item) => !isToday(item.createdAt)) },
  ].filter((group) => group.items.length > 0);

  const emptyMessage = token ? notificationContent.empty : notificationContent.signInRequired;

  return (
    <main className="min-h-[100dvh] w-screen bg-[#007b42] text-white">
      <header className="relative flex h-14 items-center justify-between px-3">
        <button aria-label="Quay lại" className="p-2" onClick={() => router.push("/home")} type="button"><ArrowLeft size={22} /></button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold">{notificationContent.title}</h1>
        <div className="flex items-center gap-1">
          <button aria-label={notificationContent.allRead} className="relative p-2" disabled={unreadCount === 0} onClick={() => void markAllRead()} type="button"><CheckCheck size={21} /><span className="sr-only">{notificationContent.allRead}</span></button>
          <button aria-expanded={isSettingsOpen} aria-label={notificationContent.settings} className="p-2" onClick={() => setSettingsOpen((isOpen) => !isOpen)} type="button"><Settings2 size={20} /></button>
        </div>
        {isSettingsOpen && <div className="absolute right-3 top-12 z-10 w-52 rounded-lg bg-white p-3 text-[13px] text-[#1e3329] shadow-[0_8px_18px_rgba(0,45,24,.3)]"><b className="block text-[#007b42]">{notificationContent.settings}</b><p className="mt-1 text-[#66736c]">Nhận thông báo lịch đặt sân và ưu đãi mới.</p></div>}
      </header>

      <div className="px-3 pb-8 pt-3">
        {isLoading ? <p className="pt-[45dvh] text-center text-[15px]">{notificationContent.loading}</p> : notifications.length === 0 ? <p className="pt-[45dvh] text-center text-[15px]">{emptyMessage}</p> : <div className="space-y-5">
          {groups.map((group) => <section key={group.heading}><h2 className="mb-2 px-1 text-[14px] font-semibold text-white/85">{group.heading}</h2><div className="overflow-hidden rounded-xl bg-white shadow-[0_3px_10px_rgba(0,61,32,.16)]">{group.items.map((notification, index) => { const Icon = notificationIcons[notification.kind]; return <button className={`relative flex w-full gap-3 px-3 py-3 text-left text-[#1b2f25] transition hover:bg-[#f1fbf5] ${index + 1 < group.items.length ? "border-b border-[#e7eeea]" : ""}`} key={notification.id} onClick={() => void markRead(notification.id)} type="button"><span className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full ${notification.kind === "promotion" ? "bg-[#fff3d7] text-[#df9000]" : notification.kind === "booking" ? "bg-[#e1f7eb] text-[#008447]" : "bg-[#eaf0ff] text-[#5269c7]"}`}><Icon size={20} /></span><span className="min-w-0 flex-1"><b className="block pr-4 text-[14px]">{notification.title}</b><span className="mt-1 block text-[12px] leading-4 text-[#65726b]">{notification.message}</span><span className="mt-1.5 block text-[11px] text-[#87918c]">{notification.time}</span></span>{!notification.isRead && <span aria-label="Chưa đọc" className="absolute right-3 top-4 size-2 rounded-full bg-[#ef3d55]" />}</button>; })}</div></section>)}
        </div>}
      </div>
    </main>
  );
}
