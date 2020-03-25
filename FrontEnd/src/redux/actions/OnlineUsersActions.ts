import { User } from "../models/User";
import { Action } from "redux";

export const ONLINE_USERS_ACTION_CONSTANTS = {
  UPDATE_ONLINE_USERS: "UPDATE_ONLINE_USERS",
  RESET_ONLINE_USERS: "RESET_ONLINE_USERS"
};

export type OnlineUsersActionType = {
  users: User[];
} & Action;

export function updateOnlineUsersAction(users: User[]) {
  return {
    type: ONLINE_USERS_ACTION_CONSTANTS.UPDATE_ONLINE_USERS,
    users
  };
}

export function resetOnlineUsersAction() {
  return {
    type: ONLINE_USERS_ACTION_CONSTANTS.RESET_ONLINE_USERS,
    users: []
  };
}
