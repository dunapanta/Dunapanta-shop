import { createContext } from "react";
import { ISize } from "interfaces";

export interface ICartProduct {
  _id: string;
  quantity: number;
  images: string;
  price: number;
  size?: ISize;
  slug: string;
  title: string;
  gender: "men" | "women" | "kid" | "other";
}

export interface ContextCardProps {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  addToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextCardProps);
