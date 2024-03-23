import { ChevronRight } from "lucide-react";
import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const footerContents = [
  {
    title: "Know About Us",
    content: [
      "About us",
      "Careers",
      "Our Vision",
      "Our Mission",
      "Press Release",
    ],
  },
  {
    title: "Connect with us",
    content: ["Linkedin", "Twitter", "Instagram"],
  },
  {
    title: "How can we help",
    content: ["Contact us"],
  },
];

const FooterPage = () => {
  return (
    <footer className="w-full">
      <div className="mx-auto flex max-w-6xl flex-col items-start space-x-8 md:flex-row">
        <div className="w-full px-4 md:w-1/2 lg:px-0">
          <h1 className="max-w-sm text-3xl font-bold text-white">
            Subscribe For Regular Updates
          </h1>
          <form
            action=""
            className="mt-4 inline-flex w-full items-center md:w-3/4"
          >
            <input
              className="flex h-10 w-full rounded-md border border-white bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Email"
            />
            <button
              type="button"
              className="ml-4 rounded-full bg-gray-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-3">
          {footerContents.map((footerContent, i) => (
            <div key={i} className="mb-8 lg:mb-0">
              <p className="mb-3 text-lg font-semibold text-white ">
                {footerContent.title}
              </p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500 cursor-pointer">
                {footerContent.content.map((item, indx) => (
                  <Link key={indx} href="#">
                    <h1 className="text-zinc-400 hover:underline">{item}</h1>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-4" />
      <div className="mx-auto max-w-6xl items-center justify-between px-4 md:flex lg:px-0">
        <div className="inline-flex items-center gap-2 mb-5">
          {/* <Image
            width={30}
            height={30}
            alt="Logo"
            src="/logo.png"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg border border-red shadow-white"
          /> */}
          <h1
            className={cn(
              "text-2xl font-bold bg-gradient-to-r from-teal-400 via-white to-teal-500 bg-clip-text text-transparent",
              font.className
            )}
          >
            Talent
          </h1>
          <h1
            className={cn(
              "text-md font-bold bg-gradient-to-r from-teal-400 via-white to-teal-500 bg-clip-text text-transparent",
              font.className
            )}
          >
            Hunter
          </h1>
        </div>
        <div className="mt-4 md:mt-0 mb-5 flex flex-row gap-4">
          <p className="text-sm font-medium text-gray-500">
            © 2024 Talent Hunter
          </p>

          <p className="text-sm font-medium text-gray-500">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default FooterPage;
