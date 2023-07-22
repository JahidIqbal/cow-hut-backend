import express from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post(
  "/create-admin",
  AdminController.createAdmin
);
// router.post("/login",  auth([ENUM_USER_ROLE.ADMIN]),AdminController.loginAdmin);
router.post("/login",AdminController.loginAdmin);

export const AdminRoutes = router;
