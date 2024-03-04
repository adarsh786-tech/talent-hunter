"use client";
import { useState } from "react";
import Image from "next/image";
import NavBarLogo from "@/assets/talenthunter.png";
import closeLogo from "@/assets/close.svg";
import menuLogo from "@/assets/menu.svg";
import { NavLinks } from "@/constants/items";
import Link from "next/link";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="sm:px-16 px-6 flex justify-center items-center">
        <div className="xl:max-w-[1280px] w-full">
          <nav className="w-full flex py-6 justify-between items-center navbar">
            <div className="flex flex-row items-center justify-center gap-2">
              {/* // below image and text has to be combined in photoshop. PNG has */}
              {/* to generate */}
              <Image
                src={NavBarLogo}
                priority={true}
                alt="talent"
                className="cursor-pointer rounded-full border border-orange-600 border-solid w-[80px] h-full object-cover shadow-black"
              />
              <h1 className="cursor-pointer animate-text bg-gradient-to-r from-orange-600 via-white to-orange-700 bg-clip-text text-transparent font-black ">
                TALENT HUNTER
              </h1>
            </div>
            <ul className="list-none sm:flex hidden justify-end items-center flex-1">
              {NavLinks.map((navItems, indx) => (
                <li key={indx}>
                  <div>
                    <Link
                      href={navItems.url}
                      className={`text-[18px] text-white p-2 rounded-xl border border-purple-900  ${
                        indx === NavLinks.length - 1 ? "mr-0" : "mr-8"
                      }`}
                    >
                      {navItems.name}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <div className="sm:hidden flex flex-1 justify-end items-center">
              <Image
                src={toggle ? closeLogo : menuLogo}
                alt="menu"
                className="cursor-pointer w-[28px] h-[28px] object-contain"
                onClick={() => setToggle((prev) => !prev)}
              />
              <div
                className={`${
                  toggle ? `flex` : `hidden`
                } p-4 bg-slate-600 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
              >
                <ul className="list-none flex flex-col justify-end items-center flex-1">
                  {NavLinks.map((navItems, indx) => (
                    <li key={indx}>
                      <div className="">
                        <Link
                          href="/"
                          className={`text-[12px] text-white  ${
                            indx === NavLinks.length - 1 ? "mr-0" : "mb-4"
                          }`}
                        >
                          {navItems.name}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
