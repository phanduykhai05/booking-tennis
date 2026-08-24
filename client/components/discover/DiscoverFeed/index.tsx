import { Image } from "expo-image";
import { BookOpen, Crown, Megaphone, Ticket } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";

import images from "@/components/assets/images";
import DiscoverPostCard from "@/components/discover/DiscoverFeed/components/DiscoverPostCard";
import { discoverContent, discoverFilters } from "@/components/discover/DiscoverFeed/content";
import type { DiscoverFilter, DiscoverPost } from "@/components/discover/DiscoverFeed/types";
import PublicFooter from "@/components/layouts/PublicFooter";
import Touch from "@/components/ui/Pressable";
import Screen from "@/components/ui/Screen";

const filterIcons: Record<DiscoverFilter["id"], LucideIcon | null> = {
  all: null,
  course: BookOpen,
  events: Ticket,
  member: Crown,
  notifications: Megaphone,
  offers: Crown,
};

type DiscoverFeedProps = {
  posts: DiscoverPost[];
};

function matchesFilter(post: DiscoverPost, filter: DiscoverFilter["id"]) {
  if (filter === "all") return true;
  if (filter === "notifications") return post.type === "course" || post.type === "offer";
  if (filter === "offers") return post.type === "offer";
  if (filter === "events") return post.type === "event";
  return post.type === filter;
}

export default function DiscoverFeed({ posts }: DiscoverFeedProps) {
  const [activeFilter, setActiveFilter] = useState<DiscoverFilter["id"]>("all");
  const visiblePosts = posts.filter((post) => matchesFilter(post, activeFilter));

  return (
    <Screen backgroundColor="#ffffff">
      <View className="flex-1 bg-[#f7f7f7]">
        <View className="border-t-[3px] border-[#24312d] bg-white px-5 pb-2 pt-2">
          <Text className="text-[20px] font-black italic tracking-wide text-[#08a948]">{discoverContent.discover}</Text>
          <ScrollView className="mt-2" contentContainerClassName="flex-row gap-2" horizontal showsHorizontalScrollIndicator={false}>
            {discoverFilters.map((filter) => {
              const Icon = filterIcons[filter.id];
              const isActive = activeFilter === filter.id;

              return (
                <Touch
                  className={`h-8 flex-row items-center gap-1 rounded-xl border px-3 ${isActive ? "border-[#008447] bg-[#e5f8ee]" : "border-[#d8dcda] bg-white"}`}
                  key={filter.id}
                  onPress={() => setActiveFilter(filter.id)}
                >
                  {Icon ? <Icon color={isActive ? "#007b44" : "#858a88"} size={15} /> : null}
                  <Text className={`text-[13px] ${isActive ? "font-bold text-[#007b44]" : "text-[#858a88]"}`}>{filter.label}</Text>
                </Touch>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView contentContainerClassName="pb-32">
          {visiblePosts.length === 0 ? (
            <Text className="py-16 text-center text-[14px] text-[#68716d]">{discoverContent.empty}</Text>
          ) : (
            visiblePosts.map((post, index) => (
              <View key={post.id}>
                <DiscoverPostCard contactLabel={discoverContent.contact} moreLabel={discoverContent.more} post={post} />
                {index === 0 ? (
                  <View className="mx-4 my-3 h-[95px] items-center justify-center overflow-hidden rounded-xl bg-[#00ab19]">
                    <View className="absolute -left-2 top-0 h-24 w-24 rounded-full border-2 border-white/90" />
                    <View className="absolute -right-2 top-0 h-24 w-24 rounded-full border-2 border-white/90" />
                    <Image
                      contentFit="contain"
                      source={images.sports.badminton}
                      style={{ height: 64, left: 40, position: "absolute", top: 8, transform: [{ rotate: "-35deg" }], width: 64 }}
                    />
                    <Image
                      contentFit="contain"
                      source={images.sports.badminton}
                      style={{ bottom: 0, height: 64, position: "absolute", right: 40, transform: [{ rotate: "35deg" }], width: 64 }}
                    />
                    <Text className="text-[25px] font-black italic tracking-wide text-[#fff12e]">CẦU LÔNG</Text>
                  </View>
                ) : null}
              </View>
            ))
          )}
        </ScrollView>

        <PublicFooter activeItemId="discover" />
      </View>
    </Screen>
  );
}
