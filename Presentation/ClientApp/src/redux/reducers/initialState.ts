import { decodeUserToken } from "../../api/helpers/token.decoder";
import { ApplicationState, UserState } from "../types/State";
import { CustomerState } from "./../types/State";

const userLocalStorage = localStorage.getItem("user");
const initialUserState: UserState = userLocalStorage
  ? {
      isLoggedIn: true,
      user: decodeUserToken(JSON.parse(userLocalStorage).token),
    }
  : { isLoggedIn: false, user: null };

const initialCustomerState: CustomerState = {
  customers: {
    list: [],
    pagination: {
      pageNumber: 0,
      pageSize: 0,
      totalCount: 0,
    },
  },
  filter: "",
};

const InitialState: ApplicationState = {
  auth: initialUserState,
  data: initialCustomerState,
  apiCallsInProgress: 0,
};

export default InitialState;
