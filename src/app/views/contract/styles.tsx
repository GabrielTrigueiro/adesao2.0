import { Box, Button, Grid, Typography } from "@mui/material";
import styled from "styled-components";

import theme from "theme";

export const Container = styled(Grid)`
  padding: 1em;
  border-left: 4px solid;
  border-color: ${theme.palette.primary.main};
  border-radius: 0.3em;
  background-color: #fff;
  display: flex !important;
  flex-direction: column !important;
  gap: 5px;
  width: 100%;
  height: 100%;
`;


export const ButtonDownload = styled(Button)`
    padding: 0.5rem 0.5rem;
    width: 10svw;
    height: 6svh;
    display: flex;
    flex-direction: row;
`;

export const ContractBox = styled(Box)`
    background-color: ${({ theme }) => theme.COLORS.GRAY6} !important;
    width: 80%;
    height: 95%;
    overflow-y: auto;
    border-radius: 0.3em;
    padding: 2rem;
`;