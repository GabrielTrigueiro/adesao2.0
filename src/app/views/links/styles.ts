import { Box, Typography } from "@mui/material";
import styled from "styled-components";

export const BoxLink = styled(Box)<{ mobile?: boolean }>`
  display: flex;
  flex-direction: ${({ mobile }) => (mobile ? "column" : "row")};
  padding: 1em;
  border: 2px solid;
  border-color: ${({ theme }) => theme.COLORS.GRAY5};
  border-radius: 0.3em;
  background-color: ${({ theme }) => theme.COLORS.WHITE} !important;
  width: ${({ mobile }) => (mobile ? "90svw" : "900px")};
  justify-content: space-around;
  align-items: center;
  margin: 0.5rem auto;
`;

export const GenerateLinkContent = styled(Box)<{ mobile?: boolean }>`
  display: flex;
  flex-direction: ${({ mobile }) => (mobile ? "column" : "row")};
  flex: 1;
  align-items: center;
  justify-content: space-around;
`;

export const TitleLink = styled(Typography)`
  color: ${({ theme }) => theme.COLORS.BLUE3} !important;
  font-weight: bold !important;
`;

export const LinkText = styled(Typography)`
  width: 200px;
  display: flex;
  flex-direction: row !important;
  color: ${({ theme }) => theme.COLORS.BLACK} !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    color: ${({ theme }) => theme.COLORS.GRAY5} !important;
  }
`;
