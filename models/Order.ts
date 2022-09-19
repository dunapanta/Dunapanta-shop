import { IOrder } from "interfaces";
import mongoose, { Schema, model, Model } from "mongoose";

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> =
  mongoose.models.Order || model("Order", orderSchema);

export default Order;
