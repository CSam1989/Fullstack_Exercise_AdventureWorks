import {
  GET_USERS_SUCCESS,
  POST_USER_SUCCESS,
  PUT_USERROLE_SUCCESS,
} from "./../types/action.types";
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
        users: undefined,
      };
    }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case POST_USER_SUCCESS:
      return {
        ...state,
        users: state.users && [...state.users, { ...action.payload }],
      };
    case PUT_USERROLE_SUCCESS:
      return {
        ...state,
        users: state.users
          ? state.users.map((user) =>
              user.userId === action.payload.userId ? action.payload : user
            )
          : undefined,
      };
    default:
      return state;
  }
};
