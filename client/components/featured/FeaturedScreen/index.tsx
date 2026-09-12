import { ScrollView, StyleSheet, View } from "react-native";

import BannerItem from "@/components/featured/FeaturedScreen/components/BannerItem";
import { featuredBanners } from "@/components/featured/FeaturedScreen/content";
import PublicFooter from "@/components/layouts/PublicFooter";
import Screen from "@/components/ui/Screen";

export default function FeaturedScreen() {
  return (
    <Screen backgroundColor="#ffffff">
      <View style={styles.appFrame}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.bannerList}>
            {featuredBanners.map((banner) => (
              <BannerItem banner={banner} key={banner.id} />
            ))}
          </View>
        </ScrollView>
      </View>
      <PublicFooter activeItemId="popular" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  appFrame: {
    flex: 1,
    width: "100%",
  },
  bannerList: {
    gap: 10,
  },
  content: {
    paddingBottom: 96,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  scroll: {
    flex: 1,
  },
});
