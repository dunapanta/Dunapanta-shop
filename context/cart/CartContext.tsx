import { createContext } from "react";
import { ISize } from "interfaces";
import { ShippingAddress } from "./CartProvider";

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
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;

  addToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;

  //Orders
  createOrder: () => Promise<{
    hasError: boolean;
    message: string;
  }>;
}

export const CartContext = createContext({} as ContextCardProps);
