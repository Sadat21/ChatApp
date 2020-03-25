import {
  ERROR_ACTION_CONSTANTS,
  ErrorActionType
} from "../actions/ErrorActions";

export const errorReducer = (
  state: string = "",
  action: ErrorActionType
): string => {
  if (
    action.type === ERROR_ACTION_CONSTANTS.UPDATE_ERROR ||
    action.type === ERROR_ACTION_CONSTANTS.RESET_ERROR
  ) {
    return action.error;
  } else {
    return state;
  }
};
