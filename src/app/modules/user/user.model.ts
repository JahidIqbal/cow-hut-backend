import { Schema, model, Document, Model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser & Document>({
  phoneNumber: { type: String, required: true },
  role: { type: String, enum: ["seller", "buyer"], required: true },
  password: { type: String, required: true },
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  address: { type: String, required: true },
  budget: { type: Number, required: true },
  income: { type: Number, required: true },
});

export const User: Model<IUser & Document> = model<IUser & Document>("User", userSchema);
