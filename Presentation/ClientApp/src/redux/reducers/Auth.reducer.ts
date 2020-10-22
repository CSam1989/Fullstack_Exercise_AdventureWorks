import { LOGIN_SUCCESS, LOGOUT } from "../types/action.types";
import { AuthActions } from "../types/auth.types";
import initialState from "./initialState";

export const authReducer = (state = initialState.auth, action: AuthActions) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    default:
      return state;
  }
};
