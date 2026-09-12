import { Image, StyleSheet, View } from "react-native";

import type { Banner } from "@/components/featured/FeaturedScreen/types";

type BannerItemProps = {
  banner: Banner;
};

export default function BannerItem({ banner }: BannerItemProps) {
  return (
    <View style={styles.container}>
      <Image
        accessibilityLabel={banner.alt}
        resizeMode="cover"
        source={banner.source}
        style={[styles.image, { aspectRatio: banner.aspectRatio }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    overflow: "hidden",
    width: "100%",
  },
  image: {
    borderRadius: 18,
    width: "100%",
  },
});
