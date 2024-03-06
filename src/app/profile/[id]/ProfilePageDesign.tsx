"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import LogoutImage from "@/assets/logout.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProfilePhoto from "@/assets/profile_photo.png";
import CardUI from "@/app/devUpdate/CardUI";

const getProjects = async () => {
  try {
    // const response = await axios.get(`/api/devprojects/projectupload`);
    // return response.data;
    const response = await axios.get(`/api/devprojects/projectupload`);

    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error; // Optionally re-throw the error to handle it in the calling function
  }
};

const ProfilePageDesign = ({ name }: any) => {
  const router = useRouter();
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
        <header className="bg-gradient-to-br from-slate-700 via-slate-400 to-slate-700 py-12 text-white text-center rounded-t-lg shadow-lg">
          <div className="mx-auto max-w-md flex flex-col items-center">
            <div className="relative overflow-hidden rounded-full w-60 h-60 mb-4 ">
              <Image
                src={ProfilePhoto}
                alt="profileimage"
                layout="fill" // Use layout="fill" for responsive image sizing
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-25"></div>{" "}
            </div>
            <div className="flex flex-row gap-2">
              <h1 className="text-3xl font-semibold">{name}</h1>
              <button
                onClick={logout}
                className="flex justify-center items-center rounded-lg shadow-sm shadow-white"
              >
                <Image
                  src={LogoutImage}
                  alt="Upload Data"
                  className="w-[40px] h-[40px]"
                />
              </button>
            </div>
            <p className="text-xl font-medium">Developer</p>
            <p className="text-lg">Earth</p>
          </div>
        </header>
        <main className="p-4">
          <section className="bg-slate-700 shadow-lg rounded-lg p-4 mb-6">
            <h2 className="text-2xl font-semibold mb-2">About Me</h2>
            <p className="text-white">
              Veniam aliquip ex nostrud tempor in laborum veniam cupidatat
              voluptate consectetur aute. Et laborum dolore id sit eu.
              Exercitation ex magna amet fugiat.
            </p>
          </section>

          <section className="bg-slate-500 shadow-lg rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-2">Projects</h2>
            <div>
              <div className="flex flex-col sm:flex-row md:flex-row gap-10 overflow-x-auto">
                {projects.length > 0 &&
                  projects.map((project: any) => (
                    <CardUI
                      key={project.projectName}
                      title={project.projectName}
                      description={project.projectDescription}
                      url={project.projectURL}
                      techStack={project.projectStack}
                    />
                  ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePageDesign;
