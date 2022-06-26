// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "database";
import { IProduct } from "interfaces";
import { Product } from "models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string | IProduct[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return searchProducts(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  let { query = "" } = req.query;

  if (query.length === 3) {
    return res
      .status(400)
      .json({ message: "Se debe especificar al menos 3 caracteres" });
  }

  query = query.toString().toLowerCase();

  await db.connect();

  const products = await Product.find({
    $text: { $search: query },
  })
    .select("title images price inStock slug -_id")
    .lean();

  await db.disconnect();

  return res.status(200).json({ message: products });
};
