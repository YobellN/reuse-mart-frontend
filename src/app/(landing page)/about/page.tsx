import StatisticsPage from "@/components/landing-page/ending-content/stats";
import TestimonialPage from "@/components/landing-page/ending-content/testimonial";
import ChallengesPage from "@/components/landing-page/features/challenges-landing";
import FeaturesPage from "@/components/landing-page/features/features-landing";
import MissionPage from "@/components/landing-page/features/our-mission";
import MainHero from "@/components/landing-page/hero/main-hero";

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      <MainHero />
      <FeaturesPage />
      <ChallengesPage />
      <MissionPage />
      <StatisticsPage />
      <TestimonialPage />
    </div>
  );
}
