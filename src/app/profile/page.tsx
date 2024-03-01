"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";

const ProfilePage = () => {
  const router = useRouter();
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
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              className="h-48 w-full object-cover md:w-48"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              John Doe
            </div>
            <p className="mt-2 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              consequat pretium lorem, nec consequat leo.
            </p>
            <div className="flex flex-row gap-2">
              <div className="mt-2">
                <button className="bg-indigo-500 text-white py-2 px-4 rounded">
                  Home
                </button>
              </div>
              <div className="mt-2">
                <button
                  className="bg-indigo-500 text-white py-2 px-4 rounded"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
