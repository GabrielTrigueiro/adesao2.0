import { Box, Grid, Paper, Typography } from "@mui/material";
import styled from "styled-components";

export const Container = styled(Grid)`
  margin-top: 10px;
  gap: 10px;
  width: 60svw !important;
  @media screen and (max-width: 800px) {
    width: 100svw !important;
  }
`;

export const InfoRow = styled(Paper) <{ $PIX?: boolean }>`
  width: 100% !important;
  margin: 5px 5px !important;
  background-color: #f3f3f3 !important;
  padding: ${(props) => props.$PIX ? "0.5em 2em" : "0.5em 0.3em"} !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  height: 100px !important;
`;

export const InfoColumn = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-center;
`;

export const BlockContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
`;

export const Title = styled(Typography)`
  background-color: #49c5db;
  border-radius: 5px;
  padding: 7px;
  text-align: center;
  margin: 5px !important;
  font-weight: bold !important;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.4) !important;
`;
