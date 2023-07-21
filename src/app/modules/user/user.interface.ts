import { Document, Model, Types } from "mongoose";
import Admin from "../admin/admin.interface";

export interface IUser extends Document {
  email: any;
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

  id: string;
  needsPasswordChange: true | false;
  admin?: Types.ObjectId | Admin;
}

export type UserModel = Model<IUser>;

