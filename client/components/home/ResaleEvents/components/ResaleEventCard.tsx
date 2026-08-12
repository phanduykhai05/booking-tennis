import { CalendarDays } from "lucide-react";

import ResaleMedia from "@/components/home/ResaleEvents/components/ResaleMedia";
import styles from "@/components/home/ResaleEvents/ResaleEvents.module.scss";
import type { ResaleEvent } from "@/components/home/ResaleEvents/types";

type ResaleEventCardProps = {
  item: ResaleEvent;
};

export default function ResaleEventCard({ item }: ResaleEventCardProps) {
  return (
    <article className={styles.eventCard}>
      <div className={styles.eventContent}>
        <div className={styles.poster}>
          <ResaleMedia alt={item.title} src={item.imageUrl} />
        </div>
        <div className={styles.eventInfo}>
          <h3 className={styles.eventTitle}>{item.title}</h3>
          <p className={styles.eventDate}>
            <CalendarDays aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />
            {item.date}
          </p>
        </div>
      </div>
    </article>
  );
}
