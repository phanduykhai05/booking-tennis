import { Activity } from "lucide-react";

import type { ActivityEvent } from "@/components/admin/AdminData/types";

type RecentActivitiesProps = {
  activities: ActivityEvent[];
};

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_28px_-24px_rgba(15,23,42,0.55)] sm:p-5">
      <h2 className="text-base font-bold text-slate-900">Hoạt động gần đây</h2>
      <p className="mt-0.5 text-xs text-slate-500">Cập nhật từ vận hành sân và thanh toán</p>
      <ul className="mt-5 space-y-4">
        {activities.map((activity) => (
          <li className="flex gap-3" key={activity.id}>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><Activity aria-hidden="true" className="size-4" /></span>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-5 text-slate-700">{activity.message}</p>
              <p className="mt-0.5 text-[11px] text-slate-400">{new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit" }).format(new Date(activity.createdAt))}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
