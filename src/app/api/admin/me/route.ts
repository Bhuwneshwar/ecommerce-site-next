import { connect } from "@/config/dbConnection";
import { getDataFromToken } from "@/utilities/getDataFromToken";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    // extract data from token
    const userId = await getDataFromToken(req);
    if (userId) {
      const user = await User.findById(userId).select("-password");
      console.log({ user });

      if (user) {
        return NextResponse.json({ message: "User found", user: user });
      } else return NextResponse.json({ message: "User not found" });
    }
  } catch (error) {
    console.log({ error });
  }
}
