"use client";
import TypewriterComponent from "typewriter-effect";
import HeroButtonDisp from "./hero_button_disp";
import { useSession } from "next-auth/react";
import { Skeleton } from "@mui/material";

const LandingHeroPage = () => {
  const { data: session, status } = useSession();
  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xpace-y-5 font-extrabold">
        <h1>The Best Tool For Portfolio</h1>
        <div className="flex flex-row gap-2 items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">
          <TypewriterComponent
            options={{
              strings: [
                "For Devs Who Code",
                "For Fellow Developers",
                "And Much More...",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        {status !== "loading" ? (
          <HeroButtonDisp />
        ) : (
          <Skeleton
            variant="text"
            className="bg-gray-700 flex"
            sx={{ fontSize: "1rem" }}
            height={100}
          />
        )}
        <div className="text-zinc-400 text-xs md:text-sm font-normal mt-3">
          It Is Free... And Will Always Be
        </div>
      </div>
    </div>
  );
};

export default LandingHeroPage;
