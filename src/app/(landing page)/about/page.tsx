import ChallengesPage from "@/components/landing-page/features/challenges-landing";
import FeaturesPage from "@/components/landing-page/features/features-landing";
import MainHero from "@/components/landing-page/hero/main-hero";

export default function AboutPage() {
  return (
    <div>
      <MainHero />
      <FeaturesPage />
      <ChallengesPage />
    </div>
  );
}
