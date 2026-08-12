"use client";

import { useState } from "react";

import EventCard from "@/components/home/UpcomingEvents/components/EventCard";
import ChevronIcon from "@/components/home/UpcomingEvents/components/ChevronIcon";
import type { EventPeriod, EventPeriodConfig, UpcomingEvent } from "@/components/home/UpcomingEvents/types";

type EventPeriodTabsProps = {
  itemsByPeriod: Record<EventPeriod, UpcomingEvent[]>;
  periods: EventPeriodConfig[];
  seeMoreLabel: string;
};

export default function EventPeriodTabs({ itemsByPeriod, periods, seeMoreLabel }: EventPeriodTabsProps) {
  const [activePeriod, setActivePeriod] = useState<EventPeriod>(periods[0].id);

  return (
    <div>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div aria-label="Thời gian sự kiện" className="flex gap-5" role="tablist">
          {periods.map((period) => {
            const isActive = period.id === activePeriod;

            return (
              <button
                aria-controls={`events-${period.id}`}
                aria-selected={isActive}
                className={`relative pb-2 text-base font-semibold leading-5 outline-none transition-colors after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:rounded-full after:bg-[#2dc275] after:transition-transform ${isActive ? "text-[#ebebf0] after:scale-x-100" : "text-[#a6a6b0] after:scale-x-0 hover:text-[#ebebf0]"}`}
                id={`tab-${period.id}`}
                key={period.id}
                onClick={() => setActivePeriod(period.id)}
                role="tab"
                type="button"
              >
                {period.label}
              </button>
            );
          })}
        </div>
        <span className="flex shrink-0 items-center gap-1 text-xs leading-5 text-[#a6a6b0]">
          {seeMoreLabel}
          <ChevronIcon />
        </span>
      </div>
      <div aria-labelledby={`tab-${activePeriod}`} className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4" id={`events-${activePeriod}`} role="tabpanel">
        {itemsByPeriod[activePeriod].map((item) => <EventCard item={item} key={item.id} />)}
      </div>
    </div>
  );
}
