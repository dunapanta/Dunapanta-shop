import { FC, useEffect, useReducer } from "react";
import Cookie from "js-cookie";

import { CartContext, cartReducer } from "./";
import { ICartProduct } from "./CartContext";
import { shopApi } from "api";
import { IOrder } from "interfaces";

interface Props {
  children: React.ReactNode;
}

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}

const CartInitialState: CartState = {
  isLoaded: false,
  cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
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

  useEffect(() => {
    if (Cookie.get("firstName")) {
      const shippingAddress = {
        firstName: Cookie.get("firstName") || "",
        lastName: Cookie.get("lastName") || "",
        address: Cookie.get("address") || "",
        address2: Cookie.get("address2") || "",
        zip: Cookie.get("zip") || "",
        city: Cookie.get("city") || "",
        country: Cookie.get("country") || "",
        phone: Cookie.get("phone") || "",
      };

      dispatch({ type: "Cart - Load Address", payload: shippingAddress });
    }
  }, []);

  const updateAddress = (address: ShippingAddress) => {
    Cookie.set("firstName", address.firstName);
    Cookie.set("lastName", address.lastName);
    Cookie.set("address", address.address);
    address.address2 && Cookie.set("address2", address.address2);
    address.zip && Cookie.set("zip", address.zip);
    Cookie.set("city", address.city);
    Cookie.set("country", address.country);
    address.phone && Cookie.set("phone", address.phone);

    dispatch({ type: "Update - Address", payload: address });
  };

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

  const createOrder = async () => {
    if (!state.shippingAddress) {
      throw new Error("No hay direccion de entrega");
    }

    const order: IOrder = {
      orderItems: state.cart.map((p) => ({
        ...p,
        image: p.images,
        size: p.size!,
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    };

    try {
      console.log("order", order);
      const { data } = await shopApi.post("/orders", order);
      console.log("Data", data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeCartProduct,
        updateCartQuantity,
        updateAddress,
        //Orders
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
