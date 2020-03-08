import styled from "styled-components";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";

export const Content = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const InputText = styled(TextField)`
  width: calc(100% - 64px);
  height: 100%;
`;

export const StyledButton = styled(Button)`
  width: 56px;
  height: 100%;
`;

export const TopGrid = styled(Grid)`
  height: calc(100vh - 56px);
  display: flex;
`;

export const Footer = styled(Grid)`
  width: 100%;
  height: 56px;
`;

export const List = styled(Paper)`
  height: calc(100vh - 56px - 16px);
  width: calc(100% - 16px);
  min-width: 72px;
  margin: 8px;
  overflow: auto;
  vertical-align: top;
`;

export const InverseList = styled(Paper)`
  height: calc(100vh - 56px - 16px);
  width: calc(100% - 16px);
  min-width: 233px;

  margin: 8px;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
`;

export const Title = styled(Typography)`
  padding: 8px;
`;
