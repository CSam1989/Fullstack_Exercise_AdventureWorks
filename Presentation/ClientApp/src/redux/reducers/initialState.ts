import { CustomerState } from "./../types/State";
import { decodeUserToken } from "../../api/helpers/token.decoder";
import { IUser } from "../../interfaces/User";
import { ApplicationState, UserState } from "../types/State";

const userLocalStorage = localStorage.getItem("user");
const initialUserState: UserState = userLocalStorage
  ? {
      isLoggedIn: true,
      user: decodeUserToken(JSON.parse(userLocalStorage).token),
    }
  : { isLoggedIn: false, user: null };

const initialCustomerState: CustomerState = {
  customers: [],
  filter: "",
};

const InitialState: ApplicationState = {
  auth: initialUserState,
  data: initialCustomerState,
  apiCallsInProgress: 0,
};

export default InitialState;
