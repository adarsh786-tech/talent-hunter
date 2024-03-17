"use client";

import Image from "next/image";
import Link from "next/link";

const teamData = [
  {
    indx: 1,
    name: "Liam",
    role: "Lead Developer",
    bio: "With a passion for coding and problem-solving, Liam led the development team to ensure the website's functionality was top-notch.",
    instaHandle: "#",
    twitterHandle: "#",
    linkedinHandle: "#",
    srcImage: "/liam.jpg",
  },
  {
    indx: 2,
    name: "Emma",
    role: "UI/UX Designer",
    avatar: "E",
    bio: "Emma's keen eye for design and user experience brought Talent Hunter to life with a sleek and intuitive interface that users love.",
    instaHandle: "#",
    twitterHandle: "#",
    linkedinHandle: "#",
    srcImage: "/emma.jpg",
  },
  {
    indx: 3,
    name: "Max",
    role: "Data Scientist",
    avatar: "M",
    bio: "Max applied advanced data analytics to optimize user interactions and personalize experiences on the Talent Hunter platform.",
    instaHandle: "#",
    twitterHandle: "#",
    linkedinHandle: "#",
    srcImage: "/max.jpg",
  },
  {
    indx: 4,
    name: "Ava",
    role: "Content Strategist",
    avatar: "A",
    bio: "Ava crafted compelling messaging and content strategies that resonate with users, driving engagement and conversions.",
    instaHandle: "#",
    twitterHandle: "#",
    linkedinHandle: "#",
    srcImage: "/ava.jpg",
  },
];

const TeamDataContent = () => {
  return (
    <div className="px-10 pb-20" id="team-data">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Our Team, Our Pride
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-gray-300 md:text-xl">
        Experts Who Handcrafted This Interface To Bring New Experience In Your
        Life.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {teamData.map((member) => (
          <div
            key={member.indx}
            className="mx-auto w-[300px] rounded-md border"
          >
            {/* "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGh1bWFufGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60" */}
            <Image
              src={member.srcImage}
              alt={member.name}
              width={800}
              height={200}
              className="rounded-t-md object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold text-white">
                {member.name}
              </h1>
              <h6 className="mt-3 font-medium text-zinc-300">{member.role}</h6>
              <p className="mt-3 text-sm text-gray-200">{member.bio}</p>
              <div className="mt-4 flex flex-wrap">
                <div className="w-auto p-1.5">
                  <Link href={member.instaHandle}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                      <Image
                        src="/instagram.svg"
                        width={20}
                        height={20}
                        alt="Instagram"
                      />
                    </div>
                  </Link>
                </div>
                <div className="w-auto p-1.5">
                  <Link href={member.linkedinHandle}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                      <Image
                        src="/linkedin.svg"
                        width={20}
                        height={20}
                        alt="Linkedin"
                      />
                    </div>
                  </Link>
                </div>
                <div className="w-auto p-1.5">
                  <Link href={member.twitterHandle}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                      <Image
                        src="/twitter.svg"
                        width={20}
                        height={20}
                        alt="Twitter"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDataContent;
