"use client";
import React, { useState } from "react";
import LoginLogo from "@/assets/login.png";
import UnlockLogo from "@/assets/unlock.png";
import Logo from "@/assets/talenthunter.png";
import Image from "next/image";
import Link from "next/link";

const UserRegister = () => {
  const handleSubmit = () => {};

  return (
    <section className="flex justify-center items-center px-4 py-4 ">
      <div className="xl:w-full xl:mx-auto xl:max-w-sm 2xl:max-w-md">
        <div className="flex justify-center">
          <Image
            src={Logo}
            priority={true}
            alt="LoginPageImage"
            className="lg:w-full lg:h-auto sm:w-32 sm:h-auto md:w-48 md:h-auto rounded-full"
          />
        </div>
        <div className="flex flex-row justify-center items-cente gap-2">
          <Image
            src={LoginLogo}
            alt="LoginLogo"
            className="w-[30px] h-[30px] cursor-pointer border border-white"
          />
          <h2 className="cursor-pointer text-center text-2xl font-bold leading-tight text-black">
            Sign up to your account
          </h2>
        </div>
        <p className="mt-2 text-center text-sm text-gray-600 font-bold ">
          Already have an account?{" "}
          <Link
            // below to add for login
            href="/"
            title=""
            className="font-semibold text-black transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="text-base font-medium text-gray-900"
              >
                {" "}
                Username{" "}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="name"
                  id="username"
                  placeholder="Username"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900"
              >
                {" "}
                Email Address{" "}
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Password{" "}
                </label>
                {/* <a
                      href="#"
                      title=""
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      {" "}
                      Forgot password?{" "}
                    </a> */}
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="gap-2 inline-flex w-full items-center justify-center rounded-md border border-black bg-white px-3.5 py-2.5 font-semibold leading-7 text-black/85 hover:bg-black/30"
              >
                Sign in{" "}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg> */}
                <Image
                  src={UnlockLogo}
                  alt="LoginLogo"
                  className="w-[30px] h-[30px] cursor-pointer "
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserRegister;
