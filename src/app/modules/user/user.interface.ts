import { Document, Model } from "mongoose";

export interface IUser extends Document {
  password: string;
  role: "seller" | "buyer" | "admin";
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
  createdAt: Date;
  updatedAt: Date;
}

export type UserModel = Model<IUser>;

