import { GET_CUSTOMERS_SUCCESS } from "./../types/action.types";
import { CustomerActions } from "./../types/customer.types";
import initialState from "./initialState";

export const customerReducer = (
  state = initialState.data,
  action: CustomerActions
) => {
  switch (action.type) {
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
      };
    default:
      return state;
  }
};
