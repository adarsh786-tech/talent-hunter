import { connect } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import { useSession } from "next-auth/react";
import prismadb from "@/lib/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongoose";
connect();

// export const dynamic = "force-dynamic";
// get all projects for a user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Internal server error!!" },

        { status: 300 }
      );
    }
    const currentLoggedInUser = await prismadb.user.findFirst({
      where: {
        email: session?.user.email,
      },
    });
    const userExists = await prismadb.user.findUnique({
      where: {
        id: currentLoggedInUser?.id as string,
        username: currentLoggedInUser?.username as string,
        fullname: session?.user?.name as string,
        email: session?.user?.email as string,
        srcImage: session?.user?.image as string,
      },
    });
    if (!userExists) {
      return NextResponse.json({
        message: "User does not exist!!",
        status: 401,
      });
    }
    const findAllProjects = await prismadb.project.findMany({
      where: {
        userId: currentLoggedInUser?.id,
      },
    });
    console.log(`Project Data....`);
    console.log(findAllProjects);
    return NextResponse.json(
      {
        message: "Project reeived successfully",
        success: true,
        data: findAllProjects,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving project:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Session Expired...Login Again" },
        { status: 500 }
      );
    } else {
      const firstUser = await prismadb.user.findFirst({
        where: {
          email: session?.user.email,
        },
      });
      const { projectName, projectDescription, projectURL, projectStack } =
        await request.json();

      const userExists = await prismadb.user.findUnique({
        where: {
          id: firstUser?.id as string,
          username: firstUser?.username as string,
          fullname: session?.user?.name as string,
          email: session?.user?.email as string,
          srcImage: session?.user?.image as string,
        },
      });
      if (!userExists) {
        return NextResponse.json({
          message: "User does not exist!!",
          status: 401,
        });
      }
      const newProject = await prismadb.project.create({
        data: {
          userId: firstUser?.id as string,
          username: firstUser?.username as string,
          projectName: projectName as string,
          projectDescription: projectDescription as string,
          projectUrl: projectURL as string,
          projectTechStack: projectStack as string,
        },
      });
      return NextResponse.json(
        {
          message: "Project uploaded successfully",
          success: true,
          data: newProject,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error saving project:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
