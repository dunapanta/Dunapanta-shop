// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { IOrder } from "interfaces";
import { db } from "database";
import { Product } from "models";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }

  res.status(200).json({ message: "John Doe" });
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const { orderItems, total } = req.body as IOrder;

  // Verificar session usuario
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  //Crear arreglo con los productos
  const productsIds = orderItems.map((product) => product._id);

  await db.connect();

  const products = await Product.find({ _id: { $in: productsIds } });
  try {
    const subTotal = orderItems.reduce((prev, curr) => {
      const currentPrice = products.find(
        (prod) => prod._id === curr._id
      )!.price;

      if (!currentPrice) {
        throw new Error("No se encontró el precio del producto");
      }

      return currentPrice * curr.quantity + prev;
    }, 0);
  } catch (err) {}

  return res.status(201).json(session);
};
