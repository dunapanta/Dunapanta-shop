import { IUser } from "interfaces";
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

  return (
    <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
  );
};
