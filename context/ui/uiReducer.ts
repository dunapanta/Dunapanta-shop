import { UiState } from "./UiProvider";

type UiActionType = { type: "Ui - ToggleMenu" };

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  switch (action.type) {
    case "Ui - ToggleMenu":
      return {
        ...state,
        isMenuOpen: true,
      };

    default:
      return state;
  }
};
