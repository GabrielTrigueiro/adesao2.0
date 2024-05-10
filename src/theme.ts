import { createTheme } from "@mui/material";
import theme from "core/theme/theme";

const PositivoTheme = createTheme({
  palette: {
    primary: {
      main: "#00AECB",
      dark: "#858796",
    },
    secondary: {
      main: "rgb(16, 175, 205)",
      light: "#88e3f7",
      dark: "#eaeaea",
    },
  },
  typography: {
    fontFamily: "Nunito",
  },
  components: {
    MuiSpeedDialIcon: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: theme.COLORS.GRAY4,
          borderWidth: "1px",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        color: "secondary",
        variant: "contained",
        type: "submit",
      },
      variants: [
        {
          props: { variant: "contained" },
          style: ({ theme }) => ({
            color: "#fff",
            fontSize: "0.8pc",
            border: "1px solid",
            borderColor: "transparent",
            fontWeight: "bold",
            padding: "10px 20px 10px 20px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)",
            letterSpacing: "0.1em",
            "&:hover": {
              backgroundColor: theme.palette.secondary.light,
            },
          }),
        },
        {
          props: { variant: "outlined" },
          style: () => ({
            color: theme.COLORS.BLUE3,
            fontSize: "1pc",
            border: "1px solid",
            borderColor: theme.COLORS.BLUE3,
            fontWeight: "bold",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)",
            letterSpacing: "0.1em",
            padding: "10px 20px 10px 20px",
            "&:hover": {
              backgroundColor: theme.COLORS.BLUE3,
              color: theme.COLORS.WHITE,
            },
          }),
        },
      ],
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: 10,
        },
      },
    },
    MuiStep: {
      styleOverrides: {
        root: {
          padding: 0,
          WebkitFlex: 0,
          margin: 0,
          flex: 0,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default PositivoTheme;
