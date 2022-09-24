import { isValidObjectId } from "mongoose";
import { IOrder } from "interfaces";
import { db } from "database";
import { Order } from "models";

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await db.connect();
  const order = await Order.findById(id).lean();
  await db.disconnect();

  if (!order) {
    return null;
  }

  //serializar
  return JSON.parse(JSON.stringify(order));
};
