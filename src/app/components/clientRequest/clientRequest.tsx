import { Box, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { StyledInnerContainer, StyledTypography } from "../searchFilter/styles";
import { MoreHorizRounded } from "@mui/icons-material";
import theme from "core/theme/theme";

interface IClientRequestProps {
  handleDetail: (action: "open" | "close") => void;
}

function ClientRequest(props: Readonly<IClientRequestProps>) {
  return (
    <StyledInnerContainer>
      <Box sx={{
        background: theme.COLORS.BLUE3,
        display: 'flex',
        width: 80,
        alignItems: "center",
        justifyContent: "center",
        borderRight: `2px solid ${theme.COLORS.GRAY4}`,
      }}>
        <AccountCircleIcon sx={{
          fontSize: "50px",
          margin: "0 0.5rem",
          color: theme.COLORS.WHITE
        }} />
      </Box>
      {/* <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        padding: "0  0 0 0.5rem"
      }}>
        <StyledTypography>Nome:</StyledTypography>
        <StyledTypography>Documento:</StyledTypography>
        <StyledTypography>Status:</StyledTypography>
      </Box> */}
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <StyledTypography>Gabriel Trigueiro Fernandes</StyledTypography>
        <StyledTypography>088.164.384-01</StyledTypography>
        <StyledTypography>PENDENTE</StyledTypography>
      </Box>
      <IconButton onClick={() => props.handleDetail("open")} sx={{ width: 40, height: 40, alignSelf: 'center' }}>
        <MoreHorizRounded />
      </IconButton>
    </StyledInnerContainer>
  );
}

export default ClientRequest;

