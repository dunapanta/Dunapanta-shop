import { IUser } from "interfaces";
import { createContext } from "react";

export interface AuthProps {
  isLoggedIn: boolean;
  user?: IUser;
}

export const AuthContext = createContext({} as AuthProps);
