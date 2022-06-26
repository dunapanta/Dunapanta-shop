import { IProduct } from "interfaces";
import mongoose, { Schema, model, Model } from "mongoose";

const productSchema = new Schema(
  {
    description: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
          message: "{VALUE} no es un tamaño permitido",
        },
      },
    ],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true },
    type: {
      type: String,
      enum: {
        values: ["shirts", "pants", "shoes", "hoodies", "hats", "accessories"],
        message: "{VALUE} no es un tipo de producto permitido",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["men", "women", "other", "kid"],
        message: "{VALUE} no está soportado",
      },
    },
  },
  {
    timestamps: true,
  }
);
// TODO: Crear índice

const Product: Model<IProduct> =
  mongoose.models.Product || model("Product", productSchema);

export default Product;
