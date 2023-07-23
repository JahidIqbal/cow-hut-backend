// user.route.ts
import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get("/users/my-profile", auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.BUYER,ENUM_USER_ROLE.SELLER),UserController.getUserProfile);
router.post("/auth/signup", UserController.createUser);
router.post("/auth/login",UserController.loginUser);
router.post("/auth/refresh-token",UserController.refreshToken);
router.get("/users", auth(ENUM_USER_ROLE.ADMIN),UserController.getAllUser);
router.get("/users/:id",auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.patch("/users/:id",auth(ENUM_USER_ROLE.ADMIN), UserController.updateUser);
router.delete("/users/:id",auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);
router.patch("/users/my-profile", UserController.updateUserProfile);
export const UserRoutes = router;
