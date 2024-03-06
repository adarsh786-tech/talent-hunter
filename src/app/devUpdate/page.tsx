import React, { useEffect } from "react";
import Logo from "@/assets/talenthunter.png";
import Details from "@/app/devUpdate/Details";
import CardUI from "@/app/devUpdate/CardUI";
import Image from "next/image";
import axios from "axios";
import { GetStaticProps, GetServerSideProps } from "next";

interface Project {
  projectName: string;
  projectDescription: string;
  projectURL: string;
  projectStack: string;
  // Add other properties as needed
}

const getProjects = async () => {
  try {
    const response = await axios.get(
      `${process.env.BASE_API_URL}/api/devprojects/projectupload`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error; // Optionally re-throw the error to handle it in the calling function
  }
};

// useEffect(() => {
// const response = await getProjects();
// const projectList: Project[] = response.data;
// }, []);

const DevUpdate = async () => {
  if (!process.env.BASE_API_URL) {
    return null;
  }

  const response = await getProjects();
  const projectList: Project[] = response.data;
  console.log("-----------------------------");
  console.log(projectList.length);
  console.log("-----------------------------");

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
        {projectList.map((project: Project, indx: number) => {
          console.log(`
          Index Value: ${indx},
          Project Name: ${project.projectName},
          Project Description: ${project.projectDescription},
          Project URL: ${project.projectURL},
          Project Tech Stack: ${project.projectStack},
          \n
          `);
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
