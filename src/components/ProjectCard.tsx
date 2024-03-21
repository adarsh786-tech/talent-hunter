import React from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const ProjectDetailsCard = ({
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
    <div className="w-[300px] rounded-md border">
      <Image
        src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        alt="Laptop"
        width={600}
        height={300}
        priority={true}
        className="h-[200px] w-full rounded-t-md object-cover"
      />
      <div className="p-4">
        <h1
          className={cn(
            "inline-flex items-center text-white text-lg font-semibold",
            font.className
          )}
        >
          {title} &nbsp; <ArrowUpRight className="h-4 w-4" />
        </h1>
        <p className={cn("mt-3 text-sm text-gray-300", font.className)}>
          {description}
        </p>
        <div className="mt-4">
          {techStackLst.map((item, index) => (
            <span
              key={index}
              className={cn(
                "mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900",
                font.className
              )}
            >
              {item}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={visitURL}
          className={cn(
            "mt-4 w-full rounded-sm bg-slate-950 px-2 py-1.5 text-sm font-semibold text-gray-200 shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
            font.className
          )}
        >
          Visit {title}
        </button>
      </div>
    </div>
  );
};

export default ProjectDetailsCard;
