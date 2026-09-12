import type { Banner } from "@/components/featured/FeaturedScreen/types";
import images from "@/components/assets/images";

export const featuredBanners: Banner[] = [
  {
    alt: "Swin Pickleball Quận 7, ưu đãi tháng 8 từ 105K một giờ",
    aspectRatio: 903 / 453,
    id: "swin-pickleball-quan-7",
    source: images.featured.swinPickleballQuan7,
  },
  {
    alt: "Swin Pickleball Club, sân từ 80K một giờ và xé vé từ 50K một vé",
    aspectRatio: 901 / 452,
    id: "swin-pickleball-club",
    source: images.featured.swinPickleballClub,
  },
  {
    alt: "Coco Pickle Club, giải nhiệt mùa hè, giá chỉ từ 110K",
    aspectRatio: 905 / 455,
    id: "coco-pickle-club-summer",
    source: images.featured.cocoPickleClubSummer,
  },
  {
    alt: "Myrehab Matsuoka, đừng để chấn thương kết thúc cuộc chơi",
    aspectRatio: 911 / 458,
    id: "myrehab-matsuoka",
    source: images.featured.myrehabMatsuoka,
  },
];
