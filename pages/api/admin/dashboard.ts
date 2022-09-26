// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "database";
import { Order, Product, User } from "models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number;
  numberOfClients: number;
  numberOfProducts: number;
  productsWithNoStock: number;
  lowInStock: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();
  const numberOfOrdersPromise = Order.count();
  const paidOrdersPromise = Order.find({ isPaid: true }).count();
  const numberOfClientsPromise = User.find({ role: "client" }).count();
  const numberOfProductsPromise = Product.count();
  const productsWithNoStockPromise = Product.find({ inStock: 0 }).count();
  const lowInStockPromise = Product.find({ inStock: { $lte: 5 } }).count();

  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoStock,
    lowInStock,
  ] = await Promise.all([
    numberOfOrdersPromise,
    paidOrdersPromise,
    numberOfClientsPromise,
    numberOfProductsPromise,
    productsWithNoStockPromise,
    lowInStockPromise,
  ]);

  await db.disconnect();

  return res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoStock,
    lowInStock,
  });
}
