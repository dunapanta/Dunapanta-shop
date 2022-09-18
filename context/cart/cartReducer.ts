import { ICartProduct } from "./CartContext";
import { CartState, ShippingAddress } from "./CartProvider";

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
    }
  | {
      type: "Cart - Remove product in cart";
      payload: ICartProduct;
    }
  | {
      type: "Cart - Update order summary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    }
  | {
      type: "Cart - Load Address";
      payload: ShippingAddress;
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "Cart - LoadCart from cookie | storage":
      return {
        ...state,
        isLoaded: true,
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

    case "Cart - Remove product in cart":
      return {
        ...state,
        cart: state.cart.filter((product) => {
          if (
            product._id === action.payload._id &&
            product.size === action.payload.size
          ) {
            return false;
          }
          return true;
        }),
      };

    case "Cart - Update order summary":
      return {
        ...state,
        ...action.payload,
      };

    case "Cart - Load Address":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    default:
      return state;
  }
};
