import { connect } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import { useSession } from "next-auth/react";
import prismadb from "@/lib/prismadb";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
connect();

// export const dynamic = "force-dynamic";
// export async function GET(request: NextRequest) {
//   try {
//     const userToken = request.cookies.get("token")?.value;
//     if (!userToken) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }
//     // token expiration will be handled later

//     const decodedToken = await jwt.verify(userToken, process.env.AUTH_SECRET!);

//     const userId = (decodedToken as JwtPayload).id;
//     console.log(userId);

//     const projectData = await ProjectUsers.find({ userId: userId });

//     if (!projectData) {
//       return NextResponse.json(
//         { message: "Internal Server Error" },
//         { status: 500 }
//       );
//     }
//     console.log(projectData);

//     let resultantData: any[] = [];

//     const fetchData = async () => {
//       for (const proj of projectData) {
//         const projectActualId = proj.projects[0];
//         try {
//           const projectEntries = await Projects.findOne({
//             _id: projectActualId,
//           });
//           resultantData.push(projectEntries);
//         } catch (error) {
//           console.error(
//             `Error fetching project with ID ${projectActualId}:`,
//             error
//           );
//         }
//       }

//       return resultantData;
//     };

//     const dataCollection = await fetchData();
//     console.log(dataCollection);

//     const sanitizedProjects = dataCollection.map((project: any) => ({
//       _id: project._id,
//       projectName: project.projectName,
//       projectDescription: project.projectDescription,
//       projectURL: project.projectURL,
//       projectStack: project.projectStack,
//     }));
//     console.log(sanitizedProjects);

//     return NextResponse.json(
//       {
//         message: "Projects retrieved successfully",
//         success: true,
//         data: sanitizedProjects,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error retrieving projects:", error);
//     return NextResponse.json(
//       { message: "Failed to retrieve projects" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: NextRequest) {
  try {
    // const sessionObj = await authOptions.callbacks?.session;
    // console.log(sessionObj);
    const session = await getServerSession(authOptions);
    console.log(
      "Session Details:\n----------------------------------\n",
      session
    );

    // console.log("JWT Details: ", session?.user._id);

    // console.log("Session id: ", session?.user._id);
    // console.log("Session Name: ", session?.user.name);
    // console.log("Session Email: ", session?.user.email);
    // console.log("Session Image: ", session?.user.srcImage);
    // console.log("Session Image: ");

    const { projectName, projectDescription, projectURL, projectStack } =
      await request.json();
    console.log(projectName, projectDescription, projectURL, projectStack);

    // const userExists = await prismadb.user.findUnique({
    //   where: {
    //     id: session?.user.id,
    //     name: session?.user?.name as string,
    //     email: session?.user?.email as string,
    //     srcImage: session?.user?.image as string,
    //   },
    // });

    // if (!userExists) {
    //   return NextResponse.json({
    //     message: "User does not exist!!",
    //     status: 401,
    //   });
    // }
    const newProject = await prismadb.project.create({
      data: {
        userId: "65f8b6c0b007c924b4c65e5f",
        projectName: projectName,
        projectDescription: projectDescription,
        projectUrl: projectURL,
        projectTechStack: projectStack,
      },
    });

    // if (!session) {
    //   // Handle unauthorized access
    //   return NextResponse.json(
    //     { message: "Unauthorized Access" },
    //     { status: 401 }
    //   );
    // }

    return NextResponse.json(
      {
        message: "Project uploaded successfully",
        success: true,
        data: newProject,
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
