import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import prismadb from "@/lib/prismadb";

export async function GET(request: NextRequest) {
  try {
    const allProjects = await prismadb.project.findMany();
    return NextResponse.json(
      {
        message: "Project reeived successfully",
        success: true,
        data: allProjects,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
