import { connect } from "@/config/dbConnection";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  let res;
  try {
    const reqBody = await req.json();
    console.log({ reqBody });
    const { email, password } = reqBody;

    const user = await User.findOne({ email, isAdmin: true });
    if (!user) {
      res = NextResponse.json({ error: "User not found" }, { status: 400 });
      return res;
    }
    console.log("User Exists", user);

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      res = NextResponse.json({ error: "Invalid crediance " }, { status: 400 });
      return res;
    }
    console.log("Password Matched");
    // export interface TokenType {
    //   id: string;
    //   username: string;
    //   email: string;
    // }
    const tokenData: ITokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Logged in successfully as Administrator",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (err: any) {
    console.log(err);
    const res = NextResponse.json({ error: err.message }, { status: 500 });
    return res;
  }
}

// the below code fragment can be found in:
