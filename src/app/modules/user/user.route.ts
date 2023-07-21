// user.route.ts
import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/auth/signup", UserController.createUser);
router.post("/auth/login",UserController.loginUser);
router.post("/auth/refreshtoken",UserController.refreshToken);
router.get("/users", UserController.getAllUser);
router.get("/users/:id", UserController.getSingleUser);
router.patch("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export const UserRoutes = router;
