import { Grid } from "@mui/material";
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
  height: 100%;
`;

export const GridCharts = styled(Grid)`
  padding: 1em;
  display: flex !important;
  flex: 1 !important;
  flex-direction: row !important;
  justify-content: flex-start !important;
`;
