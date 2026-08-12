import EventPeriodTabs from "@/components/home/UpcomingEvents/components/EventPeriodTabs";
import { upcomingEventsMockData } from "@/components/home/UpcomingEvents/mockData";

export default function UpcomingEvents() {
  return (
    <section aria-label="Sự kiện sắp diễn ra" className="my-14 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-[1245px]">
        <EventPeriodTabs {...upcomingEventsMockData} />
      </div>
    </section>
  );
}
