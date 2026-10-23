import type { ActivityEvent, ActivityType } from "@/components/admin/AdminData/types";
import Card from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/Feedback";

type RecentActivitiesProps = {
  activities: ActivityEvent[];
};

const activityColor: Record<ActivityType, string> = {
  "booking-created": "#10b981",
  "booking-updated": "#0ea5e9",
  "court-updated": "#f59e0b",
  "payment-updated": "#8b5cf6",
};

const pad = (value: number) => value.toString().padStart(2, "0");

function formatTime(value: string) {
  const date = new Date(value);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <Card className="h-full" description="Cập nhật từ vận hành sân và thanh toán" title="Hoạt động gần đây">
      {activities.length === 0 ? (
        <EmptyState description="Chưa có hoạt động nào" />
      ) : (
        <div>
          {activities.map((activity, index) => (
            <div className="flex-row gap-3" key={activity.id}>
              <div className="items-center">
                <div className="mt-1.5 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: activityColor[activity.type] }} />
                {index + 1 < activities.length ? <div className="w-px flex-1 bg-slate-200" /> : null}
              </div>
              <div className="flex-1 pb-4">
                <span className="text-[14px] text-slate-800">{activity.message}</span>
                <span className="text-[12px] text-slate-500">{formatTime(activity.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
