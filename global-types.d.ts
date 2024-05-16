declare interface IUser {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

interface IProduct {
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  rating: number;
  numReviews: number;
  keyWords: string[];
  // Add other relevant fields if needed
}

interface ITokenData {
  id?: Types.ObjectId;
  name?: string;
  email?: string;
}
