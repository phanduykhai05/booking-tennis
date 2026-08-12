import Image from "next/image";

import images from "@/components/assets/images";
import ResaleEventCard from "@/components/home/ResaleEvents/components/ResaleEventCard";
import styles from "@/components/home/ResaleEvents/ResaleEvents.module.scss";
import { resaleEventsMockData } from "@/components/home/ResaleEvents/mockData";

export default function ResaleEvents() {
  return (
    <section aria-label={resaleEventsMockData.brandAlt} className="px-4 sm:px-6">
      <div className="mx-auto w-full max-w-[1245px]">
        <div className={styles.section}>
          <Image alt="" className={styles.backgroundImage} src={images.bannermay} />
          <div className={styles.scrollArea}>
            <div className={styles.brand}>
              <Image alt={resaleEventsMockData.brandLabel} className={styles.brandImage} src={images.dog} />
            </div>
            {resaleEventsMockData.items.map((item) => <ResaleEventCard item={item} key={item.id} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
