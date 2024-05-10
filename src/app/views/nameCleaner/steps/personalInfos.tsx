import { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  InputProps,
  TextFieldProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { IFormField } from "../microComponents/formBlock/clientBlockForm";
import { useSaleFormContext } from "core/context/SaleContext";
import FormCard from "app/components/formCard/FormCard";
import GenericTextField from "app/components/genericTextField/GenericTextField";

interface IFormBlockProps {
  type?: string;
}

const PersonalInfos = ({ type }: Readonly<IFormBlockProps>) => {
  const { formik, userPermissions } = useSaleFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const currentTheme = useTheme();
  const isSmallScreen = useMediaQuery(currentTheme.breakpoints.down("sm"));

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

  const loginInfos: IFormField[] = [
    { name: "password", label: "Senha" },
    { name: "confirmPassword", label: "Senha" },
  ];

  const personalInfos: IFormField[] = [
    { name: "name", label: "Nome" },
    { name: "email", label: "E-mail" },
    { name: "cpforcnpj", label: "CPF/CNPJ" },
    { name: "telephone", label: "Telefone" },
  ];

  const optional: IFormField[] = [
    { name: "cameThrough", label: "(Opicional)" },
  ];

  return (
    <Box
      display={"flex"}
      gap={2}
      flexDirection={isSmallScreen ? "column" : "row"}
    >
      <FormCard title="Informe suas informações:">
        {personalInfos.map((field) => (
          <GenericTextField<string>
            key={field.name}
            error={
              !!(formik.errors as Record<string, string | undefined>)[
                field.name
              ]
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
                    disabled: field.name === "cpforcnpj" ? true : undefined,
                  }
            }
          />
        ))}
      </FormCard>
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <FormCard title="Informações acesso a plataforma:">
          {loginInfos.map((field) => (
            <GenericTextField<string>
              key={field.name}
              error={
                !!(formik.errors as Record<string, string | undefined>)[
                  field.name
                ]
              }
              helperText={
                (formik.errors as Record<string, string | undefined>)[
                  field.name
                ]
              }
              name={field.name}
              label={field.label}
              value={formik.values[field.name]}
              props={
                field.name === "password" || field.name === "confirmPassword"
                  ? passwordFieldProps
                  : {
                      onChange: formik.handleChange,
                    }
              }
            />
          ))}
        </FormCard>
        <FormCard title="Por onde conheceu a positivo?">
          {optional.map((field) => (
            <GenericTextField<string>
              key={field.name}
              error={
                !!(formik.errors as Record<string, string | undefined>)[
                  field.name
                ]
              }
              helperText={
                (formik.errors as Record<string, string | undefined>)[
                  field.name
                ]
              }
              name={field.name}
              label={field.label}
              value={formik.values[field.name]}
              props={
                field.name === "password" || field.name === "confirmPassword"
                  ? passwordFieldProps
                  : {
                      onChange: formik.handleChange,
                    }
              }
            />
          ))}
        </FormCard>
      </Box>
    </Box>
  );
};

export default PersonalInfos;
