import Admin from "./admin.interface";
import AdminModel from "./admin.model";

const createAdmin = async (admin: Admin): Promise<Admin | null> => {
  const createdAdmin = await AdminModel.create(admin);

  if (!createdAdmin) {
    throw new Error("Failed to create admin!");
  }

  const adminResponse = {
    role: createdAdmin.role,
    name: createdAdmin.name,
    phoneNumber: createdAdmin.phoneNumber,
    address: createdAdmin.address,
  };

  return adminResponse;
};

export default {
  createAdmin,
};
