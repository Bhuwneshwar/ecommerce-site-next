import { connect } from "@/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

connect();

export async function GET(req: NextRequest) {
  try {
    const allProducts = await Product.find({});
    return NextResponse.json({ allProducts });
  } catch (err: any) {
    console.log(err);
    const res = NextResponse.json({ error: err.message }, { status: 500 });
    return res;
  }
}

// the below code fragment can be found in:
