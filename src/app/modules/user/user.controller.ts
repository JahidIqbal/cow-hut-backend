import config from "../../../config";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import userService from "./user.service";
import jwt,{ JsonWebTokenError, sign,Secret } from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.createUser(req.body);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUser();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const user = await userService.getSingleUser(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
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

    // Authenticate user and generate access token
    const user = await userService.authenticateUser(phoneNumber, password);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        data: null,
      });
    }

    // Generate the access token
    const accessToken = generateAccessToken(user);

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
const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Ensure the refreshToken is provided in the request cookie
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is missing",
        data: null,
      });
    }

    try {
      // Verify the refresh token
      const decodedToken = jwt.verify(refreshToken, config.jwt.refresh_secret as string) as IUser;

      // Generate a new access token using the decoded user information
      const accessToken = generateAccessToken(decodedToken);

      res.status(200).json({
        success: true,
        message: "Access token refreshed successfully",
        data: {
          accessToken,
        },
      });
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
        data: null,
      });
    }
  } catch (error) {
    next(error);
  }
};



const generateAccessToken = (user: IUser) => {
  const payload = {
    _id: user._id.toString(),
    phoneNumber: user.phoneNumber,
    role: user.role,
  };

  const secretKey = config.jwt.secret as Secret;
  const expiresIn = config.jwt.expires_in as string;

  // Generate and return the access token
  const accessToken = jwt.sign(payload, secretKey, { expiresIn });

  return accessToken;
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await userService.updateUser(id, updateData);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  loginUser,
  refreshToken
};
