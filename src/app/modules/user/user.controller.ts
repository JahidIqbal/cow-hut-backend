import config from "../../../config";
import { IUser,UserModel } from "./user.interface";
import { User } from "./user.model";
import userService from "./user.service";
import jwt, { JsonWebTokenError, sign, Secret } from "jsonwebtoken";
import bcrypt from 'bcrypt';
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
  console.log(req.headers.authorization);
  console.log(req.user);
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
    // console.log(req.params);
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

    // Authenticate user and generate access token and refresh token
    const user = await userService.authenticateUser(phoneNumber, password);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        data: null,
      });
    }

    // Generate the access token and refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user); // New function to generate refresh token

    // const refreshTokenExpiresIn = Number(config.jwt.refresh_expires_in);

    // Send the refresh token in the HTTP response's cookie header
    res.cookie("refreshToken", refreshToken, {
      // httpOnly: true,
      // maxAge: refreshTokenExpiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set 'secure' to true in production
      maxAge: 365 * 24 * 60 * 60 * 1000, // Set the cookie to expire in 365 days
    });
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
const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the refreshToken from the request cookie
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
      // Verify the refresh token using the refresh_secret
      const decodedToken = jwt.verify(
        refreshToken,
        config.jwt.refresh_secret as Secret
      ) as IUser;

      // Generate a new access token using the decoded user information
      const accessToken = generateAccessToken(decodedToken);

      // Send the new access token in the response
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

// console.log(refreshToken,'refreshtoken');

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
  // const refreshToken = jwt.sign(payload, refresh_secret, { expiresIn });
  return accessToken;
};

const generateRefreshToken = (user: IUser) => {
  const payload = {
    _id: user._id.toString(),
    phoneNumber: user.phoneNumber,
    role: user.role,
  };

  const secretKey = config.jwt.refresh_secret as Secret;
  const expiresIn = config.jwt.refresh_expires_in as string;

  // Generate and return the refresh token
  const refreshToken = jwt.sign(payload, secretKey, { expiresIn });

  return refreshToken;
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


const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IUser;

    // Fetch the user profile based on the user's _id
    const userProfile = await User.findById(user._id);
   console.log(userProfile);
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
        data: null,
      });
    }

    // Return the user profile information
    res.status(200).json({
      success: true,
      message: "User's information retrieved successfully",
      data: {
        name: {
          firstName: userProfile.name.firstName,
          lastName: userProfile.name.lastName,
        },
        phoneNumber: userProfile.phoneNumber,
        address: userProfile.address,
      },
    });
  } catch (error) {
    next(error);
  }
};


const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as IUser;
    const { firstName, lastName, phoneNumber, address, password } = req.body;

    // Fetch the user profile based on the user's _id
    const userProfile = await User.findById(user._id);

    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User profile not found",
        data: null,
      });
    }

    // Update the user profile information
    userProfile.name.firstName = firstName;
    userProfile.name.lastName = lastName;
    userProfile.phoneNumber = phoneNumber;
    userProfile.address = address;

    // If the user provides a password, hash it and update the hashed password
    if (password) {
      userProfile.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user profile
    const updatedUserProfile = await userProfile.save();

    // Return the updated user profile information
    res.status(200).json({
      success: true,
      message: "User's information updated successfully",
      data: {
        name: {
          firstName: updatedUserProfile.name.firstName,
          lastName: updatedUserProfile.name.lastName,
        },
        phoneNumber: updatedUserProfile.phoneNumber,
        address: updatedUserProfile.address,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  loginUser,
  refreshToken,
  getUserProfile,
  updateUserProfile
};
