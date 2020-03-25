import { Message } from "../models/Message";
import {
  MESSAGE_ACTION_CONSTANTS,
  MessageActionType
} from "../actions/MessageActions";

export const messageReducer = (
  state: Message[] = [],
  action: MessageActionType
): Message[] => {
  if (
    action.type === MESSAGE_ACTION_CONSTANTS.UPDATE_MESSAGES ||
    action.type === MESSAGE_ACTION_CONSTANTS.RESET_MESSAGES
  ) {
    return Array.from(action.messages);
  } else {
    return state;
  }
};
