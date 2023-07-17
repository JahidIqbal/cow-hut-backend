import { Request, Response, NextFunction } from "express";
import orderService from "./order.service";
import { IOrder } from "./order.interface";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cow, buyer } = req.body;
    console.log(cow);
    const order = await orderService.createOrder(cow, buyer);

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await orderService.getAllOrders();

    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
