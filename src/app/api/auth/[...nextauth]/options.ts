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
          name: user.name!,
          email: user.email!,
          srcImage: user.image!,
        },
      });
      if (currentUser) {
        console.log(`User already exists!!`);
      } else {
        const userData = {
          name: user.name,
          email: user.email,
          srcImage: user.image,
        };
        const newUser = await prismadb.user.create({
          data: userData,
        });
        console.log(`User Created: ${newUser}`);
      }

      return true;
    },
    async jwt({ token, user, session }) {
      console.log("JWT callback: ", { token, user, session });
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.image,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("Session callback: ", user);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.picture,
        },
      };
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
