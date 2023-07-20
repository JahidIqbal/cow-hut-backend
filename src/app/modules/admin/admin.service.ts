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

const loginAdmin = async (phoneNumber: string, password: string): Promise<{ accessToken: string }> => {
  const admin = await AdminModel.findOne({ phoneNumber });
  console.log('Received login request with phoneNumber:', phoneNumber);
  console.log('Received login request with password:', password);
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

  const payload = {
    _id: admin._id.toString(),
    role: admin.role,
  };

  const secretKey = config.jwt.secret as string; // No need to cast to string here
  const accessToken = sign(payload, secretKey, { expiresIn: '1h' });

  return { accessToken };
};

export default {
  createAdmin,
  loginAdmin,
};