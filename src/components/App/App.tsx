import React, { useState } from "react";
import * as S from "./App.styles";
import {
  Grid,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { socketObj } from "../../utils/SocketUtil";
import { SocketContainer } from "../../containers/SocketContainer";
import { useSelector } from "react-redux";
import { ReduxState } from "../../redux/combindedReducer";
import { User } from "../../redux/models/User";

// TODO:
/*
Cookies
Responsive
Make a nice Dialog on error

Make nice scroll bar
Fix message structure and sizing -  Make date/name appear on click/hover
 */

function App() {
  const currentUser: User = useSelector((state: ReduxState) => {
    return state.userReducer;
  });

  const onlineUsers = useSelector((state: ReduxState) => {
    return state.onlineUserReducer;
  });

  const messages = useSelector((state: ReduxState) => {
    return Array.from(state.messageReducer).reverse();
  });

  const [message, setMessage] = useState<string>("");

  function sendMessage() {
    if (message.trim()) {
      if (message.includes("/nickcolour")) {
        socketObj.sendColourChange(message.split(" ")[1]);
      } else if (message.includes("/nick")) {
        socketObj.sendUserNameChange(message.split(" ")[1]);
      } else {
        socketObj.sendMessage(message);
      }

      setMessage("");
    }
  }

  return (
    <S.Content>
      <SocketContainer />

      <S.TopGrid container>
        <Grid item xs={4}>
          <S.List>
            <S.Title variant={"h5"}>Your Profile</S.Title>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  variant={"rounded"}
                  style={{ backgroundColor: currentUser.colour }}
                >
                  {currentUser.nickname[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={currentUser.nickname} />
            </ListItem>
            <S.Title variant={"h5"}>Online Users</S.Title>
            {onlineUsers.map((user, index) => {
              return (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      variant={"rounded"}
                      style={{ backgroundColor: user.colour }}
                    >
                      {user.nickname[0].toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.nickname} />
                </ListItem>
              );
            })}
          </S.List>
        </Grid>
        <Grid item xs={8}>
          <S.InverseList>
            {messages.map((value, index) => {
              return (
                <ListItem
                  key={index}
                  alignItems="flex-start"
                  style={
                    currentUser.nickname === value.user.nickname
                      ? { textAlign: "right" }
                      : {}
                  }
                >
                  {currentUser.nickname !== value.user.nickname ? (
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: value.user.colour }}>
                        {value.user.nickname[0].toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                  ) : (
                    <span />
                  )}

                  <ListItemText
                    primary={value.message}
                    secondary={
                      <React.Fragment>
                        {new Date(value.timestamp).toLocaleString() + ": "}
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {value.user.nickname}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              );
            })}
          </S.InverseList>
        </Grid>
      </S.TopGrid>
      <S.Footer container>
        <Grid item xs={10}>
          <S.InputText
            variant={"outlined"}
            value={message}
            onChange={event => setMessage(event.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <S.StyledButton variant={"contained"} onClick={sendMessage}>
            <SendIcon />
          </S.StyledButton>
        </Grid>
      </S.Footer>
    </S.Content>
  );
}

export default App;
