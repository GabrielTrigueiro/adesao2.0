import { Box, Grid, Paper, Typography } from "@mui/material";
import styled from "styled-components";

export const Container = styled(Box)`
  background-color: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 90%;
  padding: 1%;
  border: 2px solid #ccc;
  border-radius: 10px;
  min-width: 800px;
  min-height: 600px;
`;

export const FiltersPartition = styled(Box)`
  display: flex;
  flex-direction: row;
  border: 2px solid #000;
  border-radius: 10px;
  margin-bottom: 1%;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Section = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px;
`;

export const TitleSection = styled(Box)`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const IconSection = styled(Section)`
  flex-direction: row;
  width: auto;
  flex: 0;
  align-items: flex-end;
  gap: 10px;
  padding-bottom: 11px;
`;

export const FindList = styled(Box)`
  flex: 1;
  border: 2px solid #000;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

export const FindListPagination = styled(Box)``;

export const StyledContainer = styled(Grid)`
  display: flex;
  padding: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  gap: 1rem;
  height: 100%;
  width: 100%;
`;

export const StyledInnerContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  border: 2px solid ${({ theme }) => theme.COLORS.GRAY4};
  border-radius: 10px;
  overflow: hidden;
  gap: 1rem;
`;

export const StyledButtonsContainer = styled(Box)`
  display: flex;
  gap: 5px;
  margin: 0 auto;
`;

export const StyledTypography = styled(Typography)`
  font-size: 0.9pc !important;
  font-weight: bold !important;
  color: ${({ theme }) => theme.COLORS.GRAY3};
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100px;
`;
