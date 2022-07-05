import { ICartProduct } from "./CartContext";
import { CartState } from "./CartProvider";

type CartActionType =
  | {
      type: "Cart - LoadCart from cookie | storage";
      payload: ICartProduct[];
    }
  | {
      type: "Cart - Update Cart Products";
      payload: ICartProduct[];
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "Cart - LoadCart from cookie | storage":
      return {
        ...state,
        cart: action.payload,
      };

    case "Cart - Update Cart Products":
      return {
        ...state,
        cart: [...action.payload],
      };

    default:
      return state;
  }
};
