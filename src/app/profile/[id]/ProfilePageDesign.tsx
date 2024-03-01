import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProfilePageDesign = ({ name }: any) => {
  return (
    <div className="container mx-auto px-4 py-8">
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
              {name}
            </div>
            <p className="mt-2 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              consequat pretium lorem, nec consequat leo.
            </p>
            <div className="mt-4">
              <Link
                className="bg-indigo-500 text-white py-2 px-4 rounded"
                href="/"
              >
                Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageDesign;
