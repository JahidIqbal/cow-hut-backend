import { ICow } from "../cow/cow.interface";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { CowModel } from "../cow/cow.model";
import { IOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrder = async (
  cowId: string,
  buyerId: string
): Promise<IOrder | null> => {
  try {
    // Check if the cow exists
    const cow: ICow | null = await CowModel.findById(cowId);
    console.log(cowId);
    if (!cow) {
      throw new Error("Cow not found");
    }

    // Check if the buyer exists
    const buyer: IUser | null = await User.findById(buyerId);
    if (!buyer) {
      throw new Error("Buyer not found");
    }

    // Check if the buyer has enough budget to buy the cow
    if (buyer.budget < cow.price) {
      throw new Error("Insufficient budget to buy the cow");
    }

    // Start the transaction
    const session = await OrderModel.startSession();
    session.startTransaction();

    try {
      // Update the cow's label to 'sold out'
      cow.label = "sold out";
      await cow.save();

      // Deduct the cow's price from the buyer's budget
      buyer.budget -= cow.price;
      await buyer.save();

      // Add the cow's price to the buyer's income
      buyer.income += cow.price;
      await buyer.save();

      // Create the order
      const order = await OrderModel.create({
        cow: cowId,
        buyer: buyerId,
      });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return order;
    } catch (error) {
      // If an error occurs, abort the transaction
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw error;
  }
};

const getAllOrders = async (): Promise<IOrder[]> => {
  const orders = await OrderModel.find();
  return orders;
};

export default {
  createOrder,
  getAllOrders,
};
