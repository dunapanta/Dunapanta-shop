import { createContext } from "react";

export interface ContextProps {
  isMenuOpen: boolean;
  toggleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);
