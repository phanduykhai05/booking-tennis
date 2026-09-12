import { ScrollView, StyleSheet, View } from "react-native";

import BannerItem from "@/components/featured/FeaturedScreen/components/BannerItem";
import { featuredBanners } from "@/components/featured/FeaturedScreen/content";
import PublicFooter from "@/components/layouts/PublicFooter";
import Screen from "@/components/ui/Screen";

export default function FeaturedScreen() {
  return (
    <Screen backgroundColor="#f5f6f5">
      <View style={styles.appFrame}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.bannerGrid}>
            {featuredBanners.map((banner) => (
              <View key={banner.id} style={styles.bannerCell}>
                <BannerItem banner={banner} />
              </View>
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
  bannerCell: {
    minWidth: 320,
    // Khôi phục tính toán web đúng với gap 36px để lưới 2 cột không bị lệch / xuống thành 1 cột.
    width: "calc(50% - 18px)" as any,
  },
  bannerGrid: {
    alignContent: "flex-start",
    columnGap: 36,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 14,
    width: "100%",
  },
  content: {
    paddingBottom: 72,
    paddingHorizontal: 38,
    paddingTop: 38,
  },
  scroll: {
    flex: 1,
  },
});
