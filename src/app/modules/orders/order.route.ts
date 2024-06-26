import express from "express";
import { OrderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post("/",auth(ENUM_USER_ROLE.BUYER), OrderController.createOrder);
router.get("/", OrderController.getAllOrders);

export const OrderRoutes = router;

