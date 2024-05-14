import { connect } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMailer } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log({ reqBody });

    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log({ savedUser });

    //send verification email
    const sentEmail = await sendMailer({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    console.log({ sentEmail });

    return NextResponse.json({
      message: "User register successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
