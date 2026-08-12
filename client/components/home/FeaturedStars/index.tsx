import SectionHeader from "@/components/home/FeaturedStars/components/SectionHeader";
import StarsCarousel from "@/components/home/FeaturedStars/components/StarsCarousel";
import styles from "@/components/home/FeaturedStars/FeaturedStars.module.css";
import { featuredStarsMockData } from "@/components/home/FeaturedStars/mockData";

export default function FeaturedStars() {
  return (
    <section className={styles.section}>
      <div className={styles.background} style={{ backgroundImage: `url(${featuredStarsMockData.backgroundImage})` }} />
      <div className="mx-auto w-full max-w-[1245px]">
        <SectionHeader
          href={featuredStarsMockData.seeMoreHref}
          linkLabel={featuredStarsMockData.seeMoreLabel}
          title={featuredStarsMockData.title}
        />
        <StarsCarousel items={featuredStarsMockData.items} />
      </div>
    </section>
  );
}
