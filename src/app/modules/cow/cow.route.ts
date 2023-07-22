import express from "express";
import { CowController } from "./cow.controller";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/",  auth(ENUM_USER_ROLE.SELLER),CowController.createCow);
router.get("/",  CowController.getAllCows);
router.get("/:id", CowController.getSingleCow);
router.patch("/:id", auth(ENUM_USER_ROLE.SELLER),CowController.updateCow);
router.delete("/:id", auth(ENUM_USER_ROLE.SELLER),CowController.deleteCow);

export const CowRoutes = router;

