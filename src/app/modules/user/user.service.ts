import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new Error("Failed to create user!");
  }
  return createdUser;
};

const getAllUser = async (): Promise<IUser[]> => {
  const users = await User.find();
  return users;
};

const getSingleUser = async (userId: string): Promise<IUser | null> => {
  const user = await User.findById(userId);
  return user;
};

const updateUser = async (userId: string, updateData: Partial<IUser>): Promise<IUser | null> => {
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
  return updatedUser;
};

const deleteUser = async (userId: string): Promise<IUser | null> => {
  const deletedUser = await User.findByIdAndDelete(userId);
  return deletedUser;
};

const authenticateUser = async (phoneNumber: string, password: string): Promise<IUser | null> => {
  const user = await User.findOne({ phoneNumber });

  if (!user) {
    return null;
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return null;
  }

  return user;
};

export default {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  authenticateUser,
};
