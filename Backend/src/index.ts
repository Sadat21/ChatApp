import express from "express";
import httpProtocol from "http";
import socketIo from "socket.io";
import { PORT } from "./config/constants";
import { User } from "./models/User";
import { Message } from "./models/Message";
import cors from "cors";

const app = express();
app.use(cors());
const server = httpProtocol.createServer(app);
const serverSocket = socketIo(server);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/", (request, response) => {
  response.send("Server is running...");
});

const onlineUsers = new Map<string, User>();

const messages: Message[] = [];

const intervalID = setInterval(() => {
  messages.length = 0;
}, 8.64e7);

serverSocket.on("connection", socket => {
  function emitEverything() {
    serverSocket.emit("global_info", Array.from(onlineUsers.values()));
    serverSocket.emit("message", messages);
  }

  let user = new User();

  // User requesting to connect
  socket.on("user_connect", (existingUsername: string) => {
    if (existingUsername && !onlineUsers.has(existingUsername)) {
      user.nickname = existingUsername;
    }
    console.log("Got cookie: " + existingUsername);
    console.log("A user connected with nickname: " + user.nickname);
    onlineUsers.set(user.nickname, user);
    socket.emit("personal_info", user);
    socket.emit("message", messages);
    serverSocket.emit("global_info", Array.from(onlineUsers.values()));
  });

  socket.on("disconnect", () => {
    console.log("User disconnected with id " + user.nickname);
    onlineUsers.delete(user.nickname);
    serverSocket.emit("global_info", Array.from(onlineUsers.values()));
  });

  socket.on("message", (msg: string) => {
    if (!msg) {
      socket.emit("error_msg", "Did not provide a message.");
      return;
    }

    console.log("Message received:" + msg);
    const messageSender = onlineUsers.get(user.nickname);
    if (messageSender) {
      const newMsg = new Message(messageSender, msg);
      messages.push(newMsg);
      serverSocket.emit("message", messages);
    } else {
      console.log("Discarding message, user does not exist");
    }
  });

  socket.on("username_change", (newUsername: string) => {
    if (!newUsername) {
      socket.emit("error_msg", "Did not provide a new username to change.");
      return;
    }

    console.log("Username requested to change");
    if (newUsername.length > 10) {
      socket.emit(
        "error_msg",
        "Please choose a username 10 characters or less"
      );
      return;
    }

    if (!onlineUsers.has(newUsername)) {
      const currentUser = onlineUsers.get(user.nickname);
      if (currentUser) {
        onlineUsers.delete(currentUser.nickname);
        currentUser.nickname = newUsername;
        onlineUsers.set(currentUser.nickname, currentUser);
        socket.emit("personal_info", currentUser);
        emitEverything();
      } else {
        socket.emit("error_msg", "Current user does not exist");
      }
    } else {
      socket.emit("error_msg", newUsername + " is taken");
    }
  });

  socket.on("user_colour_change", (newColour: string) => {
    if (!newColour) {
      socket.emit("error_msg", "Did not provide a new colour to change.");
      return;
    }

    console.log("User colour requested to change");
    if (/^#[0-9A-F]{6}$/i.test(newColour)) {
      const currentUser = onlineUsers.get(user.nickname);
      if (currentUser) {
        currentUser.colour = newColour;
        socket.emit("personal_info", currentUser);
        emitEverything();
      }
    } else {
      socket.emit(
        "error_msg",
        newColour + " is not a valid hex colour (ex. #FFFFFF)"
      );
    }
  });
});
