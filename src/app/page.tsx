import LandingNavBar from "@/components/landing-navbar";
import LandingHeroPage from "@/components/landing-hero-page";
import TeamDataContent from "@/components/team-data";

export default function Home() {
  return (
    <div className="bg-slate-900 w-full overflow-hidden">
      <LandingNavBar />
      <LandingHeroPage />
      <TeamDataContent />
    </div>
  );
}
