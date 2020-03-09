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

export const InverseList = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
`;

export const Outside = styled(Paper)`
  flex-direction: column;
  overflow-y: auto;
  display: flex;
  height: calc(100vh - 56px - 16px);
  width: calc(100% - 16px);
  min-width: 72px;
  margin: 8px;
  vertical-align: top;
`;

export const Title = styled(Typography)`
  padding: 8px;
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -33%);
  -webkit-transform: translate(-50%, -33%);
`;
