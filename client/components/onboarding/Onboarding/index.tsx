"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import images from "@/components/assets/images";
import ContinueButton from "@/components/onboarding/Onboarding/components/ContinueButton";
import SkipLink from "@/components/onboarding/Onboarding/components/SkipLink";
import SlideMedia from "@/components/onboarding/Onboarding/components/SlideMedia";
import SlideText from "@/components/onboarding/Onboarding/components/SlideText";
import StepDots from "@/components/onboarding/Onboarding/components/StepDots";
import { onboardingContent } from "@/components/onboarding/Onboarding/mockData";

export default function Onboarding() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const { continueLabel, skipLabel, slides } = onboardingContent;
  const activeSlide = slides[activeIndex];
  const isLastSlide = activeIndex === slides.length - 1;

  function handleContinue() {
    if (isLastSlide) {
      router.push("/");
      return;
    }
    setActiveIndex((current) => current + 1);
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <div className="flex justify-end px-4 pt-4">
        <SkipLink label={skipLabel} />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <SlideMedia alt={activeSlide.title} image={images.onboarding[activeIndex]} />
        <SlideText description={activeSlide.description} title={activeSlide.title} />
      </div>

      <div className="pb-4">
        <StepDots activeIndex={activeIndex} onSelect={setActiveIndex} total={slides.length} />
      </div>

      <ContinueButton label={continueLabel} onClick={handleContinue} />
    </div>
  );
}
