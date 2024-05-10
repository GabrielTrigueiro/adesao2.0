import { Box, Paper, Typography } from "@mui/material";
import { FormContainer } from "app/components/styles";
import styled from "styled-components";

export const FormContainerNameCleaner = styled(FormContainer)<{
  $small?: boolean;
}>`
  overflow: hidden;
  display: ${(props) => (props.$small ? "flex" : "")};
  flex-direction: ${(props) => (props.$small ? "column" : "row")};
  align-items: ${(props) => (props.$small ? "center" : "")};
`;

export const ColumnBox = styled(Box)<{ $small?: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: ${(props) => (props.$small ? "95svw" : "")};
`;

export const BodyBox = styled(Box)<{ $small?: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const FooterBox = styled(Box)`
  display: flex;
  justify-content: space-evenly;
`;

export const QRCodeBox = styled(Box)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3%;
  min-height: 50svh;
`;

styled(Paper)`
  padding: 10px;
`;

styled(Box)`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  gap: 1em;
`;

styled(Typography)`
  overflow: scroll;
  white-space: nowrap;
  padding: 1em;
`;
