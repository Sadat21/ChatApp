import styled from "styled-components";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";

export const Content = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

export const InputText = styled(TextField)`
  width: 100%;
  height: 100%;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  height: 100%;
`;

export const TopGrid = styled(Grid)`
  height: 100%;
`;

export const Footer = styled(Grid)`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  max-height: 10vh;
`;

export const List = styled(Paper)`
  height: 90vh;
  overflow: auto;
  vertical-align: top;
  margin: 8px;
`;

export const InverseList = styled(Paper)`
  height: 90vh;
  overflow: auto;
  vertical-align: top;
  margin: 8px;
  display: flex;
  flex-direction: column-reverse;
`;

export const Title = styled(Typography)`
  padding: 8px;
`;
