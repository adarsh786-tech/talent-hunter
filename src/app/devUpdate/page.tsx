import React from "react";
import Logo from "@/assets/talenthunter.png";
import Details from "@/app/devUpdate/Details";
import CardUI from "@/app/devUpdate/CardUI";
import Image from "next/image";
import axios from "axios";

const getProjects = async () => {
  try {
    const response = await axios.get(
      // "http://localhost:3000/api/devprojects/projectupload"
      `${process.env.BASE_API_URL}/api/devprojects/projectupload`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error; // Optionally re-throw the error to handle it in the calling function
  }
};
// "http://localhost:3000/api/devprojects/projectupload"

const DevUpdate = async () => {
  const response = await getProjects();
  const projectList = response.data;
  return (
    <div className="bg-gradient-to-br from-slate-700 via-slate-950 to-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-full">
          <Image
            src={Logo}
            alt="logo"
            width={0}
            height={0}
            priority={true}
            className="w-full h-full object-contain priority={true}"
          />
        </div>
        <div className="h-full">
          <Details />
        </div>
      </div>
      <div className="flex flex-row gap-4">
        {projectList.map((project: any, indx: number) => {
          return (
            <CardUI
              key={indx}
              title={project.projectName}
              description={project.projectDescription}
              url={project.projectURL}
              techStack={project.projectStack}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DevUpdate;
