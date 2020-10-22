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

const InitialState: ApplicationState = {
  auth: initialUserState,
  apiCallsInProgress: 0,
};

export default InitialState;
