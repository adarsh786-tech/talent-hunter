"use client";
import { Montserrat } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import LogoutImage from "@/assets/logout.svg";
import { Braces } from "lucide-react";
import Image from "next/image";
import { FileImage } from "lucide-react";
import { useRouter } from "next/navigation";
import ProfilePhoto from "@/assets/profile_photo.png";
import ProjectDetailsCard from "@/components/ProjectCard";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { profile } from "console";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const getProjects = async () => {
  try {
    const response = await axios.get(`/api/devprojects/projectupload`);

    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error; // Optionally re-throw the error to handle it in the calling function
  }
};

interface ProjectStructureProps {
  projectName: string;
  projectDescription: string;
  projectUrl: string;
  projectTechStack: string;
}

const ProfilePageDesign = ({ name }: any) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log(`Logout success`);
      toast.success(`Logout Success:`);
      router.push("/login");
    } catch (error: any) {
      console.log("Logout Failed...");
      toast.error("Logout Failed...");
    }
  };
  return (
    <div className="bg-gradient-to-br from-slate-700 via-slate-950 to-slate-700 min-h-screen flex justify-center items-center p-4">
      <Toaster position="top-right" />
      <div className="bg-gradient-to-br from-slate-700 via-slate-950 to-slate-700 w-full shadow-lg rounded-lg p-4">
        <header className="bg-slate-900 py-12 text-white text-center rounded-t-lg shadow-lg">
          <div className="mx-auto max-w-md flex flex-col items-center">
            <div className="relative overflow-hidden rounded-full w-20 h-20 mb-4 ">
              {session ? (
                <Image
                  src={session?.user.image}
                  alt="profileimage"
                  layout="fill" // Use layout="fill" for responsive image sizing
                  className="object-cover"
                />
              ) : (
                <Image
                  src={ProfilePhoto}
                  alt="profileimage"
                  layout="fill" // Use layout="fill" for responsive image sizing
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-25"></div>{" "}
            </div>
            <div className="flex flex-row justify-center items-center gap-3">
              <h1
                className={cn(
                  "text-3xl text-gray-300 font-semibold",
                  font.className
                )}
              >
                {session?.user.name}
              </h1>
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="flex justify-center items-center rounded-lg shadow-sm shadow-white w-8 h-8"
              >
                <Image
                  src={LogoutImage}
                  alt="Upload Data"
                  className="w-[20px] h-[20px]"
                />
              </button>
            </div>
            <p
              className={cn(
                "text-xl text-gray-400 font-semibold flex flex-row items-center justify-center gap-2",
                font.className
              )}
            >
              Software Developer
            </p>

            {/* <p className="text-lg">Earth</p> */}
          </div>
        </header>
        <main className="p-4">
          <section className="bg-slate-950 shadow-lg rounded-lg p-4 mb-6">
            <h2
              className={cn(
                "text-2xl text-gray-300 font-semibold mb-2",
                font.className
              )}
            >
              About Me
            </h2>
            <p className={cn("text-gray-400", font.className)}>
              I&apos;m a passionate developer with a strong interest in building
              innovative and user-friendly software solutions. I&apos;m
              proficient in various programming languages and frameworks .
              I&apos;m constantly seeking opportunities to learn and grow as a
              developer, and I&apos;m particularly interested in full stack
              development. I&apos;m a team player with excellent communication
              skills and a dedication to delivering high-quality code.
            </p>
          </section>

          <section className="bg-slate-900 shadow-lg rounded-lg p-4">
            <h2
              className={cn(
                "text-2xl text-gray-300 font-semibold mb-3",
                font.className
              )}
            >
              Projects
            </h2>
            <div>
              <div className="flex flex-col sm:flex-row md:flex-row gap-4 overflow-x-auto">
                {projects
                  ? projects.length > 0 &&
                    projects.map((project: ProjectStructureProps) => (
                      <ProjectDetailsCard
                        key={project.projectName}
                        title={project.projectName}
                        description={project.projectDescription}
                        url={project.projectUrl}
                        techStack={project.projectTechStack}
                        // author={"_dev"
                        //   .concat(session?.user.name.split(" ")[0])
                        //   .concat("_")}
                      />
                    ))
                  : null}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePageDesign;
