import { FC, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { IUser } from "interfaces";
import Cookies from "js-cookie";

import { shopApi } from "api";
import { AuthContext, authReducer } from "./";

interface Props {
  children: React.ReactNode;
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AuthInitialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, AuthInitialState);
  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    if (!Cookies.get("token")) {
      return;
    }

    try {
      const { data } = await shopApi.get("/user/validate-token");
      const { token, user } = data;

      Cookies.set("token", token);
      dispatch({ type: "Auth - Login", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await shopApi.post("/user/login", { email, password });
      const { token, user } = data;

      Cookies.set("token", token);
      dispatch({ type: "Auth - Login", payload: user });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await shopApi.post("/user/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "Auth - Login", payload: user });
      return {
        hasError: false,
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return {
          hasError: true,
          message: err.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo crear el usuario",
      };
    }
  };

  const logoutUser = async () => {
    Cookies.remove("token");
    Cookies.remove("cart");
    router.reload();
  };

  return (
    <AuthContext.Provider value={{ ...state, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
