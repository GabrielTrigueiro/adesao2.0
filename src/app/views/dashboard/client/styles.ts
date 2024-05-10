import { Box, Grid, Typography } from "@mui/material";
import styled from "styled-components";

import theme from "theme";

export const Container = styled(Grid)`
  padding: 1em;
  border-left: 4px solid;
  border-color: ${theme.palette.primary.main};
  border-radius: 0.3em;
  background-color: #fff;
  display: flex !important;
  flex: 1 !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
`;

export const ContainerTitle = styled(Typography)`
  color: ${theme.palette.primary.dark};
  font-size: 1.2pc !important;
`;

export const PagamentosContainer = styled(Grid)`
  height: 100%;
  border-radius: 1 !important;
  background-color: ${({ theme }) => theme.COLORS.WHITE} !important;
  padding: 0.5em !important;
  justify-content: center;
  align-items: center;
`;

export const StatusContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-left: 23px;
  .status {
    position: relative;
    display: inline-block;
    font-size: 0.8pc;
  }

  .status::before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    left: -15px;
  }

  .vencido::before {
    background-color: ${({ theme }) => theme.COLORS.RED} !important;
  }

  .aguardando::before {
    background-color: ${({ theme }) => theme.COLORS.YELLOW} !important;
  }

  .pago::before {
    background-color: ${({ theme }) => theme.COLORS.GREEN2} !important;
  }
`;
