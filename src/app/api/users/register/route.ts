// // register route
// import { connect } from "@/dbConfig/db";
// import User from "@/models/UserAuth";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";

// connect();

// export async function POST(request: NextRequest) {
//   try {
//     const { username, email, password } = await request.json();

//     // check if user exists..
//     const user = await User.findOne({ email });
//     if (user) {
//       return NextResponse.json(
//         { error: `User already exists!!` },
//         { status: 400 }
//       );
//     }

//     // hash password below
//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(password, salt);
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     const savedUser = await newUser.save();
//     console.log(`Saved User Details: \n${savedUser}`);
//     return NextResponse.json(
//       {
//         message: `User created successfully`,
//         success: true,
//         data: savedUser,
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return NextResponse.json({ error: `${error}` }, { status: 500 });
//   }
// }
