import { Schema, model, Document, Model } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../../config";

const UserSchema = new Schema<IUser & Document>({
  phoneNumber: { type: String, required: true },
  role: { type: String, enum: ["seller", "buyer","admin"], required: true },
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

UserSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<
  IUser,
  'id' | 'password' | 'role' | 'needsPasswordChange'
> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};


UserSchema.pre('save',async function(next){
  //hashing user password
  
  const user=this;

  user.password=await bcrypt.hash(this.password,Number(config.bcrypt_salt_rounds));
  // console.log(this)
  next();
})

export const User: Model<IUser & Document> = model<IUser & Document>("User", UserSchema);
