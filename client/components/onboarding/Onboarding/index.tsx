import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import images from "@/components/assets/images";
import ContinueButton from "@/components/onboarding/Onboarding/components/ContinueButton";
import SkipLink from "@/components/onboarding/Onboarding/components/SkipLink";
import SlideMedia from "@/components/onboarding/Onboarding/components/SlideMedia";
import SlideText from "@/components/onboarding/Onboarding/components/SlideText";
import StepDots from "@/components/onboarding/Onboarding/components/StepDots";
import { onboardingContent } from "@/components/onboarding/Onboarding/mockData";
import Screen from "@/components/ui/Screen";

export default function Onboarding() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const { continueLabel, skipLabel, slides } = onboardingContent;
  const activeSlide = slides[activeIndex];
  const isLastSlide = activeIndex === slides.length - 1;

  const handleContinue = () => {
    if (isLastSlide) {
      router.replace("/");
      return;
    }

    setActiveIndex((current) => current + 1);
  };

  return (
    <Screen backgroundColor="#ffffff" edges={["bottom", "top"]}>
      <View className="flex-1">
        <View className="flex-row justify-end px-4 pt-4">
          <SkipLink label={skipLabel} onPress={() => router.replace("/")} />
        </View>

        <View className="flex-1 items-center justify-center gap-8">
          <SlideMedia image={images.onboarding[activeIndex]} />
          <SlideText description={activeSlide.description} title={activeSlide.title} />
        </View>

        <View className="pb-4">
          <StepDots activeIndex={activeIndex} onSelect={setActiveIndex} total={slides.length} />
        </View>

        <ContinueButton label={continueLabel} onPress={handleContinue} />
      </View>
    </Screen>
  );
}
