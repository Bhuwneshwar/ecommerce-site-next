import { connect } from "@/config/dbConnection";
import Product from "@/models/product";
import User from "@/models/user";
import { getDataFromToken } from "@/utilities/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (req: NextRequest) => {
  try {
    const id = getDataFromToken(req);
    const isAdmin = await User.findOne({ _id: id, isAdmin: true });
    if (!isAdmin)
      return NextResponse.json({
        error: true,
        message: "Admin user not found. Please login as admin!",
      });

    const reqBody = await req.json();
    console.log({ reqBody });
    const {
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
      rating,
      numReviews,
      keyWords,
    } = reqBody;

    if (
      name &&
      description &&
      price &&
      imageUrl &&
      category &&
      stock &&
      rating &&
      numReviews &&
      keyWords
    ) {
    } else {
      return NextResponse.json({
        error: true,
        message: "all fields are required!",
      });
    }

    const newProduct: IProduct = {
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
      rating,
      numReviews,
      keyWords,
    };

    // Example usage:
    const savedProduct = await Product.create(newProduct);
    console.log(savedProduct.name); // Accessing properties safely
    return NextResponse.json({ savedProduct });
  } catch (error) {
    console.log({ error });
  }
};
