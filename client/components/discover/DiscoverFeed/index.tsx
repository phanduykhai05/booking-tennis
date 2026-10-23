import { BookOpen, Crown, Megaphone, Ticket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import images from "@/components/assets/images";
import DiscoverPostCard from "@/components/discover/DiscoverFeed/components/DiscoverPostCard";
import { discoverContent, discoverFilters } from "@/components/discover/DiscoverFeed/content";
import type { DiscoverFilterId, DiscoverPost } from "@/components/discover/DiscoverFeed/types";
import PublicFooter from "@/components/layouts/PublicFooter";
import { LoadingState } from "@/components/ui/Feedback";
import Touch from "@/components/ui/Pressable";
import Screen from "@/components/ui/Screen";

const filterIcons: Record<DiscoverFilterId, LucideIcon | null> = {
  all: null,
  course: BookOpen,
  events: Ticket,
  member: Crown,
  notifications: Megaphone,
  offers: Crown,
};

type DiscoverFeedProps = {
  activeFilter: DiscoverFilterId;
  isLoading?: boolean;
  onFilterChange: (filter: DiscoverFilterId) => void;
  posts: DiscoverPost[];
};

/**
 * "Thông báo" gộp hai loại bài nên API không lọc được bằng một `type`; màn hình
 * tải toàn bộ rồi lọc lại tại đây. Các bộ lọc còn lại đã được server lọc sẵn.
 */
function matchesFilter(post: DiscoverPost, filter: DiscoverFilterId) {
  if (filter === "notifications") return post.type === "course" || post.type === "offer";
  return true;
}

export default function DiscoverFeed({ activeFilter, isLoading = false, onFilterChange, posts }: DiscoverFeedProps) {
  const visiblePosts = posts.filter((post) => matchesFilter(post, activeFilter));

  return (
    <Screen backgroundColor="#ffffff">
      <div className="flex-1 bg-[#f7f7f7]">
        <div className="border-t-[3px] border-[#24312d] bg-white px-5 pb-2 pt-2">
          <span className="text-[20px] font-black italic tracking-wide text-[#08a948]">{discoverContent.discover}</span>
          <div className="grow shrink flex-row overflow-x-auto overflow-y-hidden [scrollbar-width:none] mt-2">
            <div className="flex-row gap-2">
              {discoverFilters.map((filter) => {
                const Icon = filterIcons[filter.id];
                const isActive = activeFilter === filter.id;

                return (
                  <Touch
                    className={`h-8 flex-row items-center gap-1 rounded-xl border px-3 ${isActive ? "border-[#008447] bg-[#e5f8ee]" : "border-[#d8dcda] bg-white"}`}
                    key={filter.id}
                    onPress={() => onFilterChange(filter.id)}
                  >
                    {Icon ? <Icon color={isActive ? "#007b44" : "#858a88"} size={15} /> : null}
                    <span className={`text-[13px] ${isActive ? "font-bold text-[#007b44]" : "text-[#858a88]"}`}>{filter.label}</span>
                  </Touch>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grow shrink overflow-y-auto overflow-x-hidden">
          <div className="pb-32">
            {isLoading ? (
              <LoadingState label={discoverContent.loading} />
            ) : visiblePosts.length === 0 ? (
              <span className="py-16 text-center text-[14px] text-[#68716d]">{discoverContent.empty}</span>
            ) : (
              visiblePosts.map((post, index) => (
                <div key={post.id}>
                  <DiscoverPostCard contactLabel={discoverContent.contact} moreLabel={discoverContent.more} post={post} />
                  {index === 0 ? (
                    <div className="mx-4 my-3 h-[95px] items-center justify-center overflow-hidden rounded-xl bg-[#00ab19]">
                      <div className="absolute -left-2 top-0 h-24 w-24 rounded-full border-2 border-white/90" />
                      <div className="absolute -right-2 top-0 h-24 w-24 rounded-full border-2 border-white/90" />
                      <img
                        alt=""
                        className="object-contain"
                        src={images.sports.badminton}
                        style={{ height: 64, left: 40, position: "absolute", top: 8, transform: "rotate(-35deg)", width: 64 }}
                      />
                      <img
                        alt=""
                        className="object-contain"
                        src={images.sports.badminton}
                        style={{ bottom: 0, height: 64, position: "absolute", right: 40, transform: "rotate(35deg)", width: 64 }}
                      />
                      <span className="text-[25px] font-black italic tracking-wide text-[#fff12e]">CẦU LÔNG</span>
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </div>

        <PublicFooter activeItemId="discover" />
      </div>
    </Screen>
  );
}
