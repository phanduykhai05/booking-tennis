import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ArrowLeft, Clock3, Heart, MapPin, Phone, Share2, Star } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Modal, ScrollView, Text, View } from "react-native";

import images from "@/components/assets/images";
import VenuePreviewTabContent from "@/components/home/NearbyVenues/components/VenuePreviewTabContent";
import type { NearbyVenuesContent, Venue, VenuePreviewTab } from "@/components/home/NearbyVenues/types";
import Touch from "@/components/ui/Pressable";
import { shadow } from "@/components/ui/theme";
import { getVenue } from "@/lib/api/endpoints";
import type { ApiVenueDetail } from "@/lib/api/types";

type VenuePreviewSheetProps = {
  content: NearbyVenuesContent;
  onClose: () => void;
  venue: Venue;
};

export default function VenuePreviewSheet({ content, onClose, venue }: VenuePreviewSheetProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<VenuePreviewTab["id"]>("information");
  const [detail, setDetail] = useState<ApiVenueDetail | null>(null);

  // Tải chi tiết sân khi mở sheet để lấp các tab Thông tin / Gói hội viên / Dịch vụ / Hình ảnh.
  useEffect(() => {
    let isActive = true;

    getVenue(venue.id)
      .then((data) => {
        if (isActive) setDetail(data);
      })
      .catch(() => {
        if (isActive) setDetail(null);
      });

    return () => {
      isActive = false;
    };
  }, [venue.id]);

  const ratingLabel = venue.rating != null ? venue.rating.toFixed(1) : content.previewRatingLabel;
  const categories = detail?.preview.categories ?? [];
  const phone = detail?.preview.phone ?? "";

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible>
      <View className="flex-1 justify-end bg-[#102c25]/65">
        <Touch accessibilityLabel="Đóng thông tin sân" className="h-16" onPress={onClose} />

        <View className="flex-1 overflow-hidden rounded-t-[22px] bg-white" style={shadow.sheet}>
          <ScrollView contentContainerClassName="pb-8">
            <View className="h-[155px]">
              <Image contentFit="cover" source={images.venueCovers[venue.cover]} style={{ height: "100%", width: "100%" }} />
              <View className="absolute inset-0 bg-black/20" />

              <Touch accessibilityLabel="Đóng" className="absolute left-3 top-4 rounded-full bg-white p-2" onPress={onClose}>
                <ArrowLeft color="#007b49" size={20} />
              </Touch>

              <View className="absolute right-3 top-4 flex-row items-center gap-2">
                <View className="rounded-full bg-white p-2">
                  <Share2 color="#006b3d" size={18} />
                </View>
                <View className="rounded-full bg-white p-2">
                  <Heart color="#006b3d" size={18} />
                </View>
                <Touch
                  accessibilityRole="link"
                  className="rounded-xl bg-[#e7af1c] px-4 py-2"
                  onPress={() => {
                    onClose();
                    router.push(venue.productHref);
                  }}
                >
                  <Text className="text-[14px] font-bold text-white">{content.previewBookLabel}</Text>
                </Touch>
              </View>
            </View>

            <View className="-mt-3 rounded-t-[18px] bg-white px-5 pb-5 pt-7">
              <View className="absolute -top-5 left-0 right-0 items-center">
                <View className="flex-row items-center gap-1 rounded-full bg-[#21c58d] px-4 py-2">
                  <Star color="#ffffff" fill="#ffffff" size={17} />
                  <Text className="text-[14px] font-bold text-white">{ratingLabel}</Text>
                </View>
              </View>

              <View className="flex-row gap-3">
                <View className="h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d9ca8d] bg-[#f7f2d8]">
                  <Text className="text-[12px] font-black text-[#00713d]">{content.previewVenueMark}</Text>
                </View>
                <View className="min-w-0 flex-1">
                  <Text className="text-[17px] font-bold text-[#064b30]" numberOfLines={1}>
                    {venue.name}
                  </Text>
                  <View className="mt-1 flex-row flex-wrap gap-1">
                    {categories.map((category) => (
                      <Text className="rounded-full border border-[#39a6ef] px-2 py-0.5 text-[11px] text-[#1689d2]" key={category}>
                        {category}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>

              <View className="mt-4 gap-2">
                <View className="flex-row items-center gap-3">
                  <MapPin color="#008447" fill="#008447" size={18} />
                  <Text className="flex-1 text-[14px] text-[#075038]">{venue.address}</Text>
                </View>
                <View className="flex-row items-center gap-3">
                  <Clock3 color="#008447" size={18} />
                  <Text className="flex-1 text-[14px] text-[#075038]">{venue.openingLabel}</Text>
                </View>
                {phone ? (
                  <View className="flex-row items-center gap-3">
                    <Phone color="#008447" fill="#008447" size={18} />
                    <Text className="flex-1 text-[14px] text-[#075038]">{phone}</Text>
                  </View>
                ) : null}
              </View>
            </View>

            <ScrollView
              className="border-t border-[#e1eee7]"
              contentContainerClassName="flex-row px-4"
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {content.previewTabs.map((tab) => (
                <Touch className="shrink-0 px-3 py-3" key={tab.id} onPress={() => setActiveTab(tab.id)}>
                  <Text className={`text-[13px] ${activeTab === tab.id ? "font-semibold text-[#008447]" : "text-[#24614b]"}`}>
                    {tab.label}
                  </Text>
                  {activeTab === tab.id ? <View className="mt-2 h-0.5 rounded-full bg-[#00a85a]" /> : null}
                </Touch>
              ))}
            </ScrollView>

            <VenuePreviewTabContent
              activeTab={activeTab}
              address={venue.address}
              openingLabel={venue.openingLabel}
              preview={detail?.preview ?? null}
              venue={venue}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
