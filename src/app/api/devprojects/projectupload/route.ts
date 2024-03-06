import { NextRequest, NextResponse } from "next/server";
import Projects from "@/models/Project";
import UserProject from "@/models/UserProject";
import { connect } from "@/dbConfig/db";
import jwt from "jsonwebtoken";
import ObjectId from "mongoose";

connect();

interface JwtPayload {
  id: string; // Include the missing property
  // ... other properties
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

    // Extract user ID
    const userId = (decodedToken as JwtPayload).id;
    console.log("===================================================");
    console.log("User ID IS: ", userId);
    console.log("===================================================");
    // const oid = new ObjectId(userId);

    // Retrieve all projects
    // const projects = await Projects.find({ userId: userId });
    // const projects = await Projects.find({ _id: objectId });
    // { _id: ObjectId(userId) }
    const projects = await Projects.find({ projectName: "Youtube Clone" });
    const sanitizedProjects = projects.map((project) => ({
      _id: project._id,
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      projectURL: project.projectURL,
      projectStack: project.projectStack,
      // ... other required fields
    }));
    // console.log(sanitizedProjects);
    console.log([projects]);

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

    // Return only necessary fields or redact sensitive data
    const sanitizedProject = {
      _id: savedProject._id, // Assuming _id is public
      projectName: savedProject.projectName,
      projectDescription: savedProject.projectDescription,
      projectURL: savedProject.projectURL,
      projectStack: savedProject.projectStack,
      // ... other required fields
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
    // Handle specific error types here (e.g., database errors) and provide tailored messages
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
