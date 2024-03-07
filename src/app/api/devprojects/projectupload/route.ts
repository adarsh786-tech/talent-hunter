import { NextRequest, NextResponse } from "next/server";
import Projects from "@/models/Project";
import UserProject from "@/models/UserProject";
import { connect } from "@/dbConfig/db";
import jwt from "jsonwebtoken";
import ProjectUsers from "@/models/UserProject";

connect();

interface JwtPayload {
  id: string;
}

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const userToken = request.cookies.get("token")?.value;
    if (!userToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // token expiration will be handled later

    const decodedToken = await jwt.verify(userToken, process.env.AUTH_SECRET!);

    const userId = (decodedToken as JwtPayload).id;
    console.log(userId);

    const projectData = await ProjectUsers.find({ userId: userId });

    if (!projectData) {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
    console.log(projectData);

    let resultantData: any[] = [];

    const fetchData = async () => {
      for (const proj of projectData) {
        const projectActualId = proj.projects[0];
        try {
          const projectEntries = await Projects.findOne({
            _id: projectActualId,
          });
          resultantData.push(projectEntries);
        } catch (error) {
          console.error(
            `Error fetching project with ID ${projectActualId}:`,
            error
          );
        }
      }

      return resultantData;
    };

    const dataCollection = await fetchData();
    console.log(dataCollection);

    const sanitizedProjects = dataCollection.map((project: any) => ({
      _id: project._id,
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      projectURL: project.projectURL,
      projectStack: project.projectStack,
    }));
    console.log(sanitizedProjects);

    return NextResponse.json(
      {
        message: "Projects retrieved successfully",
        success: true,
        data: sanitizedProjects,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving projects:", error);
    return NextResponse.json(
      { message: "Failed to retrieve projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { projectName, projectDescription, projectURL, projectStack } =
      await request.json();

    const newProject = new Projects({
      projectName,
      projectDescription,
      projectURL,
      projectStack,
    });

    const savedProject = await newProject.save();

    const sanitizedProject = {
      _id: savedProject._id,
      projectName: savedProject.projectName,
      projectDescription: savedProject.projectDescription,
      projectURL: savedProject.projectURL,
      projectStack: savedProject.projectStack,
    };

    const token = request.cookies.get("token")?.value;

    if (!token) {
      // Handle unauthorized access
      return NextResponse.json(
        { message: "Unauthorized Access" },
        { status: 401 }
      );
    }

    // Verify and decode JWT
    const decodedToken = await jwt.verify(token, process.env.AUTH_SECRET!);

    // Extract user ID
    const userId = (decodedToken as JwtPayload).id;

    const userProject = new UserProject({
      userId: userId, // need to be updated
      projects: [savedProject._id],
    });
    await userProject.save();

    return NextResponse.json(
      {
        message: "Project uploaded successfully",
        success: true,
        data: sanitizedProject,
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
