import mongoose, { Document } from 'mongoose';

export type UserName = {
    firstName: string;
    lastName: string;
  };
  
export interface IUser extends Document {
  phoneNumber: string;
  role: "seller" | "buyer";
  password: string;
  name: UserName;
  address: string;
  budget: number;
  income: number;
}

export interface IOrder extends Document {
  cow: mongoose.Types.ObjectId; // Assuming the cow reference is stored as a string
  buyer: mongoose.Types.ObjectId;
  // Add any additional properties you need for the order
}
