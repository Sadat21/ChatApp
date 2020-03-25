import { User } from "../models/User";
import { USER_ACTION_CONSTANTS, UserActionType } from "../actions/UserActions";

export const userReducer = (
  state: User = new User(),
  action: UserActionType
): User => {
  if (
    action.type === USER_ACTION_CONSTANTS.UPDATE_USER ||
    action.type === USER_ACTION_CONSTANTS.RESET_USER
  ) {
    return action.user;
  } else {
    return state;
  }
};
