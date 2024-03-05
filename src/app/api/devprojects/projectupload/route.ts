import { NextRequest, NextResponse } from "next/server";
import Projects from "@/models/Project";
import { connect } from "@/dbConfig/db";
export const dynamic = "force-dynamic";

connect();

export async function GET(request: NextRequest) {
  try {
    // Retrieve all projects
    const projects = await Projects.find();

    const sanitizedProjects = projects.map((project) => ({
      _id: project._id,
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      projectURL: project.projectURL,
      projectStack: project.projectStack,
      // ... other required fields
    }));

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
