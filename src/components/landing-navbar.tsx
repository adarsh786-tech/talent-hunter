import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FolderOpenDot, LogInIcon, UsersRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const LandingNavBar = async () => {
  const session = await getServerSession(authOptions);
  console.log("------------------------------------------");
  if (session) console.log(`Session Exists`);
  else console.log(`Session Not Exists`);
  console.log(`User Name: ${session?.user?.name}`);
  console.log(`User Email: ${session?.user?.email}`);
  console.log(`User Image: ${session?.user?.image}`);
  console.log("------------------------------------------");

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
            className="text-gray-200 hover:text-gray-300 hover:underline"
          >
            {" "}
            Explore Projects
            <FolderOpenDot className="m-2" />
          </Button>
        </Link>
        <Link href="#team-data">
          <Button
            variant="customCss"
            className="text-gray-200 hover:text-gray-300 hover:underline"
          >
            {" "}
            Our Team
            <UsersRoundIcon className="m-2" />
          </Button>
        </Link>
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">
            <Button
              variant="customCss"
              className="text-gray-200 hover:text-gray-300 hover:underline"
            >
              {" "}
              Logout
              <LogInIcon className="m-2" />
            </Button>
          </Link>
        ) : (
          <Link href="/api/auth/signin?callbackUrl=/">
            <Button
              variant="customCss"
              className="text-gray-200 hover:text-gray-300 hover:underline"
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
