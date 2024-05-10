import { IFormField } from "../microComponents/formBlock/clientBlockForm";
import { useSaleFormContext } from "core/context/SaleContext";
import FormCard from "app/components/formCard/FormCard";
import GenericTextField from "app/components/genericTextField/GenericTextField";
import { useState } from "react";
import { MenuItem, TextField } from "@mui/material";

const states = [
  { value: 'AC', label: 'AC' },
  { value: 'AL', label: 'AL' },
  { value: 'AP', label: 'AP' },
  { value: 'AM', label: 'AM' },
  { value: 'BA', label: 'BA' },
  { value: 'CE', label: 'CE' },
  { value: 'DF', label: 'DF' },
  { value: 'ES', label: 'ES' },
  { value: 'GO', label: 'GO' },
  { value: 'MA', label: 'MA' },
  { value: 'MT', label: 'MT' },
  { value: 'MS', label: 'MS' },
  { value: 'MG', label: 'MG' },
  { value: 'PA', label: 'PA' },
  { value: 'PB', label: 'PB' },
  { value: 'PR', label: 'PR' },
  { value: 'PE', label: 'PE' },
  { value: 'PI', label: 'PI' },
  { value: 'RJ', label: 'RJ' },
  { value: 'RN', label: 'RN' },
  { value: 'RS', label: 'RS' },
  { value: 'RO', label: 'RO' },
  { value: 'RR', label: 'RR' },
  { value: 'SC', label: 'SC' },
  { value: 'SP', label: 'SP' },
  { value: 'SE', label: 'SE' },
  { value: 'TO', label: 'TO' },
];

interface IFormBlockProps {
  type?: string;
}

const RegisterAddressForm = ({ type }: Readonly<IFormBlockProps>) => {
  const { formik } = useSaleFormContext();
  const [disable, setDisable] = useState(false);
  const addressInfos: IFormField[] = [
    { name: "cep", label: "CEP" },
    { name: "city", label: "Cidade" },
    // { name: "uf", label: "UF" },
    { name: "address", label: "Endereço" },
    { name: "neighborhood", label: "Bairro" },
  ];

  function getCepData(ev: any) {
    setDisable(true);
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
        setDisable(false);
      })
      .catch((err) => {
        formik.setFieldError("cep", "CEP inválido");
        setDisable(false);
      });
  }

  return (
    <FormCard title="Informe seu endereço:">
      {
        addressInfos.map((field) => (
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
            props={{
              onChange: formik.handleChange,
              disabled: disable,
              onBlur:
                field.name === "cep" ? (event) => getCepData(event) : undefined,
            }}
          />
        ))
      }
      <TextField
        value={formik.values.uf}
        onChange={e => formik.setFieldValue('uf', e.target.value)}
        disabled={disable}
        id="outlined-select-state"
        margin="none"
        sx={{
          margin: Boolean(formik.errors.uf) ? 0 : 0.5,
        }}
        select
        label="Uf"
        size='small'
        name="uf"
        error={
          Boolean(formik.errors.uf)
        }
        helperText={
          formik.errors.uf
        }
        SelectProps={{
          MenuProps: {
            PaperProps: {
              style: {
                maxHeight: 100,
              },
            },
          },
        }}
      >
        {states.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </FormCard >
  );
};

export default RegisterAddressForm;
