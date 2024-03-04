"use client";
import React, { ChangeEvent } from "react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import UploadContent from "@/assets/uploadData.svg";
import ResetData from "@/assets/resetData.svg";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

// import { createProject } from "../api/projects/route";
const Details = () => {
  // const router = useRouter();

  const [project, setProject] = useState({
    projectName: "",
    projectDescription: "",
    projectURL: "",
    projectStack: "",
  });

  const handleUpdateDetails = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log("Updating Takes Time....");
    try {
      console.log(project);

      const response = await axios.post(
        "/api/devprojects/projectupload",
        project
      );
      console.log(project);
      // console.log(`Project Uploaded Successfully...${response.data}`);
      // toast.success(`Project Uploaded Successfully...`);
      setProject({
        projectName: "",
        projectDescription: "",
        projectURL: "",
        projectStack: "",
      });
      // router.push("/login");
    } catch (error: any) {
      console.log(`Upload Failed...Error: ${error.response}`);
      toast.error(`Upload Failed... Error: ${error.response}`);
    }
  };

  const resetAllData = () => {
    setProject({
      projectName: "",
      projectDescription: "",
      projectURL: "",
      projectStack: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-center" />
      <div className="from-slate-700 via-slate-950 to-slate-700 p-8 w-96 rounded-lg shadow-xl shadow-white">
        <div className="flex flex-row gap-2 items-center justify-between">
          <h2 className="text-2xl font-semibold font-serif text-white text-center mb-6">
            UPLOAD PROJECT
          </h2>
          <button
            onClick={resetAllData}
            className="flex justify-center items-center rounded-lg shadow-sm shadow-purple-800"
          >
            <Image
              src={ResetData}
              alt="Upload Data"
              priority={false}
              className="w-[40px] h-[40px]"
            />
          </button>
        </div>
        <form>
          <div className="mb-6">
            <label
              htmlFor="projectName"
              className="block font-light mb-2 text-white"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Example: `ThunderGPT - 2.O`"
              required
              value={project.projectName}
              onChange={(e) =>
                setProject({ ...project, projectName: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label htmlFor="projectDetails" className="block mb-2 text-white">
              Description
            </label>
            <textarea
              id="projectDetails"
              name="projectDetails"
              className="w-full px-4 py-2 border rounded-lg resize-none h-20 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Example: GPT Powered Thunder Project..."
              value={project.projectDescription}
              onChange={(e) =>
                setProject({ ...project, projectDescription: e.target.value })
              }
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="projectLink" className="block mb-2 text-white">
              Project Link
            </label>
            <input
              type="url"
              id="projectLink"
              name="projectLink"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="https://example.com"
              required={true}
              value={project.projectURL}
              onChange={(e) =>
                setProject({ ...project, projectURL: e.target.value })
              }
            />
          </div>

          <div className="mb-6">
            <label htmlFor="projectStack" className="block mb-2 text-white">
              Tech Stack (, separated)
            </label>
            <input
              type="text"
              id="projectStack"
              name="projectStack"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Example: `React, Tailwind`"
              required={true}
              value={project.projectStack}
              onChange={(e) =>
                setProject({ ...project, projectStack: e.target.value })
              }
            />
          </div>

          <div className="flex justify-center items-center p-2 gap-10">
            <button
              onClick={handleUpdateDetails}
              className="flex justify-center items-center rounded-lg shadow-sm shadow-white"
            >
              <Image
                src={UploadContent}
                alt="Upload Data"
                className="w-[40px] h-[40px]"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Details;
