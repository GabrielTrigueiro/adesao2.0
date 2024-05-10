import { Card, Box, Typography } from "@mui/material";
import styled from "styled-components";
import theme from "theme";

export const LinkCard = styled(Card)`
  color: ${theme.palette.primary.main} !important;
  border-left: 4px solid;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const LinkContent = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export const ModalBox = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

export const LinkBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LinkText = styled(Typography)`
  width: 200px;
  color: ${theme.palette.primary.main};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    color: ${theme.palette.secondary.light};
  }
`;
