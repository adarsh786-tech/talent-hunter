"use client";
import React, { useEffect, useState } from "react";
import LoginLogo from "@/assets/login.png";
import UnlockLogo from "@/assets/unlock.png";
import Logo from "@/assets/talenthunter.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const UserRegister = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/users/register", user);
      console.log(`Registration Success... ${response.data}`);
      toast.success(`Registration Success... ${response.data}`);
      router.push("/login");
    } catch (error: any) {
      console.log(`Registration Failed...Error: ${error}`);
      toast.error(`Registration Failed... Error: ${error}`);
    }
    setUser({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    // <section className="flex justify-center items-center px-4 py-4 ">
    //   <Toaster position="top-right" />
    //   <div className="xl:w-full xl:mx-auto xl:max-w-sm 2xl:max-w-md">
    //     <div className="flex justify-center">
    //       <Image
    //         src={Logo}
    //         priority={true}
    //         alt="LoginPageImage"
    //         className="lg:w-full lg:h-auto sm:w-32 sm:h-auto md:w-48 md:h-auto rounded-full"
    //       />
    //     </div>
    //     <div className="flex flex-row justify-center items-cente gap-2">
    //       <Image
    //         src={LoginLogo}
    //         alt="LoginLogo"
    //         className="w-[30px] h-[30px] cursor-pointer border border-white"
    //       />
    //       <h2 className="cursor-pointer text-center text-2xl font-bold leading-tight text-black">
    //         Sign up to your account
    //       </h2>
    //     </div>
    //     <p className="mt-2 text-center text-sm text-gray-600 font-bold ">
    //       Already have an account?{" "}
    //       <Link
    //         // below to add for login
    //         href="/login"
    //         title=""
    //         className="font-semibold text-black transition-all duration-200 hover:underline"
    //       >
    //         Login
    //       </Link>
    //     </p>
    //     <form className="mt-8">
    //       <div className="space-y-5">
    //         <div>
    //           <label
    //             htmlFor="username"
    //             className="text-base font-medium text-gray-900"
    //           >
    //             {" "}
    //             Username{" "}
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
    //               type="name"
    //               id="username"
    //               placeholder="Username"
    //               required
    //               value={user.username}
    //               onChange={(e) =>
    //                 setUser({ ...user, username: e.target.value })
    //               }
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           <label
    //             htmlFor="email"
    //             className="text-base font-medium text-gray-900"
    //           >
    //             {" "}
    //             Email Address{" "}
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
    //               type="email"
    //               id="email"
    //               placeholder="Email"
    //               required
    //               value={user.email}
    //               onChange={(e) => setUser({ ...user, email: e.target.value })}
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           <div className="flex items-center justify-between">
    //             <label
    //               htmlFor="password"
    //               className="text-base font-medium text-gray-900"
    //             >
    //               {" "}
    //               Password{" "}
    //             </label>
    //           </div>
    //           <div className="mt-2">
    //             <input
    //               className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
    //               type="password"
    //               id="password"
    //               placeholder="Password"
    //               required
    //               value={user.password}
    //               onChange={(e) =>
    //                 setUser({ ...user, password: e.target.value })
    //               }
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           <button
    //             type="submit"
    //             className="gap-2 inline-flex w-full items-center justify-center rounded-md border border-black bg-white px-3.5 py-2.5 font-semibold leading-7 text-black/85 hover:bg-black/30"
    //             onClick={onSignup}
    //           >
    //             {buttonDisabled === true ? "No Sign In" : "Sign In"}{" "}
    //             <Image
    //               src={UnlockLogo}
    //               alt="LoginLogo"
    //               className="w-[30px] h-[30px] cursor-pointer "
    //             />
    //           </button>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </section>
    <div className="bg-slate-900 h-full w-full overflow-auto">
      <div className="text-white font-bold py-36 text-center space-y-5">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xpace-y-5 font-extrabold">
          <h1>Sign Up</h1>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
