import PublicFooter from "@/components/layouts/PublicFooter";
import PublicHeader from "@/components/layouts/PublicHeader";
import HomeBanner from "@/components/home/HomeBanner";
import FeaturedStars from "@/components/home/FeaturedStars";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <PublicHeader />
      <main className="flex-1 bg-[#2a2d34]">
        <HomeBanner />
        <FeaturedStars />
      </main>
      <PublicFooter />
    </div>
  );
}
