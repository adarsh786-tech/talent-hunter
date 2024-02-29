// register route
import { connect } from "@/dbConfig/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (emailRegex.test(email) !== true) {
    //   return NextResponse.json(
    //     { error: `Email ${email} is not valid` },
    //     { status: 400 }
    //   );
    // }
    // if (passwordRegex.test(password) !== true) {
    //   return NextResponse.json(
    //     { error: `Password ${password} is not valid` },
    //     { status: 400 }
    //   );
    // }

    // check if user exists..
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: `User already exists!!` },
        { status: 400 }
      );
    }

    // hash password below
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(`Saved User Details: \n${savedUser}`);
    return NextResponse.json(
      {
        message: `User created successfully`,
        success: true,
        data: savedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
