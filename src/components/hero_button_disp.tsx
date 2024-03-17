import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const HeroButtonDisp = async () => {
  const session = await getServerSession(authOptions);
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
        <Link href="/register">
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
