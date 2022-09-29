// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db, SHOP_CONSTANTS } from "database";
import { IProduct } from "interfaces";
import { Product } from "models";
import { isValidObjectId } from "mongoose";

type Data =
  | {
      message: string;
    }
  | IProduct[]
  | IProduct;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "PUT":
      return updateProduct(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { gender = "all" } = req.query;

  let condition = {};

  if (gender !== "all" && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
    condition = { gender };
  }
  await db.connect();

  const products = await Product.find(condition)
    .select("title images price inStock slug -_id")
    .lean();

  await db.disconnect();

  return res.status(200).json(products);
};

const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id = "", images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  if (images.length <= 2) {
    return res
      .status(400)
      .json({ message: "You must upload at least 2 images" });
  }

  //TODO: Upload images to cloudinary

  try {
    await db.connect();

    const product = await Product.findById(_id);
    if (!product) {
      await db.disconnect();
      return res.status(400).json({ message: "Product not found" });
    }

    //TODO eliminar fotos en Cloudinary

    await product.update(req.body);

    await db.disconnect();

    return res.status(200).json(product);
  } catch (err) {
    console.log("Error", err);
    await db.disconnect();
    return res.status(500).json({ message: "Internal server error" });
  }
};
