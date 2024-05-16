import mongoose, { Schema } from "mongoose";

// Define the properties of your User schema
// interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   isVerified: boolean;
//   isAdmin: boolean;
//   forgotPasswordToken?: string;
//   forgotPasswordTokenExpiry?: Date;
//   verifyToken?: string;
//   verifyTokenExpiry?: Date;
// }

// Create the Mongoose schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

// Create and export the User model
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
