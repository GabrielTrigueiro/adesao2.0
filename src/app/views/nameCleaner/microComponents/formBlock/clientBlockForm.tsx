// noinspection JSIgnoredPromiseFromCall

import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  InputProps,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { FormColumn, FormColumnTitle } from "app/components/styles";
import { TNewClientBodyRequest } from "core/models/client";
import GenericTextField from "app/components/genericTextField/GenericTextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface IFormBlockProps {
  title: string;
  icon: React.ReactNode;
  formik: FormikProps<TNewClientBodyRequest>;
  fields: Array<IFormField>;
  type?: string;
  disable?: boolean;
}

export interface IFormField {
  name: keyof TNewClientBodyRequest;
  label: string;
}

const FormBlock: React.FC<IFormBlockProps> = (props) => {
  const { title, icon, formik, fields, disable } = props;
  const [showPassword, setShowPassword] = useState(false);

  function getCepData(ev: any) {
    const { value } = ev.target;
    const cep = value?.replace(/[^0-9]/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro === true) {
          formik.setFieldError("cep", "CEP inválido");
        } else {
          formik.setFieldValue("city", `${data.localidade}`);
          formik.setFieldValue("uf", `${data.uf}`);
          formik.setFieldValue("address", `${data.logradouro}`);
          formik.setFieldValue("neighborhood", `${data.bairro}`);
          formik.setFieldTouched("cep", false);
        }
      })
      .catch((err) => {
        formik.setFieldError("cep", "CEP inválido");
      });
  }

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  let passwordFieldProps: (InputProps & TextFieldProps) | undefined = {
    type: showPassword ? "text" : "password",
    onChange: formik.handleChange,
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={togglePassword}
            edge="end"
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </InputAdornment>
      ),
    },
  };

  return (
    <FormColumn>
      <FormColumnTitle
        sx={{ background: "#aaaaaa58", borderRadius: 0.5, padding: 1 }}
      >
        <Typography fontWeight={"bold"} color={"#000"}>
          {title}
        </Typography>
        {icon}
      </FormColumnTitle>
      {fields.map((field) => (
        <GenericTextField<string>
          key={field.name}
          error={
            !!(formik.errors as Record<string, string | undefined>)[field.name]
          }
          helperText={
            (formik.errors as Record<string, string | undefined>)[field.name]
          }
          name={field.name}
          label={field.label}
          value={formik.values[field.name]}
          props={
            field.name === "password" || field.name === "confirmPassword"
              ? passwordFieldProps
              : {
                  onChange: formik.handleChange,
                  disabled: field.name === "cpforcnpj" ? disable : undefined,
                  onBlur:
                    field.name === "cep"
                      ? (event) => getCepData(event)
                      : undefined,
                }
          }
        />
      ))}
    </FormColumn>
  );
};

export default FormBlock;
