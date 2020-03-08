import { Message } from "../models/Message";
import { Action } from "redux";

export const MESSAGE_ACTION_CONSTANTS = {
  UPDATE_MESSAGES: "UPDATE_MESSAGES",
  RESET_MESSAGES: "RESET_MESSAGES"
};

export type MessageActionType = {
  messages: Message[];
} & Action;

export function updateMessageAction(messages: Message[]) {
  return {
    type: MESSAGE_ACTION_CONSTANTS.UPDATE_MESSAGES,
    messages: messages
  };
}

export function resetMessageAction() {
  return {
    type: MESSAGE_ACTION_CONSTANTS.RESET_MESSAGES,
    messages: []
  };
}
