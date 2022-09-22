// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { IOrder } from "interfaces";
import { db } from "database";
import { Product, Order } from "models";

type Data = { message: string } | IOrder;

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
  const session: any = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  //Crear arreglo con los productos
  const productsIds = orderItems.map((product) => product._id);

  await db.connect();

  const products = await Product.find({ _id: { $in: productsIds } });
  try {
    const subTotal = orderItems.reduce((prev, curr) => {
      const currentPrice = products.find((prod) => prod.id === curr._id)!.price;

      if (!currentPrice) {
        throw new Error("No se encontró el precio del producto");
      }

      return currentPrice * curr.quantity + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backenedTotal = subTotal * (1 + taxRate);

    if (total !== backenedTotal) {
      throw new Error("El total no coincide con el total del backend");
    }

    //Todo correcto
    const userId = session.user._id;
    const newOrder = new Order({ ...req.body, user: userId, isPaid: false });

    await newOrder.save();

    return res.status(201).json(newOrder);
  } catch (err: any) {
    await db.disconnect();
    console.log("Err", err);
    return res
      .status(400)
      .json({ message: err.message || "Revisar logs del servidor" });
  }
};
