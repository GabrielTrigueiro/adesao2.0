import {
  Container,
  Paper,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import handleDeal from "../microComponents/contract/deal";
import { FormikProps } from "formik";
import { TNewClientBodyRequest } from "core/models/client";
import React from "react";

interface IProps {
  formik: FormikProps<TNewClientBodyRequest>;
  isCheckboxEnabled: boolean;
  setCheckboxEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const AssignDeal = (props: IProps) => {
  const currentTheme = useTheme();
  const isSmallScreen = useMediaQuery(currentTheme.breakpoints.down("sm"));

  return (
    <Container sx={{ height: "100%" }}>
      <Paper
        sx={{
          padding: "1%",
          width: isSmallScreen ? undefined : "50svw",
          margin: "auto",
        }}
      >
        <div
          style={{
            maxHeight: isSmallScreen ? "65svh" : "25svh",
            width: isSmallScreen ? undefined : "100%",
            overflowY: "scroll",
            marginBottom: "10px",
          }}
        >
          {handleDeal(
            props.formik.values.name,
            props.formik.values.cpforcnpj.replace(/\D/g, ""),
            props.formik.values.address
          )}
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.isCheckboxEnabled}
              onChange={() =>
                props.setCheckboxEnabled(!props.isCheckboxEnabled)
              }
            />
          }
          label="Aceitar Termos e Condições"
        />
      </Paper>
    </Container>
  );
};

export default AssignDeal;
