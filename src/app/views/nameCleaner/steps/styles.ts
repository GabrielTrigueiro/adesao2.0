import { Box, FormControl, Typography } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.5pc;
  text-align: center;
  margin: auto;
`;

export const TitleContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const SelectContainer = styled(FormControl)`
  width: 250px;
`;
