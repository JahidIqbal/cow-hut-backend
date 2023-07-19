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

export default {
  createAdmin,
};
