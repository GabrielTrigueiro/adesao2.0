import { Box, Grid, Typography } from "@mui/material";
import styled from "styled-components";

export const Info = styled(Box)`
  padding: 0.3em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const Texto = styled(Typography)`
  font-weight: bold !important;
`;
export const TextoLabel = styled(Typography)`
  font-size: 20px;
  margin-bottom: 5px;
`;

export const ContainerCouponInfo = styled(Grid)`
  width: 40vw;
  padding: 1em;
  display: flex;
  flex-direction: column !important;
  align-items: center;
`;

export const Container = styled(Box)`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

export const Title = styled(Typography)`
  color: ${({ theme }) => theme.COLORS.BLUE3} !important;
  font-size: 1.7rem !important;
  font-weight: bold !important;
  padding-left: 1rem;
`;

export const InfosSection = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0px 1rem;
`;

export const InfoCardContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InfoCardTitle = styled(Typography)`
  color: ${({ theme }) => theme.COLORS.WHITE} !important;
  background: ${({ theme }) => theme.COLORS.BLUE3} !important;
  font-size: ${({ theme }) => theme.FONTS_SIZE.LG} !important;
  font-weight: bold !important;
  width: min-content;
  border-radius: 10px 10px 0 0;
  padding: 0 0.5rem;
`;

export const InfoCard = styled(Box)`
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => theme.COLORS.BLUE3};
  padding: 0.3rem;
  width: 100%;
`;

export const InfoRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const InfoKey = styled(Typography)`
  color: ${({ theme }) => theme.COLORS.BLACK} !important;
  font-size: ${({ theme }) => theme.FONTS_SIZE.MD} !important;
  font-weight: bold !important;
`;

export const InfoValue = styled(Typography)`
  color: ${({ theme }) => theme.COLORS.BLACK} !important;
  font-size: ${({ theme }) => theme.FONTS_SIZE.MD} !important;
  max-width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
