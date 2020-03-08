import React, { useEffect } from "react";
import { socketObj } from "../utils/SocketUtil";
import { useDispatch } from "react-redux";
import { User } from "../redux/models/User";
import { updateUserAction } from "../redux/actions/UserActions";
import { updateOnlineUsersAction } from "../redux/actions/OnlineUsersActions";
import { updateMessageAction } from "../redux/actions/MessageActions";
import { Message } from "../redux/models/Message";

export const SocketContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  const mySocket = socketObj.socket;

  useEffect(() => {
    mySocket.on("personal_info", (msg: User) => {
      dispatch(updateUserAction(msg));
    });

    mySocket.on("global_info", (msg: User[]) => {
      dispatch(updateOnlineUsersAction(msg));
    });

    mySocket.on("message", (messages: Message[]) => {
      dispatch(updateMessageAction(messages));
    });

    mySocket.on("error_msg", (error_msg: string) => {
      // TODO: Make nice dialog
      alert(error_msg)
    });
  }, [dispatch, mySocket]);

  return <div />;
};
