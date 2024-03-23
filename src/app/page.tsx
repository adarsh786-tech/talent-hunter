"use client";
import LandingNavBar from "@/components/landing-navbar";
import LandingHeroPage from "@/components/landing-hero-page";
import TeamDataContent from "@/components/team-data";
import { useSession } from "next-auth/react";
import { Skeleton } from "@mui/material";
import LandingContent from "@/components/landing-content";
import FooterPage from "@/components/footer-page";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div className="bg-slate-900 w-full overflow-hidden">
      {status !== "loading" ? (
        <LandingNavBar />
      ) : (
        <Skeleton
          variant="text"
          className="bg-gray-700"
          sx={{ fontSize: "1rem" }}
          height={100}
        />
      )}
      <LandingHeroPage />
      <LandingContent />
      <TeamDataContent />
      <FooterPage />
    </div>
  );
}
