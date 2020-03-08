import socketIOClient from "socket.io-client";

export class SocketUtil {
  private ENDPOINT = "http://127.0.0.1:4000";
  public socket: SocketIOClient.Socket;

  constructor() {
    this.socket = socketIOClient(this.ENDPOINT);
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
