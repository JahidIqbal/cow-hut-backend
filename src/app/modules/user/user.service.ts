// user.service.ts
import { IUser } from "./user.interface";
import { User } from "./user.model";

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

export default {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser
};
