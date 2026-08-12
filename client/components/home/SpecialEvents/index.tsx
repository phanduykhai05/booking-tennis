import EventsCarousel from "@/components/home/SpecialEvents/components/EventsCarousel";
import { specialEventsMockData } from "@/components/home/SpecialEvents/mockData";

export default function SpecialEvents() {
  return (
    <section aria-labelledby="special-events-title" className="px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-[1245px]">
        <h2 className="mb-3 text-base font-bold text-white" id="special-events-title">
          {specialEventsMockData.title}
        </h2>
        <EventsCarousel items={specialEventsMockData.items} />
      </div>
    </section>
  );
}
