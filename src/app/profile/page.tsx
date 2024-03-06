"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoutImage from "@/assets/logout.svg";
import { useRouter } from "next/navigation";
import ProfilePhoto from "@/assets/profile_photo.png";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import CardUI from "../devUpdate/CardUI";

const getProjects = async () => {
  try {
    const response = await axios.get(
      // `${process.env.BASE_API_URL}/api/devprojects/projectupload`
      `/api/devprojects/projectupload`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error; // Optionally re-throw the error to handle it in the calling function
  }
};

const ProfilePage = () => {
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
  const basicDetails = {
    name: "Your Name",
    jobTitle: "Job Title",
    location: "Location",
    profileImage: { ProfilePhoto },
    aboutMe:
      "Briefly describe yourself, your background, and your professional interests.",
  };

  return (
    // <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-slate-700 via-slate-950 to-slate-700">
    //   <Toaster position="top-right" />
    //   <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
    //     <div className="md:flex">
    //       <div className="md:flex-shrink-0">
    //         <Image
    //           className="object-cover md:w-48"
    //           width={100}
    //           height={100}
    //           src="https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
    //           alt="Profile"
    //         />
    //       </div>
    //       <div className="p-8">
    //         <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
    //           John Doe
    //         </div>
    //         <p className="mt-2 text-gray-600">
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
    //           consequat pretium lorem, nec consequat leo.
    //         </p>
    //         <div className="flex flex-row gap-2">
    //           <div className="mt-2">
    //             <button className="bg-indigo-500 text-white py-2 px-4 rounded">
    //               Home
    //             </button>
    //           </div>
    //           <div className="mt-2">
    //             <button
    //               className="bg-indigo-500 text-white py-2 px-4 rounded"
    //               onClick={logout}
    //             >
    //               Logout
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // {projects.length > 0 &&
    //   projects.map((project: any) => (
    //     <CardUI
    //       key={project.projectName}
    //       title={project.projectName}
    //       description={project.projectDescription}
    //       url={project.projectURL}
    //       techStack={project.projectStack}
    //     />
    //   ))}
    // </div>

    <div className="bg-gradient-to-br from-slate-700 via-slate-950 to-slate-700 min-h-screen flex justify-center items-center p-4">
      <div className="bg-gradient-to-br from-slate-700 via-slate-950 to-slate-700 w-full shadow-lg rounded-lg p-4">
        <header className="bg-gradient-to-br from-slate-700 via-slate-400 to-slate-700 py-12 text-white text-center rounded-t-lg shadow-lg">
          <div className="mx-auto max-w-md flex flex-col items-center">
            <div className="relative overflow-hidden rounded-full w-60 h-60 mb-4 ">
              <Image
                src={ProfilePhoto}
                alt={basicDetails.name}
                layout="fill" // Use layout="fill" for responsive image sizing
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-25"></div>{" "}
            </div>
            <div className="flex flex-row gap-2">
              <h1 className="text-3xl font-semibold">{basicDetails.name}</h1>
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
            <p className="text-xl font-medium">{basicDetails.jobTitle}</p>
            <p className="text-lg">{basicDetails.location}</p>
          </div>
        </header>
        <main className="p-4">
          <section className="bg-slate-700 shadow-lg rounded-lg p-4 mb-6">
            <h2 className="text-2xl font-semibold mb-2">About Me</h2>
            <p className="text-white">{basicDetails.aboutMe}</p>
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

export default ProfilePage;
