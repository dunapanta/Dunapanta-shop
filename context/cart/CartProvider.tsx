import { FC, useEffect, useReducer } from "react";
import Cookie from "js-cookie";

import { CartContext, cartReducer } from "./";
import { ICartProduct } from "./CartContext";

interface Props {
  children: React.ReactNode;
}

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

const CartInitialState: CartState = {
  cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
};

export const CartProvider: FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, CartInitialState);

  useEffect(() => {
    try {
      let previousCartProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      if (previousCartProducts) {
        dispatch({
          type: "Cart - LoadCart from cookie | storage",
          payload: previousCartProducts,
        });
      }
    } catch (e) {
      dispatch({
        type: "Cart - LoadCart from cookie | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length > 0) Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, curr) => curr.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, curr) => curr.price * curr.quantity + prev,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSumary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (1 + taxRate),
    };
    dispatch({ type: "Cart - Update order summary", payload: orderSumary });
  }, [state.cart]);

  const addToCart = (product: ICartProduct) => {
    //regresa valor booleano
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: "Cart - Update Cart Products",
        payload: [...state.cart, product],
      });

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartButDifferentSize)
      return dispatch({
        type: "Cart - Update Cart Products",
        payload: [...state.cart, product],
      });

    //Acumular
    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      //Actualizo cantidad
      p.quantity += product.quantity;

      return p;
    });

    dispatch({
      type: "Cart - Update Cart Products",
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: "Cart - Change Cart Product Quantity", payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: "Cart - Remove product in cart", payload: product });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeCartProduct, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
