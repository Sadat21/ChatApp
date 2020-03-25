import { User } from "../models/User";
import { Action } from "redux";

export const USER_ACTION_CONSTANTS = {
  UPDATE_USER: "UPDATE_USER",
  RESET_USER: "RESET_USER"
};

export type UserActionType = {
  user: User;
} & Action;

export function updateUserAction(user: User) {
  return {
    type: USER_ACTION_CONSTANTS.UPDATE_USER,
    user: user
  };
}

export function resetUserAction() {
  return {
    type: USER_ACTION_CONSTANTS.RESET_USER,
    user: new User()
  };
}
