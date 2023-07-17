import { Schema, model, Document, Types } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>({
  cow: { type:Schema.Types.ObjectId, ref: 'Cow', required: true },
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const OrderModel = model<IOrder & Document>('Order', orderSchema);
