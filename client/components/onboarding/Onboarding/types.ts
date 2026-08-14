export type OnboardingSlide = {
  description: string;
  id: string;
  title: string;
};

export type OnboardingContent = {
  continueLabel: string;
  skipLabel: string;
  slides: OnboardingSlide[];
};
