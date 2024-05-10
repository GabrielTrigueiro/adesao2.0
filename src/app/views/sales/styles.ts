import { TableCell, Typography } from "@mui/material";
import styled from "styled-components";

export const SalesCell = styled(TableCell)`
  display: flex;
  flex-direction: column;
`;

export const SalesTypography = styled(Typography)`
  font-size: 12px !important;
  max-width: 150px;
  white-space: nowrap;
`;
