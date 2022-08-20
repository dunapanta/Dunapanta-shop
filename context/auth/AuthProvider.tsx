import { shopApi } from "api";
import { IUser } from "interfaces";
import Cookies from "js-cookie";
import { useReducer } from "react";
import { FC } from "react";
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

  return (
    <AuthContext.Provider value={{ ...state, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
