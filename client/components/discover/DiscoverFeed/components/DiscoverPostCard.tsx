import { Image } from "expo-image";
import { ChevronRight, CircleDollarSign, MapPin, Phone, Share2, Trophy, UserRound } from "lucide-react-native";
import { Text, View } from "react-native";

import images from "@/components/assets/images";
import type { DiscoverPost } from "@/components/discover/DiscoverFeed/types";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";

type DiscoverPostCardProps = {
  contactLabel: string;
  moreLabel: string;
  post: DiscoverPost;
};

const postTitles: Record<DiscoverPost["type"], string> = {
  course: "Huấn luyện viên chuyên nghiệp tại sân",
  "empty-court": "🔥 Ưu đãi sân trống trong hôm nay",
  event: "🔥 Sự kiện mới",
  member: "🔥 Ưu đãi gói hội viên mới",
  offer: "🔥 Ưu đãi sân trống trong hôm nay",
};

function VenueIntro({ post }: { post: DiscoverPost }) {
  return (
    <View>
      <View className="flex-row gap-3">
        <View className="h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff3da]">
          <Text className="text-[22px]">🏸</Text>
        </View>
        <View className="min-w-0 flex-1">
          <Text className="text-[15px] font-semibold text-[#202c28]">{post.venue}</Text>
          <View className="mt-1 flex-row items-center gap-1">
            <MapPin color="#008447" size={13} />
            <Text className="flex-1 text-[12px] text-[#4f5b56]" numberOfLines={1}>
              (3.9km) 2 Đường Lê Quát, Tân Phú, Hồ Chí Minh
            </Text>
          </View>
          <Text className="mt-1 text-[12px] text-[#626b67]">{post.date}</Text>
        </View>
      </View>
      <Text className="mt-3 text-[15px] font-medium text-[#263a32]">{postTitles[post.type]}</Text>
      <Text className="text-[13px] text-[#008447]">{post.labels.join(" ")}</Text>
    </View>
  );
}

function CourseCard({ contactLabel }: { contactLabel: string }) {
  return (
    <View className="mt-2 rounded-[13px] bg-[#e4f7ee] p-[7px]">
      <View className="rounded-[11px] border border-[#d7e2dc] bg-white px-2.5 pb-2 pt-1.5">
        <View className="h-6 flex-row items-center gap-2">
          <View className="h-5 w-5 items-center justify-center rounded-full bg-[#008447]">
            <Text className="text-[11px] font-bold text-white">1</Text>
          </View>
          <Text className="rounded bg-[#ffe6e7] px-2 py-1 text-[14px] font-semibold text-[#dc334c]">Khóa học</Text>
        </View>

        <Text className="mt-1 text-[16px] font-semibold leading-5 text-[#183127]">Lớp học Cầu lông</Text>
        <Text className="text-[14px] font-medium leading-5 text-[#007b45]">
          16:00 - 18:00 <Text className="text-[#303b36]">| T7, CN</Text>
        </Text>
        <View className="mt-1 flex-row items-center gap-1">
          <CircleDollarSign color="#008447" size={16} />
          <Text className="text-[14px] text-[#183127]">
            Chỉ từ <Text className="font-bold text-[#007a45]">750.000 ₫/Tháng</Text>
          </Text>
        </View>
        <View className="mt-0.5 flex-row items-center gap-1">
          <Phone color="#008447" size={15} />
          <Text className="text-[14px] text-[#183127]">+84 789314698</Text>
        </View>

        <View className="mt-2 min-h-9 flex-row items-center border-t border-[#d0e0d7] pt-1.5">
          <UserRound color="#008447" size={17} />
          <View className="ml-1.5 flex-1">
            <Text className="text-[13px] leading-4 text-[#183127]">Huấn luyện viên:</Text>
            <Text className="text-[13px] font-semibold leading-4 text-[#183127]">Phương Thị Thanh</Text>
          </View>
          <Touch className="mr-2">
            <Text className="text-[13px] font-medium text-[#008447]">{contactLabel}</Text>
          </Touch>
          <ChevronRight color="#008447" size={17} />
        </View>

        <View className="absolute -right-px top-[54px] h-10 w-10 items-center justify-center rounded-full bg-[#e4f7ee]">
          <View className="h-7 w-7 items-center justify-center rounded-full bg-[#c92f47]">
            <Trophy color="#ffffff" size={17} strokeWidth={2.4} />
          </View>
        </View>
      </View>
    </View>
  );
}

function MemberCard() {
  return (
    <View className="mt-2 rounded-xl bg-[#e4f7ee] p-2">
      <View className="rounded-lg bg-white p-2">
        <View className="flex-row items-center gap-2">
          <View className="h-5 w-5 items-center justify-center rounded-full bg-[#008447]">
            <Text className="text-[11px] font-bold text-white">1</Text>
          </View>
          <Text className="rounded bg-[#d9ffeb] px-2 py-1 text-[12px] text-[#008447]">Thẻ hội viên</Text>
        </View>
        <Text className="mt-2 text-[13px] font-bold text-[#008447]">Social Tháng</Text>
        <Text className="text-[13px] text-[#183127]">Pickleball • T2 - T6</Text>
        <Text className="mt-2 text-[12px] text-[#5a6862]">▣ Mở bán: 01/06/2026 - 30/12/2026</Text>
        <View className="mt-2 flex-row">
          <View className="flex-1">
            <Text className="text-[12px] text-[#183127]">◷ Thời hạn</Text>
            <Text className="text-[12px] font-bold text-[#00914d]">1 Tháng</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[12px] text-[#183127]">◉ Miễn phí</Text>
            <Text className="text-[12px] font-bold text-[#f2a300]">20</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[12px] text-[#183127]">♧ Loại sân</Text>
            <Text className="text-[12px] font-bold text-[#f2a300]">Pickleball</Text>
          </View>
        </View>
        <View className="mt-3 flex-row items-center">
          <Text className="flex-1 text-[15px] font-bold text-[#007b45]">700.000 ₫</Text>
          <Touch className="flex-row items-center rounded-l-xl bg-[#00a345] px-4 py-2">
            <Text className="text-[12px] font-bold text-white">Đăng ký</Text>
            <ChevronRight color="#ffffff" size={14} />
          </Touch>
        </View>
      </View>
      <Touch className="mt-2 h-9 w-full flex-row items-center justify-center gap-1 rounded-lg border border-[#008447]">
        <Text className="text-[13px] text-[#007b45]">🌐 Khám phá ưu đãi khác tại chi nhánh</Text>
        <ChevronRight color="#007b45" size={15} />
      </Touch>
    </View>
  );
}

function OfferCard() {
  return (
    <View className="mt-2 rounded-xl bg-[#e4f7ee] p-2">
      <View className="rounded-lg bg-white p-2">
        <View className="flex-row items-center gap-2">
          <View className="h-5 w-5 items-center justify-center rounded-full bg-[#008447]">
            <Text className="text-[11px] font-bold text-white">1</Text>
          </View>
          <Text className="rounded bg-[#fff1db] px-2 py-1 text-[12px] text-[#f08a00]">Ưu đãi</Text>
        </View>
        <Text className="mt-2 text-[13px] font-bold text-[#183127]">Sân 1:</Text>
        <View className="flex-row items-center">
          <View className="flex-1">
            <Text className="text-[13px] text-[#008447]">20:00 - 22:00</Text>
            <Text className="text-[13px] text-[#4a5651]">17/08/2026</Text>
          </View>
          <View className="mr-2">
            <Text className="text-[13px] text-[#008447]">306.000 ₫</Text>
            <Text className="text-[13px] text-[#e35e63] line-through">360.000 ₫</Text>
          </View>
          <Touch className="rounded-lg bg-[#008447] px-3 py-2">
            <Text className="text-[12px] font-bold text-white">Đặt lịch</Text>
          </Touch>
        </View>
      </View>
    </View>
  );
}

function EventCard() {
  return (
    <View className="mt-2 overflow-hidden rounded-xl border border-[#008447] bg-[#edfbf5] p-2">
      <View className="min-h-[128px] rounded-lg bg-white p-2 pr-[104px]">
        <View className="flex-row flex-wrap gap-1">
          <Text className="rounded-full bg-[#2768e9] px-2 py-1 text-[11px] font-bold text-white">◷ Còn 2:07:29</Text>
          <Text className="rounded bg-[#fbf0ff] px-2 py-1 text-[11px] text-[#981fe3]">♧ Xẻ vé</Text>
          <Text className="rounded bg-[#ececec] px-2 py-1 text-[11px] text-[#183127]">#548</Text>
        </View>
        <View className="mt-2 flex-row gap-2">
          <View className="rounded-md border border-[#b7cfff] bg-[#f3f8ff] px-2 py-1">
            <Text className="text-center text-[13px] font-bold leading-6 text-[#1264ed]">17:00</Text>
            <Text className="text-center text-[13px] font-bold leading-6 text-[#1264ed]">20:00</Text>
            <Text className="text-center text-[11px] text-[#1264ed]">▣ Hôm nay</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[15px] font-bold text-[#183127]">Trình 2.5/ advanced players</Text>
            <Text className="mt-2 text-[13px] text-[#183127]">
              💎 <Text className="rounded-full bg-[#4b97f4] px-2 py-1 text-white">2.5 - 3.5</Text>
            </Text>
            <Text className="mt-2 text-[13px] text-[#008447]">♧ Pickleball 1 - 2 - 3 - 4</Text>
            <Text className="mt-1 text-[17px] font-bold text-[#f18a00]">
              60.000 ₫ <Text className="text-[13px] font-normal text-[#333333]">/ vé</Text>
            </Text>
          </View>
        </View>
        <Image
          contentFit="cover"
          source={images.venueCovers.pickleball}
          style={{ bottom: 0, position: "absolute", right: 0, top: 0, width: 100 }}
        />
        <View className="absolute right-2 top-2 rounded-full bg-white p-2" style={shadow.card}>
          <Share2 color="#183127" size={15} />
        </View>
      </View>
      <View className="mt-2 flex-row justify-between">
        <Touch className="rounded-full bg-white px-3 py-1">
          <Text className="text-[12px] text-[#666666]">⊙ Xem chi tiết</Text>
        </Touch>
        <Touch className="rounded border border-[#9bd9b8] bg-white px-4 py-1">
          <Text className="text-[12px] text-[#008447]">＋ Mua vé</Text>
        </Touch>
      </View>
    </View>
  );
}

export default function DiscoverPostCard({ contactLabel, moreLabel, post }: DiscoverPostCardProps) {
  return (
    <View className="border-b-[9px] border-[#d7eae1] bg-white px-4 pb-3 pt-3">
      <VenueIntro post={post} />
      {post.type === "course" ? (
        <CourseCard contactLabel={contactLabel} />
      ) : post.type === "member" ? (
        <MemberCard />
      ) : post.type === "offer" ? (
        <OfferCard />
      ) : post.type === "event" ? (
        <EventCard />
      ) : (
        <Text className="mt-2 text-[13px] text-[#183127]">{moreLabel}</Text>
      )}
    </View>
  );
}
