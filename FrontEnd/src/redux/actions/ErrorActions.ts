import { Action } from "redux";

export const ERROR_ACTION_CONSTANTS = {
  UPDATE_ERROR: "UPDATE_ERROR",
  RESET_ERROR: "RESET_ERROR"
};

export type ErrorActionType = {
  error: string;
} & Action;

export function updateErrorAction(error: string) {
  return {
    type: ERROR_ACTION_CONSTANTS.UPDATE_ERROR,
    error: error
  };
}

export function resetErrorAction() {
  return {
    type: ERROR_ACTION_CONSTANTS.RESET_ERROR,
    error: ""
  };
}
