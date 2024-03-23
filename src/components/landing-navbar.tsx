"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";

import { useState } from "react";
import { FolderOpenDot, LogInIcon, UsersRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import AccountMenu from "@/components/profile_dropdown_menu";
import UserMenu from "@/components/dropdown_menu";
const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const mobileCss = {
  sm: "sm:flex sm:text-gray-200 sm:hover:text-gray-300 sm:hover:underline",
  md: "md:flex md:text-gray-200 md:hover:text-gray-300 md:hover:underline",
  lg: "lg:flex lg:text-gray-200 lg:hover:text-gray-300 lg:hover:underline",
  xl: "xl:flex xl:text-gray-200 xl:hover:text-gray-300 xl:hover:underline",
};

const LandingNavBar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4 bg-transparent  bg-slate-800 flex items-center justify-between">
      <Link href="/" className="flex items-center">
        {/* <div className="relative w-8 h-8 mr-4">
          <Image
            fill
            alt="Logo"
            src="/logo.png"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg border border-red shadow-white"
          />
        </div> */}
        <div className="flex flex-row items-center gap-1">
          <h1
            className={cn(
              "text-2xl font-bold bg-gradient-to-r from-teal-400 via-white to-teal-500 bg-clip-text text-transparent",
              font.className
            )}
          >
            Talent
          </h1>
          <h1
            className={cn(
              "text-md font-bold bg-gradient-to-r from-teal-400 via-white to-teal-500 bg-clip-text text-transparent",
              font.className
            )}
          >
            Hunter
          </h1>
        </div>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href="/exploreProject">
          <Button
            variant="customCss"
            className={cn(
              "hidden text-gray-200 hover:text-gray-300 hover:underline",
              mobileCss.sm,
              mobileCss.md,
              mobileCss.lg,
              mobileCss.xl
            )}
          >
            {" "}
            Explore Projects
            <FolderOpenDot className="m-2" />
          </Button>
        </Link>
        <Link href="#team-data">
          <Button
            variant="customCss"
            className={cn(
              "hidden text-gray-200 hover:text-gray-300 hover:underline",
              mobileCss.sm,
              mobileCss.md,
              mobileCss.lg,
              mobileCss.xl
            )}
          >
            {" "}
            Our Team
            <UsersRoundIcon className="m-2" />
          </Button>
        </Link>
        <div className="sm:hidden md:hidden lg:hidden xl:hidden">
          <UserMenu />
        </div>
        {session ? (
          <AccountMenu />
        ) : (
          <Link href="/api/auth/signin?callbackUrl=/">
            <Button
              variant="customCss"
              className={cn(
                "hidden text-gray-200 hover:text-gray-300 hover:underline",
                mobileCss.sm,
                mobileCss.md,
                mobileCss.lg,
                mobileCss.xl
              )}
            >
              {" "}
              SignIn
              <LogInIcon className="m-2" />
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};
export default LandingNavBar;
