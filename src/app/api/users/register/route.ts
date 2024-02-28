// register route
import mongoose from "mongoose";
import { connect } from "@/dbConfig/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

import bcryptjs from "bcryptjs";

connect();

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(`Request Body: ${reqBody}`);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (emailRegex.test(email) !== true) {
      return NextResponse.json(
        { error: `Email ${email} is not valid` },
        { status: 400 }
      );
    }
    if (passwordRegex.test(password) !== true) {
      return NextResponse.json(
        { error: `Password ${password} is not valid` },
        { status: 400 }
      );
    }

    // check if user exisits..
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
        savedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
