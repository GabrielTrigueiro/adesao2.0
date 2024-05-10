import { Box } from "@mui/material";
import styled from "styled-components";

// Seção ds pagamentos

export const PaymentSection = styled(Box)`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

export const PaymentListContainer = styled(Box)`
  background-color: ${({ theme }) => theme.COLORS.BLUE3};
  padding: 1rem;
  display: flex;
  height: 200px;
`;

export const PaymentList = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0px 0.5rem;
  //background-color: ${({ theme }) => theme.COLORS.WHITE};
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const InfoColumn = styled(Box)`
  display: flex;
  flex-direction: column;
`;
