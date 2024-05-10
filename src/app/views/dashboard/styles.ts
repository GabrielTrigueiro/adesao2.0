import { Button, Grid, Typography } from "@mui/material";
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
  flex-direction: row !important;
  justify-content: flex-start !important;
`;

// export const ActionCard = styled(Grid)`
//   width: 200px;
//   padding: 0.5em;
//   align-items: center;
//   gap: 0.5em;
//   text-align: center;
//   border: 1px solid;
//   border-color: ${theme.palette.primary.main};
//   border-radius: 0.3em;
// `;

// export const ActionTitle = styled(Typography)`
//   font-weight: bold !important;
//   font-size: 0.9pc !important;
//   max-width: 200px;
//   white-space: nowrap;
// `;

// export const ActionButton = styled(Button)`
//   size: small !important;
//   border-radius: 0.5em !important;
//   background: "#fff" !important;
//   color: ${theme.palette.primary.main} !important;
//   border: 1px solid !important;
//   margin: 0.5em !important;
//   &&:hover {
//     background: ${theme.palette.primary.main} !important;
//     color: #fff !important;
//   }
// `;
