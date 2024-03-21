import React, { useEffect } from "react";
import Logo from "@/assets/talenthunter.png";
import Details from "@/app/devUpdate/Details";
import Image from "next/image";

const DevUpdate = async () => {
  if (!process.env.BASE_API_URL) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-slate-700 via-slate-950 to-slate-700 flex items-center justify-center">
      {/* <div className="grid grid-cols-1 md:grid-cols-2"> */}
      {/* <div className="h-full">
          <Image
            src={Logo}
            alt="logo"
            width={0}
            height={0}
            priority={true}
            className="w-full h-full object-contain priority={true}"
          />
        </div> */}
      <div className="h-full">
        <Details />
      </div>
    </div>
    // </div>
  );
};

export default DevUpdate;
