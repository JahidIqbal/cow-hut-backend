import jwt,{ JsonWebTokenError, sign } from "jsonwebtoken";
import config from "../../../config";
import Admin from "./admin.interface";
import AdminModel from "./admin.model";
import bcrypt from 'bcrypt';

const createAdmin = async (admin: Admin): Promise<Admin | null> => {
  console.log(admin); // Add this line to log the admin object

  if (!admin.password) {
    admin.password=config.default_admin_pass as string;
  }

  const createdAdmin = await AdminModel.create(admin);
  const hashedPassword = await bcrypt.hash(admin.password, Number(config.bcrypt_salt_rounds));

  const adminResponse = {
    role: createdAdmin.role,
    name: createdAdmin.name,
    phoneNumber: createdAdmin.phoneNumber,
    address: createdAdmin.address,
  };

  // Save the hashed password to the admin model or update it accordingly
  createdAdmin.password = hashedPassword;
  await createdAdmin.save();

  console.log(adminResponse);
  return adminResponse;
};


const generateTokens = (adminId: string, role: string) => {
  const accessToken = jwt.sign({ _id: adminId, role }, config.jwt.secret as string, {
    expiresIn: config.jwt.expires_in,
  });

  const refreshToken = jwt.sign({ _id: adminId, role }, config.jwt.refresh_secret as string, {
    expiresIn: config.jwt.refresh_expires_in,
  });

  return { accessToken, refreshToken };
};


const loginAdmin = async (phoneNumber: string, password: string) => {
  const admin = await AdminModel.findOne({ phoneNumber });

  if (!admin) {
    throw new Error('Admin not found');
  }

  // Ensure that the admin.password is not undefined before proceeding
  if (typeof admin.password === 'undefined') {
    throw new Error('Admin password is missing');
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate access token and refresh token
  const { accessToken, refreshToken } = generateTokens(admin._id.toString(), admin.role);

  return { accessToken, refreshToken };
};

export default {
  createAdmin,
  loginAdmin,
};