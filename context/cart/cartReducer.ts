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
    }
  | {
      type: "Cart - Change Cart Product Quantity";
      payload: ICartProduct;
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

    case "Cart - Change Cart Product Quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          //product.quantity = action.payload.quantity;
          //return product;
          return action.payload;
        }),
      };

    default:
      return state;
  }
};
