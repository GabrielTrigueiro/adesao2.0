import React from "react";
import {
  InputProps,
  TextField,
  TextFieldProps,
  FormHelperText,
} from "@mui/material";
import {
  formatCEP,
  formatDocument,
  formatInt,
  formatPhoneNumber,
} from "core/utils/globalFunctions";
import Tooltip from "@mui/material/Tooltip";

type TDefaultTextField<T> = {
  name: string;
  label: string;
  value: T;
  props?: InputProps & TextFieldProps;
  small?: boolean;
  error?: boolean | undefined;
  helperText?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  onBlur?:
  | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  | undefined;
  onChange?:
  | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  | undefined;
  style?: React.CSSProperties | undefined;
};

function GenericTextField<T>({
  name,
  label,
  value,
  props,
  small,
  helperText,
  error,
  type,
  onBlur,
  onChange,
  style,
}: TDefaultTextField<T>) {

  function documentField(name: string) {
    switch (name) {
      case "login":
        return {
          maxLength: 18,
          value: formatDocument(value as string),
        };
      case "cpforcnpj":
        return {
          maxLength: 18,
          value: formatDocument(value as string),
        };
      case "cep":
        return {
          maxLength: 10,
          value: formatCEP(value as string),
        };
      case "telephone":
        return {
          maxLength: 12,
          value: formatPhoneNumber(value as string),
        };
      case "quatityInstallments":
        return {
          value: formatInt(value as string),
        };
      case "valueInstallmentCnpj":
        return {
          value: formatInt(value as string),
        };
      case "valueInstallmentCpf":
        return {
          value: formatInt(value as string),
        };
      case "valuePixCnpj":
        return {
          value: formatInt(value as string),
        };
      case "valuePixCpf":
        return {
          value: formatInt(value as string),
        };
      default:
        return {};
    }
  }

  const inputProps = documentField(name);

  return (
    <TextField
      helperText={
        error && (
          <FormHelperText sx={{ margin: -0.5, padding: 0 }} error={error}>
            {String(helperText)}
          </FormHelperText>
        )
      }
      onChange={onChange}
      onBlur={onBlur}
      type={type ? type : undefined}
      size="small"
      variant="outlined"
      autoComplete="off"
      margin="none"
      id={name}
      label={label}
      value={value}
      error={error}
      style={style}
      inputProps={inputProps}
      {...props}
      sx={{
        margin: error ? 0 : 0.5,
      }}
    />
  );
}

export default GenericTextField;
