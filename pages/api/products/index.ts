// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "database";
import { IProduct } from "interfaces";
import { Product } from "models";

type Data = {
  message: string | IProduct[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }

  res.status(200).json({ message: "John Doe" });
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.connect();

  const products = await Product.find()
    .select("title images price inStock slug -_id")
    .lean();

  await db.disconnect();

  return res.status(200).json(products);
};
