import { useState } from "react";
import { useNavigate } from "react-router";

import images from "@/components/assets/images";
import ContinueButton from "@/components/onboarding/Onboarding/components/ContinueButton";
import SkipLink from "@/components/onboarding/Onboarding/components/SkipLink";
import SlideMedia from "@/components/onboarding/Onboarding/components/SlideMedia";
import SlideText from "@/components/onboarding/Onboarding/components/SlideText";
import StepDots from "@/components/onboarding/Onboarding/components/StepDots";
import { onboardingContent } from "@/components/onboarding/Onboarding/mockData";
import Screen from "@/components/ui/Screen";

export default function Onboarding() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const { continueLabel, skipLabel, slides } = onboardingContent;
  const activeSlide = slides[activeIndex];
  const isLastSlide = activeIndex === slides.length - 1;

  const handleContinue = () => {
    if (isLastSlide) {
      navigate("/", { replace: true });
      return;
    }

    setActiveIndex((current) => current + 1);
  };

  return (
    <Screen backgroundColor="#ffffff" edges={["bottom", "top"]}>
      <div className="flex-1">
        <div className="flex-row justify-end px-4 pt-4">
          <SkipLink label={skipLabel} onPress={() => navigate("/", { replace: true })} />
        </div>

        <div className="flex-1 items-center justify-center gap-8">
          <SlideMedia image={images.onboarding[activeIndex]} />
          <SlideText description={activeSlide.description} title={activeSlide.title} />
        </div>

        <div className="pb-4">
          <StepDots activeIndex={activeIndex} onSelect={setActiveIndex} total={slides.length} />
        </div>

        <ContinueButton label={continueLabel} onPress={handleContinue} />
      </div>
    </Screen>
  );
}
