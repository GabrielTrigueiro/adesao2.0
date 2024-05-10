import { Box, Paper } from "@mui/material";
import styled from "styled-components";

export const ModalBody = styled(Box)`
  width: 60vw;
  padding: 2% 0;
`;

export const InfosArea = styled(Box)`
  display: flex;
  align-items: center;
  gap: 2%;
  margin: 2%;
`;

export const VideosArea = styled(Paper)`
  overflow: scroll;
  max-height: 200px;
  min-height: 70px;
  display: flex;
  flex-wrap: wrap;
  margin: 1em;
  background: #f3f3f3 !important;
  
`;

export const FooterArea = styled(Box)`
  display: flex;
  gap: 1%;
  justify-content: center;
  margin-top: 1%;
`;
