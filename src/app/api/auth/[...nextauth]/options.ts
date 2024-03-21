import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connect } from "@/dbConfig/db";
import prismadb from "@/lib/prismadb";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_ID as string,
      clientSecret: process.env.GOOGLE_AUTH_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(`Database About To Connect`);
      await connect() // Assuming connect returns a promise
        .then(() => {
          console.log("Successfully connected to MongoDB!");
          return true;
        })
        .catch((error) => {
          console.error("Error connecting to MongoDB:", error);
          // Handle connection error
          return false; // Or throw an error if necessary
        });

      const currentUser = await prismadb.user.findFirst({
        where: {
          username: "_dev".concat(user.name!.split(" ")[0]).concat("_"),
          fullname: user.name!,
          email: user.email!,
          srcImage: user.image!,
        },
      });

      if (currentUser) {
        console.log(`User already exists!!`);
      } else {
        const userData = {
          username: "_dev".concat(user.name!.split(" ")[0]).concat("_"),
          fullname: user.name!,
          email: user.email!,
          srcImage: user.image!,
        };
        const newUser = await prismadb.user.create({
          data: userData,
        });
        console.log(`User Created Successfully!!`);
      }

      return true;
    },

    jwt({ token, user }) {
      if (user) {
        return { ...token, id: user.id }; // Save id to token as docs says: https://next-auth.js.org/configuration/callbacks
      }
      return token;
    },
    session: ({ session, token, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          // id: user.id, // This is copied from official docs which find user is undefined
          id: token.id, // Get id from token instead
        },
      };
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
