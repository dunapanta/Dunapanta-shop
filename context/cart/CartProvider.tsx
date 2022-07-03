import { FC, useReducer } from "react";

import { CartContext, cartReducer } from "./";
import { ICartProduct } from "./CartContext";

interface Props {
  children: React.ReactNode;
}

export interface CartState {
  cart: ICartProduct[];
}

const CartInitialState: CartState = {
  cart: [],
};

export const CartProvider: FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, CartInitialState);

  return (
    <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>
  );
};
