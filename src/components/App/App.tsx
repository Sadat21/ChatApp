import React from "react";
import * as S from "./App.styles";
import { Grid, TextareaAutosize, TextField } from "@material-ui/core";

function App() {
  return (
    <S.Content>
      <Grid container>
        <Grid item xs={8}>
          <h1>You are User1</h1>
          <TextField
            style={{ width: "100%" }}
            multiline
            variant={"outlined"}
            rows="20"
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <h1>Online Users</h1>
          <TextField
            style={{ width: "100%" }}
            multiline
            variant={"outlined"}
            rows="20"
            disabled
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <h1>Chat Box</h1>
          <TextField style={{ width: "100%" }} variant={"outlined"} />
        </Grid>
      </Grid>
    </S.Content>
  );
}

export default App;
