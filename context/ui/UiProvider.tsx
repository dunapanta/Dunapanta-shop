import { useReducer } from "react";
import { FC } from "react";
import { UiContext, uiReducer } from "./";

interface Props {
  children: React.ReactNode;
}

export interface UiState {
  isMenuOpen: boolean;
}

const UiInitialState: UiState = {
  isMenuOpen: false,
};

export const UiProvider: FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(uiReducer, UiInitialState);

  const toggleSideMenu = () => {
    dispatch({ type: "Ui - ToggleMenu" });
  };

  return (
    <UiContext.Provider value={{ ...state, toggleSideMenu }}>
      {children}
    </UiContext.Provider>
  );
};
