import { combineReducers } from "redux";
import { userReducer } from "./reducers/UserReducer";
import { User } from "./models/User";
import { onlineUserReducer } from "./reducers/OnlineUsersReducer";
import { messageReducer } from "./reducers/MessageReducer";
import { Message } from "./models/Message";

export interface ReduxState {
  userReducer: User;
  onlineUserReducer: User[];
  messageReducer: Message[];
}

const combinedReducer = combineReducers({
  userReducer,
  onlineUserReducer,
  messageReducer
});

export default combinedReducer;
