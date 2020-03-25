import { User } from "../models/User";
import {
  ONLINE_USERS_ACTION_CONSTANTS,
  OnlineUsersActionType
} from "../actions/OnlineUsersActions";

export const onlineUserReducer = (
  state: User[] = [],
  action: OnlineUsersActionType
): User[] => {
  if (
    action.type === ONLINE_USERS_ACTION_CONSTANTS.UPDATE_ONLINE_USERS ||
    action.type === ONLINE_USERS_ACTION_CONSTANTS.RESET_ONLINE_USERS
  ) {
    return Array.from(action.users);
  } else {
    return state;
  }
};
