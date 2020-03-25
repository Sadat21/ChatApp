import {User} from "./User";

export class Message {
  timestamp: number = Date.now();
  user: User = new User();
  message: string = "";

  constructor(user: User, message: string) {
    this.user = user;
    this.message = message;
  }
}
