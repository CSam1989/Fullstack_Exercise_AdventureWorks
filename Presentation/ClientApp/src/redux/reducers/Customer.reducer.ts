import {
  GET_CUSTOMERS_SUCCESS,
  PUT_CUSTOMER_SUCCESS,
} from "./../types/action.types";
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
    case PUT_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: {
          ...state.customers,
          list: state.customers.list.map((customer) =>
            customer.customerId === action.payload.customerId
              ? action.payload
              : customer
          ),
        },
      };
    default:
      return state;
  }
};
