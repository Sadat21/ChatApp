import React, { useEffect } from "react";
import { socketObj } from "../utils/SocketUtil";
import { useDispatch } from "react-redux";
import { User } from "../redux/models/User";
import {
  resetUserAction,
  updateUserAction
} from "../redux/actions/UserActions";
import {
  resetOnlineUsersAction,
  updateOnlineUsersAction
} from "../redux/actions/OnlineUsersActions";
import {
  resetMessageAction,
  updateMessageAction
} from "../redux/actions/MessageActions";
import { Message } from "../redux/models/Message";
import Cookies from "js-cookie";
import { updateErrorAction } from "../redux/actions/ErrorActions";

export const SocketContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  const mySocket = socketObj.socket;

  useEffect(() => {
    mySocket.on("reconnect", () => {
      socketObj.sendUserConnect();
    });

    mySocket.on("disconnect", () => {
      dispatch(resetMessageAction());
      dispatch(resetOnlineUsersAction());
      dispatch(resetUserAction());
    });

    mySocket.on("personal_info", (msg: User) => {
      Cookies.set("user", msg.nickname);
      dispatch(updateUserAction(msg));
    });

    mySocket.on("global_info", (msg: User[]) => {
      dispatch(updateOnlineUsersAction(msg));
    });

    mySocket.on("message", (messages: Message[]) => {
      dispatch(updateMessageAction(messages));
    });

    mySocket.on("error_msg", (error_msg: string) => {
      dispatch(updateErrorAction(error_msg));
    });
  }, [dispatch, mySocket]);

  return <div />;
};
