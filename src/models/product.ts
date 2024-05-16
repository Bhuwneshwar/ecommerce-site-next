import mongoose from "mongoose";

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    keyWords: [],
    // Add other relevant fields like category, stock etc.
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
export default Product;
