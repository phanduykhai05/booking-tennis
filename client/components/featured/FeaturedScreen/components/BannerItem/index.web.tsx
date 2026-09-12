import { useCallback, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import type { LayoutChangeEvent } from "react-native";

import type { Banner } from "@/components/featured/FeaturedScreen/types";

type BannerItemProps = {
  banner: Banner;
};

export default function BannerItem({ banner }: BannerItemProps) {
  const [renderedWidth, setRenderedWidth] = useState(0);
  const renderedHeight = renderedWidth > 0 ? renderedWidth / banner.aspectRatio : 0;

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const nextWidth = event.nativeEvent.layout.width;

    setRenderedWidth((currentWidth) => (currentWidth === nextWidth ? currentWidth : nextWidth));
  }, []);

  return (
    <View onLayout={handleLayout} style={styles.container}>
      <Image
        accessibilityLabel={banner.alt}
        resizeMode="contain"
        source={banner.source}
        style={[styles.image, { height: renderedHeight }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    overflow: "hidden",
    width: "100%",
  },
  image: {
    borderRadius: 14,
    width: "100%",
  },
});
