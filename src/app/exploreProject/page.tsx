"use client";
import ProjectDetailsCard from "@/components/ProjectCard";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useState, useEffect } from "react";
import LogoutImage from "@/assets/logout.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const getAllProjects = async () => {
  try {
    const response = await axios.get(`/api/devprojects/projectsList`);

    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error; // Optionally re-throw the error to handle it in the calling function
  }
};

interface ProjectStructureProps {
  username: string;
  projectName: string;
  projectDescription: string;
  projectUrl: string;
  projectTechStack: string;
  author: string;
}

const ProjectDashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="bg-slate-900 h-full w-full overflow-auto">
      <div className="text-white font-bold py-10 space-y-5 m-2 flex items-center justify-center flex-col">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold flex flex-row items-center justify-center gap-5">
          <h1>Projects Dashboard</h1>
          <button className="flex justify-center items-center rounded-lg shadow-sm shadow-white w-8 h-8">
            <Image
              src={LogoutImage}
              alt="Homepage"
              onClick={() => {
                router.push("/");
              }}
              className="w-[20px] h-[20px]"
            />
          </button>
        </div>
        <h3>Explore Variety Of Projects</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5">
        {projects
          ? projects.length > 0 &&
            projects.map((project: ProjectStructureProps, index) => (
              <ProjectDetailsCard
                key={index}
                title={project.projectName}
                description={project.projectDescription}
                url={project.projectUrl}
                techStack={project.projectTechStack}
                author={project.username}
              />
            ))
          : null}
      </div>
    </div>
  );
};
export default ProjectDashboard;
