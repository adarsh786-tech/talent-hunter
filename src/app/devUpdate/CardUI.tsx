"use client";
import React from "react";
import Image from "next/image";
import Logo from "@/assets/talenthunter.png";
const CardUI = ({
  title,
  description,
  url,
  techStack,
}: {
  title: string;
  description: string;
  url: string;
  techStack: string;
}) => {
  const techStackLst = techStack.split(",");
  const visitURL = () => {
    window.open(url, "_blank");
  };
  return (
    <>
      <div className="flex-shrink-0 w-full md:w-[300px] rounded-md border">
        <Image
          src={Logo}
          alt="Laptop"
          width={600}
          height={300}
          priority={true}
          className="h-[200px] w-full rounded-t-md object-cover "
        />
        <div className="p-4">
          <span className="bg-gradient-to-br from-gray-500 via-white to-zinc-200 bg-clip-text text-transparent">
            {title}
          </span>

          <p className="mt-3 text-md font-semibold text-white">{description}</p>
          <div className="mt-4">
            {techStackLst.map((tag, index) => (
              <span
                key={index}
                className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={visitURL}
            // onClick={() => router.push(url)}
            className="mt-4 w-full rounded-sm bg-gradient-to-br from-gray-600 via-slate-500 to-gray-800 hover:text-white px-2 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Visit: {title}
          </button>
        </div>
      </div>
    </>
  );
};

export default CardUI;
