import React, { useEffect, useState } from "react";
import * as S from "./App.styles";
import {
  Grid,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { socketObj } from "../../utils/SocketUtil";
import { SocketContainer } from "../../containers/SocketContainer";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../redux/combindedReducer";
import { User } from "../../redux/models/User";
import { animateScroll } from "react-scroll";
import { resetErrorAction } from "../../redux/actions/ErrorActions";

// TODO: Future work
/*
Fix scrolling on all input/incoming message
Make nice scroll bar for all browsers
Fix message structure and sizing -  Make date/name appear on click/hover - Text align fiasco
*/

export const MIN_WINDOW_SIZE = 950;

function App() {
  const dispatch = useDispatch();

  const currentUser: User = useSelector((state: ReduxState) => {
    return state.userReducer;
  });

  const onlineUsers = useSelector((state: ReduxState) => {
    return state.onlineUserReducer;
  });

  const messages = useSelector((state: ReduxState) => {
    return Array.from(state.messageReducer).reverse();
  });

  const errorMessage = useSelector((state: ReduxState) => {
    return state.errorReducer;
  });

  const [dialogMessage, setDialogMessage] = useState("");

  const [message, setMessage] = useState<string>("");

  const [isMobileSize, setIsMobileSize] = useState<boolean>(
    window.innerWidth > MIN_WINDOW_SIZE
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function sendMessage() {
    if (message.trim()) {
      if (message.split(" ")[0] === "/nickcolour") {
        socketObj.sendColourChange(message.split(" ")[1]);
      } else if (message.split(" ")[0] === "/nick") {
        socketObj.sendUserNameChange(message.split(" ")[1]);
      } else {
        socketObj.sendMessage(message);
      }

      setMessage("");
    }
  }

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  });

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: "chat-log",
      smooth: true,
      duration: 100,
      isDynamic: true
    });
  });

  useEffect(() => {
    if (errorMessage.length > 0) {
      setDialogMessage(errorMessage);
      dispatch(resetErrorAction());
      setIsDialogOpen(true);
    }
  }, [dispatch, errorMessage]);

  function updateWindowSize() {
    if (window.innerWidth < MIN_WINDOW_SIZE) {
      setIsMobileSize(false);
    } else {
      setIsMobileSize(true);
    }
  }

  function closeDialog() {
    setIsDialogOpen(false);
  }

  return (
    <S.Content>
      <SocketContainer />

      {currentUser.nickname && socketObj.socket.connected ? (
        <React.Fragment>
          <Dialog open={isDialogOpen}>
            <DialogContent>
              <DialogContentText>{dialogMessage}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} color="primary" variant="outlined">
                Okay
              </Button>
            </DialogActions>
          </Dialog>

          <S.TopGrid container>
            <Grid item xs={3} sm={2} md={3}>
              <S.List elevation={10}>
                {isMobileSize ? (
                  <React.Fragment>
                    <S.Title variant={"h5"}>Profile</S.Title>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          variant={"rounded"}
                          style={{ backgroundColor: currentUser.colour }}
                        >
                          {currentUser.nickname[0]}
                        </Avatar>
                      </ListItemAvatar>
                      {isMobileSize ? (
                        <ListItemText primary={currentUser.nickname} />
                      ) : null}
                    </ListItem>
                    <S.Title variant={"h5"}>Online</S.Title>
                  </React.Fragment>
                ) : null}
                {onlineUsers.map((user, index) => {
                  return (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar
                          variant={"rounded"}
                          style={{ backgroundColor: user.colour }}
                        >
                          {user.nickname[0].toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      {isMobileSize ? (
                        <ListItemText primary={user.nickname} />
                      ) : null}
                    </ListItem>
                  );
                })}
              </S.List>
            </Grid>
            <Grid item xs={9} sm={10} md={9}>
              <S.Outside elevation={10} id={"chat-log"}>
                <S.InverseList>
                  {messages.map((value, index) => {
                    return (
                      <ListItem
                        key={index}
                        alignItems="flex-start"
                        style={
                          value.user.nickname === currentUser.nickname
                            ? { textAlign: "right" }
                            : {}
                        }
                      >
                        {currentUser.nickname !== value.user.nickname ? (
                          <ListItemAvatar>
                            <Avatar
                              style={{ backgroundColor: value.user.colour }}
                            >
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
                              {new Date(value.timestamp).toLocaleString() +
                                ": "}
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
              </S.Outside>
            </Grid>
          </S.TopGrid>
          <S.Footer container>
            <Grid item xs={12}>
              <S.InputText
                variant={"outlined"}
                value={message}
                onChange={event => setMessage(event.target.value)}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder={"Welcome " + currentUser.nickname}
              />
              <S.StyledButton
                variant={"contained"}
                onClick={sendMessage}
                color={"primary"}
              >
                <SendIcon />
              </S.StyledButton>
            </Grid>
          </S.Footer>
        </React.Fragment>
      ) : (
        <S.Loading>
          <CircularProgress color={"primary"} />
          <Typography>Waiting for connection...</Typography>
        </S.Loading>
      )}
    </S.Content>
  );
}

export default App;
