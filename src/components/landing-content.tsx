"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Dominic",
    avatar: "D",
    title: "Full Stack Engineer",
    description: "Best Application Ever Created. Kudos to the entire team!!!",
  },
  {
    name: "Elena",
    avatar: "E",
    title: "Creative Content Creator",
    description:
      "Talent Hunter is a game-changer! It's like having a creative genie in a bottle. My one stop platform for portfolio!",
  },
  // {
  //   name: "Marcus",
  //   avatar: "M",
  //   title: "Data-Driven Wordsmith",
  //   description:
  //     "MindPerfect.ai is my secret weapon. It turns data into compelling narratives effortlessly. A must-have tool for any content strategist!",
  // },
  {
    name: "Sophie",
    avatar: "S",
    title: "Master of Content Innovation",
    description:
      "This platform is next level. It's intuitive, versatile, and always delivers beyond expectations. Simply brilliant!",
  },
  // {
  //   name: "Alex",
  //   avatar: "A",
  //   title: "Content Strategy Maestro",
  //   description:
  //     "MindPerfect.ai is the cornerstone of my content strategy. It's like having an entire team of experts at my fingertips. Thank you for making my job easier!",
  // },
  {
    name: "Natalie",
    avatar: "N",
    title: "Content Quality Guardian",
    description:
      "Talent Hunter ensures that every piece of my content meets the highest standards. It's a lifesaver for maintaining consistency and excellence. Bravo!",
  },
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-sm text-zinc-400">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
