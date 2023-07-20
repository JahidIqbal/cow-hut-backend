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

    // Attempt to login the admin
    const { accessToken, refreshToken } = await AdminService.loginAdmin(phoneNumber, password);

    // Set the refresh token in a browser cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set 'secure' to true in production
      maxAge: 365 * 24 * 60 * 60 * 1000, // Set the cookie to expire in 365 days
    });

    // Send the access token in the response
    res.status(200).json({
      success: true,
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
