import { Request, Response, NextFunction } from "express";
import AdminService from "./admin.service";
import Admin from "./admin.interface";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminData: Admin = req.body;

    if (!adminData) {
      return res.status(400).json({
        success: false,
        message: "Admin data is missing",
        data: null,
      });
    }

    const createdAdmin = await AdminService.createAdmin(adminData);
    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: createdAdmin,
    });
  } catch (error) {
    next(error);
  }
};

const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phoneNumber, password } = req.body;

    // Ensure both phoneNumber and password are provided
    if (!phoneNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "Both phoneNumber and password are required",
        data: null,
      });
    }

    const { accessToken } = await AdminService.loginAdmin(phoneNumber, password);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  createAdmin,
  loginAdmin,
};
