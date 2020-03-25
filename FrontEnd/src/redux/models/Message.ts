import {User} from "./User";

export class Message {
  timestamp: number = 0;
  user: User = new User();
  message: string = "";
}
