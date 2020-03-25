import socketIOClient from "socket.io-client";
import Cookies from "js-cookie";

export class SocketUtil {
  private ENDPOINT = "https://chatapp-73333.appspot.com";
  public socket: SocketIOClient.Socket;

  constructor() {
    this.socket = socketIOClient(this.ENDPOINT);
    this.sendUserConnect();
  }

  public sendUserConnect() {
    const cookie = Cookies.get("user");
    let username = "";
    if (cookie) {
      username = cookie;
    }

    this.socket.emit("user_connect", username);
  }

  public sendMessage(message: string) {
    this.socket.emit("message", message);
  }

  public sendUserNameChange(username: string) {
    this.socket.emit("username_change", username);
  }

  public sendColourChange(colour: string) {
    this.socket.emit("user_colour_change", colour);
  }
}

export const socketObj = new SocketUtil();
