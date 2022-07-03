import { createContext } from "react";
import { ISize } from "interfaces";

export interface ICartProduct {
  _id: string;
  quantity: number;
  images: string;
  price: number;
  sizes: ISize;
  slug: string;
  title: string;
  gender: "men" | "women" | "kid" | "other";
}

export interface ContextCardProps {
  cart: ICartProduct[];
}

export const CartContext = createContext({} as ContextCardProps);
