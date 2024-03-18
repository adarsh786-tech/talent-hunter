"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const HeroButtonDisp = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex items-center justify-center">
      {session ? (
        <div className="flex gap-3">
          <Link href="/search-project">
            <Button
              variant="outline"
              className="text-lg bg-transparent bg-gray-700  text-white hover:text-gray-900 hover:underline"
            >
              Search Projects
            </Button>
          </Link>
          <Link href="/devUpdate">
            <Button
              variant="outline"
              className="text-lg bg-transparent bg-gray-700  text-white hover:text-gray-900 hover:underline"
            >
              Add Projects
            </Button>
          </Link>
        </div>
      ) : (
        <Link href="/api/auth/signin?callbackUrl=/">
          <Button
            variant="outline"
            className="text-lg bg-transparent bg-gray-700  text-white hover:text-gray-900 hover:underline"
          >
            Get Started
          </Button>
        </Link>
      )}
    </div>
  );
};
export default HeroButtonDisp;
