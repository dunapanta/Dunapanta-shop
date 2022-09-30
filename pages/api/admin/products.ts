// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import { db } from "database";
import { IProduct } from "interfaces";
import { Product } from "models";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res);
    case "POST":
      return createProduct(req, res);
    case "PUT":
      return updateProduct(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({ title: "desc" }).lean();

  await db.disconnect();

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOST_NAME}products/${image}`;
    });
    return product;
  });

  return res.status(200).json(updatedProducts);
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: "You must upload at least 2 images" });
  }

  try {
    await db.connect();

    const productInDB = await Product.findOne({ slug: req.body.slug });
    if (productInDB) {
      await db.disconnect();
      return res.status(400).json({ message: "Product already exists" });
    }

    const product = new Product(req.body);
    await product.save();
    await db.disconnect();

    return res.status(201).json(product);

    await db.disconnect();
  } catch (err) {
    console.log("Error", err);
    await db.disconnect();
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id = "", images = [] } = req.body as IProduct;

  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: "You must upload at least 2 images" });
  }

  try {
    await db.connect();

    const product = await Product.findById(_id);
    if (!product) {
      await db.disconnect();
      return res.status(400).json({ message: "Product not found" });
    }

    //eliminar fotos en Cloudinary
    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileId, extension] = image
          .substring(image.lastIndexOf("/") + 1)
          .split(".");
        console.log({ image, fileId, extension });
        await cloudinary.uploader.destroy(fileId);
      }
    });

    await product.update(req.body);

    await db.disconnect();

    return res.status(200).json(product);
  } catch (err) {
    console.log("Error", err);
    await db.disconnect();
    return res.status(500).json({ message: "Internal server error" });
  }
};
