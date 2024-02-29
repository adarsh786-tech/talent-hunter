// login route
import { connect } from "@/dbConfig/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log(`Email: ${email}, Password: ${password}`);

    // check if user exists..
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: `User doesn't exist!!` },
        { status: 400 }
      );
    }
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: `Invalid password!!` },
        { status: 400 }
      );
    }
    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.AUTH_SECRET!, {
      expiresIn: "5h",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }
}
